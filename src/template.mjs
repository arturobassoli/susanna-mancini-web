// Struttura della pagina. I contenuti arrivano da testi.json (vedi build.mjs).

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Testo libero: escape HTML, gli "a capo" diventano <br>.
const testo = (s) => esc(s).trim().replace(/\r?\n/g, '<br>');

// Le parole tra *asterischi* vengono evidenziate con la classe indicata.
const evidenzia = (s, classi) =>
  testo(s).replace(/\*(.+?)\*/g, `<span class="${classi}">$1</span>`);

// Immagini locali: percorso relativo (il CMS può salvarle con "/" iniziale).
const img = (s) => esc(/^https?:\/\//.test(s) ? s : s.replace(/^\/+/, ''));

const head = (titolo, descrizione) => `<!DOCTYPE html>
<html lang="it" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titolo}</title>
    <meta name="description" content="${descrizione}">
    <link rel="icon" type="image/png" href="asset/symbol_colored.png">
    <link rel="preload" href="fonts/playfair-display-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="fonts/montserrat-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="style.css">
</head>`;

const footer = (g, anno) => `<footer class="py-8 px-6 text-center text-xs text-gray-400 uppercase tracking-widest leading-relaxed">
    &copy; ${anno} ${testo(g.nome)} | ${testo(g.iscrizione_albo)} | P.IVA ${testo(g.partita_iva)} | <a href="privacy.html" class="underline hover:text-[#2788a5] transition">Privacy</a>
</footer>`;

const menuLinks = (m) => [
  ['#home', m.home],
  ['#chi-sono', m.chi_sono],
  ['#servizi', m.servizi],
  ['#contatti', m.contatti],
].map(([href, label], i, arr) => ({ href, label: testo(label), ultimo: i === arr.length - 1 }));

const voceCurriculum = (item) => `
                <div class="relative pl-8 pb-12 border-l-2 border-gray-300 hover:border-[#2788a5] transition duration-300">
                    <div class="absolute left-0 top-0 w-4 h-4 bg-[#2788a5] rounded-full transform -translate-x-[9px]"></div>
                    <p class="font-bold text-[#2788a5] text-lg mb-2">${testo(item.anno)}</p>
                    <h4 class="text-xl font-semibold text-gray-900 mb-2">${testo(item.titolo)}</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">${testo(item.descrizione)}</p>
                </div>`;

const servizio = (s, idx) => `
            <div class="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition group border-2 border-transparent hover:border-[#2788a5]">
                <div class="w-12 h-12 bg-[#f8f7eb] rounded-full mb-6 flex items-center justify-center group-hover:bg-[#2788a5] transition">
                    <svg class="w-6 h-6 text-[#2788a5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 class="text-2xl mb-4">${testo(s.titolo)}</h3>
                <p class="text-gray-500 text-sm mb-6">${testo(s.descrizione)}</p>

                <button class="service-toggle text-sm font-semibold text-[#2788a5] hover:text-gray-900 transition flex items-center gap-2" data-service="${idx}">
                    <span>Scopri di più</span>
                    <svg class="w-4 h-4 transition-transform" data-icon="arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>

                <div class="service-details max-h-0 overflow-hidden transition-all duration-300 ease-out" data-service="${idx}">
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-gray-600 text-sm leading-relaxed">${testo(s.approfondimento)}</p>
                    </div>
                </div>
            </div>`;

export default function render(t, { anno }) {
  const g = t.generale;
  const c = t.contatti;
  const links = menuLinks(t.menu);
  const telHref = c.telefono.replace(/[^\d+]/g, '');

  return `${head(esc(g.titolo_pagina), esc(g.descrizione_google))}
<body class="antialiased text-gray-800">

<nav class="fixed w-full z-50 glass-nav">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home"><img src="asset/symbol_bold_colored.png" alt="${esc(g.nome)}" class="h-12 w-auto"></a>
        <div class="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-semibold items-baseline">
${links.map((l) => l.ultimo
    ? `            <a href="${l.href}" class="px-5 py-2 bg-[#2788a5] text-white rounded-full hover:bg-gray-600 transition">${l.label}</a>`
    : `            <a href="${l.href}" class="hover:text-[#2788a5] transition">${l.label}</a>`).join('\n')}
        </div>
        <div class="md:hidden text-[#2788a5]">
            <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Apri menu" class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2788a5]">
                <svg data-open-icon xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
                <svg data-close-icon xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
    <!-- Menu mobile -->
    <div id="mobile-menu" class="md:hidden fixed inset-0 z-50 transform translate-x-full transition-transform duration-300 bg-[rgba(248,247,235,0.98)] h-screen">
        <div class="max-w-md h-full mx-auto flex flex-col p-6">
            <div class="flex items-center justify-between">
                <img src="asset/symbol_bold_colored.png" alt="${esc(g.nome)}" class="h-12 w-auto">
                <button id="mobile-menu-close" aria-label="Chiudi menu" class="p-2 rounded-md text-[#2788a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2788a5]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <nav class="mt-12 flex-1">
                <ul class="flex flex-col gap-6 text-lg uppercase font-semibold tracking-widest">
${links.map((l) => l.ultimo
    ? `                    <li><a href="${l.href}" class="inline-block px-6 py-3 bg-[#2788a5] text-white rounded-full hover:bg-gray-600 transition">${l.label}</a></li>`
    : `                    <li><a href="${l.href}" class="hover:text-[#2788a5] transition">${l.label}</a></li>`).join('\n')}
                </ul>
            </nav>

            <div class="pt-6 text-sm text-gray-600">
                <p>Tel: <a href="tel:${telHref}">${testo(c.telefono)}</a></p>
                <p class="mt-2">Email: <a href="mailto:${esc(c.email)}">${testo(c.email)}</a></p>
            </div>
        </div>
    </div>
</nav>

<section id="home" class="min-h-screen flex items-center pt-32 px-6 pb-6">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
            <h1 class="hero-clamp mb-6 text-gray-900">${evidenzia(t.hero.titolo, 'italic text-[#2788a5]')}</h1>
            <p class="text-lg mb-8 text-gray-600 max-w-md">${testo(t.hero.sottotitolo)}</p>
            <a href="#contatti" class="inline-block px-8 py-4 bg-[#2788a5] text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">${testo(t.hero.pulsante)}</a>
        </div>
        <div class="order-1 md:order-2 relative flex justify-center">
            <div class="organic-shape bg-[#2788a5] w-full aspect-square opacity-20 absolute -top-4 -left-4 animate-slow-pulse"></div>
            <img src="${img(t.hero.foto)}" alt="${esc(g.nome)}" class="relative z-10 rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition duration-700 max-h-[60vh] max-w-[60vw]">
        </div>
    </div>
</section>

<section id="chi-sono" class="py-24 bg-white px-6">
    <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-5">
                <h2 class="text-4xl md:text-5xl mb-6">${evidenzia(t.chi_sono.titolo, 'text-[#2788a5]')}</h2>
                <p class="text-gray-600 leading-relaxed mb-6">${testo(t.chi_sono.testo)}</p>
            </div>
            <div class="md:col-span-7 grid grid-cols-2 gap-4">
                <div class="bg-[#f8f7eb] p-8 rounded-3xl mt-12">
                    <h3 class="text-2xl mb-2 text-[#2788a5]">${testo(t.chi_sono.riquadro_chiaro.titolo)}</h3>
                    <p class="text-sm">${testo(t.chi_sono.riquadro_chiaro.testo)}</p>
                </div>
                <div class="bg-[#2788a5] p-8 rounded-3xl text-white">
                    <h3 class="text-2xl mb-2">${testo(t.chi_sono.riquadro_colorato.titolo)}</h3>
                    <p class="text-sm">${testo(t.chi_sono.riquadro_colorato.testo)}</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="curriculum" class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl mb-16 text-center">${testo(t.curriculum.titolo)}</h2>

        <div class="mb-20">
            <h3 class="text-2xl font-playfair font-bold text-[#2788a5] mb-12">Formazione</h3>
            <div class="grid md:grid-cols-2 gap-8">${t.curriculum.formazione.map(voceCurriculum).join('')}
            </div>
        </div>

        <div>
            <h3 class="text-2xl font-playfair font-bold text-[#2788a5] mb-12">Esperienze Professionali</h3>
            <div class="grid md:grid-cols-2 gap-8">${t.curriculum.esperienze.map(voceCurriculum).join('')}
            </div>
        </div>
    </div>
</section>

<section id="servizi" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl mb-4">${testo(t.servizi.titolo)}</h2>
            <div class="h-1 w-20 bg-[#2788a5] mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-3 items-start gap-8">${t.servizi.elenco.map(servizio).join('')}
        </div>
    </div>
</section>

<section id="contatti" class="py-24 px-6 bg-[#f8f7eb]">
    <div class="max-w-7xl mx-auto">
        <div class="mb-16 text-center">
            <h2 class="text-4xl md:text-5xl mb-4">${testo(c.titolo)}</h2>
            <div class="h-1 w-20 bg-[#2788a5] mx-auto"></div>
        </div>

        <div class="mb-16">
            <img src="${img(c.foto_studio)}" alt="Studio - ${esc(g.nome)}" loading="lazy" class="w-full h-96 object-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition duration-700">
        </div>

        <div class="bg-[#2788a5] text-white rounded-[3rem] shadow-2xl p-10 md:p-12">
            <p class="text-xl md:text-2xl font-playfair text-center mb-10">${testo(c.sottotitolo)}</p>
            <div class="grid gap-8 md:grid-cols-3 md:justify-items-center">
                    <div class="flex items-start gap-4">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <div>
                            <p class="text-sm opacity-75">Telefono</p>
                            <a href="tel:${telHref}" class="font-semibold hover:opacity-70 transition">${testo(c.telefono)}</a>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <div>
                            <p class="text-sm opacity-75">Email</p>
                            <a href="mailto:${esc(c.email)}" class="font-semibold hover:opacity-70 transition">${testo(c.email)}</a>
                        </div>
                    </div>

                    <div class="flex items-start gap-4">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <div>
                            <p class="text-sm opacity-75">Studio</p>
                            <p class="font-semibold">${testo(c.indirizzo)}</p>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</section>

${footer(g, anno)}

<script src="script.js"></script>
</body>
</html>
`;
}

// --- Pagina privacy -----------------------------------------------------
// Informativa minima: il sito non usa cookie, statistiche, moduli né risorse esterne.
// Se si aggiungono servizi esterni (mappe, moduli, analytics) questo testo va aggiornato.
const PRIVACY_AGGIORNATA = '9 novembre 2026';

export function renderPrivacy(t, { anno }) {
  const g = t.generale;
  const c = t.contatti;
  const h2 = 'text-2xl md:text-3xl mt-12 mb-4 text-gray-900';
  const p = 'text-gray-600 leading-relaxed mb-4';

  return `${head(`Privacy | ${esc(g.nome)}`, `Informativa sul trattamento dei dati personali - ${esc(g.nome)}`)}
<body class="antialiased text-gray-800">

<nav class="glass-nav">
    <div class="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="./"><img src="asset/symbol_bold_colored.png" alt="${esc(g.nome)}" class="h-12 w-auto"></a>
        <a href="./" class="text-sm uppercase tracking-widest font-semibold hover:text-[#2788a5] transition">&larr; Torna al sito</a>
    </div>
</nav>

<main class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-4xl md:text-5xl mb-6 text-gray-900">Informativa privacy</h1>
    <p class="${p}">Informativa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) per chi visita questo sito.</p>

    <h2 class="${h2}">Titolare del trattamento</h2>
    <p class="${p}">${testo(g.nome)}, ${testo(c.indirizzo)}. Email: <a href="mailto:${esc(c.email)}" class="text-[#2788a5] underline">${testo(c.email)}</a>.</p>

    <h2 class="${h2}">Dati di navigazione</h2>
    <p class="${p}">Il sito è ospitato su GitHub Pages (GitHub, Inc.). Per garantire la sicurezza e il funzionamento del servizio, GitHub registra alcuni dati tecnici delle visite, come l'indirizzo IP. Il titolare non utilizza questi dati e non li incrocia con altre informazioni. Per i dettagli si rimanda all'<a href="https://docs.github.com/it/site-policy/privacy-policies/github-general-privacy-statement" class="text-[#2788a5] underline" rel="noopener">informativa di GitHub</a>.</p>

    <h2 class="${h2}">Cookie</h2>
    <p class="${p}">Il sito non usa cookie, né strumenti di statistica o di profilazione, e non carica contenuti da servizi di terze parti.</p>

    <h2 class="${h2}">Dati inviati volontariamente</h2>
    <p class="${p}">Se contatti il titolare per telefono o email, i dati che fornisci (ad esempio nome, recapiti e contenuto del messaggio) sono usati solo per risponderti e, se lo desideri, per fissare un appuntamento. Sono trattati nel rispetto del segreto professionale e conservati solo per il tempo necessario. Ti invitiamo a non inviare per email informazioni dettagliate sulla tua salute: potrai parlarne di persona durante il primo colloquio.</p>

    <h2 class="${h2}">I tuoi diritti</h2>
    <p class="${p}">Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli o limitarne il trattamento, e opporti al trattamento (artt. 15-22 GDPR), scrivendo all'indirizzo email indicato sopra. Hai anche il diritto di presentare reclamo al <a href="https://www.garanteprivacy.it" class="text-[#2788a5] underline" rel="noopener">Garante per la protezione dei dati personali</a>.</p>

    <p class="text-sm text-gray-400 mt-12">Ultimo aggiornamento: ${PRIVACY_AGGIORNATA}</p>
</main>

${footer(g, anno)}

</body>
</html>
`;
}
