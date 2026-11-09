// Genera il sito statico in dist/ a partire da testi.json + src/template.mjs.
// Uso: npm run build
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import render, { renderPrivacy } from './src/template.mjs';

const DIST = 'dist';
const require = createRequire(import.meta.url);

// --- 1. Lettura e controllo dei testi -----------------------------------
// Forma attesa di testi.json: "" = testo obbligatorio, [ {...} ] = elenco (almeno 1 voce).
const voce = { anno: '', titolo: '', descrizione: '' };
const SCHEMA = {
  generale: { nome: '', titolo_pagina: '', descrizione_google: '', partita_iva: '', iscrizione_albo: '' },
  menu: { home: '', chi_sono: '', servizi: '', contatti: '' },
  hero: { titolo: '', sottotitolo: '', pulsante: '', foto: '' },
  chi_sono: {
    titolo: '', testo: '',
    riquadro_chiaro: { titolo: '', testo: '' },
    riquadro_colorato: { titolo: '', testo: '' },
  },
  curriculum: { titolo: '', formazione: [voce], esperienze: [voce] },
  servizi: { titolo: '', elenco: [{ titolo: '', descrizione: '', approfondimento: '' }] },
  contatti: {
    titolo: '', sottotitolo: '', telefono: '', email: '', indirizzo: '', foto_studio: '',
  },
};

function controlla(schema, valore, percorso, errori) {
  if (typeof schema === 'string') {
    if (typeof valore !== 'string' || valore.trim() === '') errori.push(`${percorso}: testo mancante o vuoto`);
  } else if (Array.isArray(schema)) {
    if (!Array.isArray(valore) || valore.length === 0) errori.push(`${percorso}: serve almeno una voce`);
    else valore.forEach((v, i) => controlla(schema[0], v, `${percorso}[${i + 1}]`, errori));
  } else if (valore === null || typeof valore !== 'object' || Array.isArray(valore)) {
    errori.push(`${percorso}: sezione mancante`);
  } else {
    for (const k of Object.keys(schema)) controlla(schema[k], valore[k], percorso ? `${percorso}.${k}` : k, errori);
  }
}

let testi;
try {
  testi = JSON.parse(readFileSync('testi.json', 'utf8'));
} catch (e) {
  console.error(`✗ testi.json non è leggibile: ${e.message}`);
  process.exit(1);
}

const errori = [];
controlla(SCHEMA, testi, '', errori);
// Le immagini locali devono esistere davvero.
for (const [nome, src] of [['hero.foto', testi.hero?.foto], ['contatti.foto_studio', testi.contatti?.foto_studio]]) {
  if (typeof src === 'string' && src && !/^https?:\/\//.test(src) && !existsSync(src.replace(/^\//, ''))) {
    errori.push(`${nome}: immagine "${src}" non trovata`);
  }
}
if (errori.length) {
  console.error('✗ Problemi in testi.json:\n  - ' + errori.join('\n  - '));
  process.exit(1);
}

// --- 2. Generazione -------------------------------------------------------
rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'fonts'), { recursive: true });

// Le foto caricate (asset/immagini) non vengono copiate così come sono: solo quelle
// usate nel sito vengono ottimizzate da ottimizzaFoto().
cpSync('asset', join(DIST, 'asset'), {
  recursive: true,
  filter: (src) => !src.replace(/\\/g, '/').startsWith('asset/immagini'),
});

// Raddrizza (EXIF), riduce a max 1600px, converte in WebP e toglie i metadati (GPS ecc.).
const fotoFatte = new Map(); // sorgente -> percorso pubblicato
async function ottimizzaFoto(src) {
  if (/^https?:\/\//.test(src)) return src;
  const sorgente = src.replace(/^\/+/, '');
  if (fotoFatte.has(sorgente)) return fotoFatte.get(sorgente);

  let uscita = sorgente.replace(/\.[^./]+$/, '') + '.webp';
  if ([...fotoFatte.values()].includes(uscita)) uscita = sorgente.replace(/\.([^./]+)$/, '-$1') + '.webp';

  mkdirSync(dirname(join(DIST, uscita)), { recursive: true });
  const info = await sharp(sorgente)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(DIST, uscita));
  const kb = (n) => `${Math.round(n / 1024)} KB`;
  console.log(`  foto ${sorgente} (${kb(statSync(sorgente).size)}) -> ${uscita} (${kb(info.size)}, ${info.width}x${info.height})`);
  fotoFatte.set(sorgente, uscita);
  return uscita;
}

const pagina = structuredClone(testi);
pagina.hero.foto = await ottimizzaFoto(testi.hero.foto);
pagina.contatti.foto_studio = await ottimizzaFoto(testi.contatti.foto_studio);

// Indirizzo pubblico del sito (dalla Action: impostazioni di GitHub Pages).
// Serve per canonical e anteprime social; in locale di solito non è impostato.
const sito = process.env.SITE_URL ? process.env.SITE_URL.replace(/\/*$/, '/') : '';

// Anteprima per WhatsApp/Facebook/LinkedIn: JPG 1200x630 ritagliato sulla foto principale.
let anteprima;
if (!/^https?:\/\//.test(testi.hero.foto)) {
  const src = 'asset/immagini/anteprima-social.jpg';
  await sharp(testi.hero.foto.replace(/^\/+/, ''))
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover', position: sharp.strategy.attention })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(DIST, src));
  anteprima = { src, width: 1200, height: 630 };
}

const anno = new Date().getFullYear();
writeFileSync(join(DIST, 'index.html'), render(pagina, { anno, sito, anteprima }));
writeFileSync(join(DIST, 'privacy.html'), renderPrivacy(pagina, { anno, sito }));
if (!sito) console.log('  (SITE_URL non impostato: niente canonical e anteprime social)');
cpSync('src/script.js', join(DIST, 'script.js'));

const FONTS = {
  '@fontsource/playfair-display': ['playfair-display-latin-700-normal.woff2', 'playfair-display-latin-700-italic.woff2'],
  '@fontsource/montserrat': ['montserrat-latin-300-normal.woff2', 'montserrat-latin-400-normal.woff2', 'montserrat-latin-600-normal.woff2'],
};
for (const [pkg, files] of Object.entries(FONTS)) {
  const dir = join(dirname(require.resolve(`${pkg}/package.json`)), 'files');
  for (const f of files) cpSync(join(dir, f), join(DIST, 'fonts', f));
}

execFileSync(
  process.execPath,
  [require.resolve('tailwindcss/lib/cli.js'), '-i', 'src/style.css', '-o', join(DIST, 'style.css'), '--minify'],
  { stdio: ['ignore', 'ignore', 'inherit'] },
);

console.log('✓ Sito generato in dist/');
