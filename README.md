# Sito della Dr.ssa Susanna Mancini

Sito statico di una pagina (più l'informativa privacy), pubblicato gratis su GitHub Pages.
I contenuti si modificano da un pannello web ([Pages CMS](https://app.pagescms.org)) senza toccare il codice.

## Come funziona

```
testi.json + asset/immagini/   ← contenuti (modificati dal pannello)
        │
        ▼  npm run build  (build.mjs)
src/template.mjs               ← struttura della pagina (HTML + classi Tailwind)
src/style.css, src/script.js   ← stile e menu/accordion
        │
        ▼
dist/                          ← sito pronto, pubblicato dalla Action
```

1. Chi gestisce i contenuti entra su app.pagescms.org, modifica testi o foto e salva:
   il pannello fa un commit su `main`.
2. La Action [`.github/workflows/pubblica.yml`](.github/workflows/pubblica.yml) esegue la build
   e pubblica `dist/` su GitHub Pages. Il sito è aggiornato in circa un minuto.
3. Se `testi.json` ha un problema (campo vuoto, immagine mancante, JSON non valido)
   la build si ferma con un messaggio chiaro e resta online la versione precedente.
   Il dettaglio è nel log della Action, nella scheda *Actions* della repo.

## File principali

| File | Cosa contiene |
|---|---|
| `testi.json` | Tutti i testi e i percorsi delle foto. Non contiene HTML. |
| `.pages.yml` | Configurazione del pannello: quali campi mostrare, etichette e spiegazioni in italiano. |
| `src/template.mjs` | Struttura di `index.html` e `privacy.html`. |
| `build.mjs` | Controlla `testi.json`, genera le pagine, ottimizza le foto, compila Tailwind, copia i font. |
| `asset/immagini/` | Foto caricate dal pannello (originali: non vengono pubblicate così come sono). |

## Convenzioni nei testi

- Le parole tra `*asterischi*` nei titoli di apertura e "Chi sono" vengono colorate.
- Un "a capo" nei testi diventa un a capo nella pagina.

## Foto

Durante la build ogni foto usata viene raddrizzata (EXIF), ridotta a max 1600px, convertita
in WebP e ripulita dei metadati (GPS compreso). Dalla foto principale viene anche generata
l'anteprima per i link condivisi (`anteprima-social.jpg`, 1200×630).

## Indirizzo del sito

La Action ricava l'indirizzo pubblico dalle impostazioni di GitHub Pages (`SITE_URL`) e lo usa per
il link canonico e le anteprime social. **Dopo aver cambiato il dominio personalizzato** va
rilanciata una build (un salvataggio dal pannello o un push qualsiasi su `main`).

## Lavorare in locale

Serve Node.js (versione 24 come nella Action).

```sh
npm ci
npm run build      # genera dist/
npm run preview    # genera e apre il sito su http://localhost:3000
SITE_URL=https://esempio.it npm run build   # per vedere anche canonical e tag social
```

## Aggiungere un campo modificabile

1. Aggiungi la chiave in `testi.json`.
2. Aggiungila in `SCHEMA` in `build.mjs` (così la build la controlla).
3. Usala in `src/template.mjs`.
4. Aggiungila in `.pages.yml` (così compare nel pannello).

## Cose da ricordare

- **Privacy**: `privacy.html` è un'informativa minima, valida finché il sito non usa cookie, statistiche,
  moduli o servizi esterni (mappe, video, font remoti). Se se ne aggiunge uno, va aggiornata.
- **DNS** (dominio su Aruba): record A/AAAA verso GitHub Pages e `www` in CNAME verso
  `arturobassoli.github.io`. I record della posta (MX) non vanno toccati.
