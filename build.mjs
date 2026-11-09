// Genera il sito statico in dist/ a partire da testi.json + src/template.mjs.
// Uso: npm run build
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import render from './src/template.mjs';

const DIST = 'dist';
const require = createRequire(import.meta.url);

// --- 1. Lettura e controllo dei testi -----------------------------------
// Forma attesa di testi.json: "" = testo obbligatorio, [ {...} ] = elenco (almeno 1 voce).
const voce = { anno: '', titolo: '', descrizione: '' };
const SCHEMA = {
  generale: { nome: '', titolo_pagina: '', descrizione_google: '', partita_iva: '' },
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
    modulo: { campo_nome: '', campo_email: '', campo_messaggio: '', pulsante: '' },
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

writeFileSync(join(DIST, 'index.html'), render(testi, { anno: new Date().getFullYear() }));
cpSync('asset', join(DIST, 'asset'), { recursive: true });
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
