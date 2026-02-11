<?php
$json_data = file_get_contents('testi.json');
$testi = json_decode($json_data, true);
?>
<!DOCTYPE html>
<html lang="it" class="scroll-smooth"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $testi['seo']['title']; ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&amp;family=Montserrat:wght@300;400;600&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <body class="antialiased text-gray-800">

        <nav class="fixed w-full z-50 glass-nav">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <img src="asset/symbol_bold_colored.png" alt="Logo" class="h-12 w-auto">
            <div class="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-semibold items-baseline">
            <a href="#home" class="hover:text-[#2788a5] transition"><?php echo $testi['navbar']['links'][0]; ?></a>
            <a href="#chi-sono" class="hover:text-[#2788a5] transition"><?php echo $testi['navbar']['links'][1]; ?></a>
            <a href="#servizi" class="hover:text-[#2788a5] transition"><?php echo $testi['navbar']['links'][2]; ?></a>
            <a href="#contatti" class="px-5 py-2 bg-[#2788a5] text-white rounded-full hover:bg-gray-600 transition"><?php echo $testi['navbar']['links'][3]; ?></a>
        </div>
        <div class="md:hidden text-[#2788a5]">
            <button id="mobile-menu-button" aria-controls="mobile-menu" aria-expanded="false" class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2788a5]">
                <!-- open (hamburger) -->
                <svg data-open-icon xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
                <!-- close (x) -->
                <svg data-close-icon xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
    <!-- Mobile menu: full-screen sliding drawer -->
    <div id="mobile-menu" class="md:hidden fixed inset-0 z-50 transform translate-x-full transition-transform duration-300 bg-[rgba(248,247,235,0.98)] h-screen">
        <div class="max-w-md h-full mx-auto flex flex-col p-6">
            <div class="flex items-center justify-between">
                <img src="asset/symbol_bold_colored.png" alt="Logo" class="h-12 w-auto">
                <button id="mobile-menu-close" aria-label="Chiudi menu" class="p-2 rounded-md text-[#2788a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2788a5]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <nav class="mt-12 flex-1">
                <ul class="flex flex-col gap-6 text-lg uppercase font-semibold tracking-widest">
                    <li><a href="#home" class="hover:text-[#2788a5] transition"><?php echo $testi['navbar']['links'][0]; ?></a></li>
                    <li><a href="#chi-sono" class="hover:text-[#2788a5] transition"><?php echo $testi['navbar']['links'][1]; ?></a></li>
                    <li><a href="#servizi" class="hover:text-[#2788a5] transition"><?php echo $testi['navbar']['links'][2]; ?></a></li>
                    <li><a href="#contatti" class="inline-block px-6 py-3 bg-[#2788a5] text-white rounded-full hover:bg-gray-600 transition"><?php echo $testi['navbar']['links'][3]; ?></a></li>
                </ul>
            </nav>

            <div class="pt-6 text-sm text-gray-600">
                <p>Tel: <?php echo $testi['contatti']['telefono']; ?></p>
                <p class="mt-2">Email: <?php echo $testi['contatti']['email']; ?></p>
            </div>
        </div>
    </div>
</nav>

<section id="home" class="min-h-screen flex items-center pt-32 px-6 pb-6">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
            <h1 class="hero-clamp mb-6 text-gray-900"><?php echo $testi['hero']['titolo']; ?></h1>
            <p class="text-lg mb-8 text-gray-600 max-w-md"><?php echo $testi['hero']['sottotitolo']; ?></p>
            <a href="#contatti" class="inline-block px-8 py-4 bg-[#2788a5] text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"><?php echo $testi['hero']['cta_button']; ?></a>
        </div>
        <div class="order-1 md:order-2 relative flex justify-center">
            <div class="organic-shape bg-[#2788a5] w-full aspect-square opacity-20 absolute -top-4 -left-4 animate-slow-pulse"></div>
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&amp;fit=crop&amp;q=80&amp;w=800" alt="Dr.ssa Susanna Mancini" class="relative z-10 rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition duration-700 max-h-[60vh] max-w-[60vw]">
        </div>
    </div>
</section>

<section id="chi-sono" class="py-24 bg-white px-6">
    <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-12 gap-12 items-center">
            <div class="md:col-span-5">
                <h2 class="text-4xl md:text-5xl mb-6"><?php echo $testi['chi_sono']['titolo']; ?></h2>
                <p class="text-gray-600 leading-relaxed mb-6"><?php echo $testi['chi_sono']['testo']; ?></p>
            </div>
            <div class="md:col-span-7 grid grid-cols-2 gap-4">
                <div class="bg-[#f8f7eb] p-8 rounded-3xl mt-12">
                    <h3 class="text-2xl mb-2 text-[#2788a5]"><?php echo $testi['chi_sono']['cards'][0]['titolo']; ?></h3>
                    <p class="text-sm"><?php echo $testi['chi_sono']['cards'][0]['testo']; ?></p>
                </div>
                <div class="bg-[#2788a5] p-8 rounded-3xl text-white">
                    <h3 class="text-2xl mb-2"><?php echo $testi['chi_sono']['cards'][1]['titolo']; ?></h3>
                    <p class="text-sm"><?php echo $testi['chi_sono']['cards'][1]['testo']; ?></p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="curriculum" class="py-24 px-6 bg-white">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl mb-16 text-center"><?php echo $testi['curriculum']['titolo']; ?></h2>
        
        <!-- Formazione -->
        <div class="mb-20">
            <h3 class="text-2xl font-playfair font-bold text-[#2788a5] mb-12">Formazione</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <?php foreach ($testi['curriculum']['formazione'] as $item): ?>
                <div class="relative pl-8 pb-12 border-l-2 border-gray-300 hover:border-[#2788a5] transition duration-300">
                    <div class="absolute left-0 top-0 w-4 h-4 bg-[#2788a5] rounded-full transform -translate-x-[9px]"></div>
                    <p class="font-bold text-[#2788a5] text-lg mb-2"><?php echo $item['anno']; ?></p>
                    <h4 class="text-xl font-semibold text-gray-900 mb-2"><?php echo $item['titolo']; ?></h4>
                    <p class="text-gray-600 text-sm leading-relaxed"><?php echo $item['descrizione']; ?></p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Esperienze -->
        <div>
            <h3 class="text-2xl font-playfair font-bold text-[#2788a5] mb-12">Esperienze Professionali</h3>
            <div class="grid md:grid-cols-2 gap-8">
                <?php foreach ($testi['curriculum']['esperienze'] as $item): ?>
                <div class="relative pl-8 pb-12 border-l-2 border-gray-300 hover:border-[#2788a5] transition duration-300">
                    <div class="absolute left-0 top-0 w-4 h-4 bg-[#2788a5] rounded-full transform -translate-x-[9px]"></div>
                    <p class="font-bold text-[#2788a5] text-lg mb-2"><?php echo $item['anno']; ?></p>
                    <h4 class="text-xl font-semibold text-gray-900 mb-2"><?php echo $item['titolo']; ?></h4>
                    <p class="text-gray-600 text-sm leading-relaxed"><?php echo $item['descrizione']; ?></p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<section id="servizi" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl mb-4"><?php echo $testi['servizi']['titolo']; ?></h2>
            <div class="h-1 w-20 bg-[#2788a5] mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-3 items-start gap-8">
            <?php foreach ($testi['servizi']['items'] as $idx => $servizio): ?>
            <div class="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition group border-2 border-transparent hover:border-[#2788a5]">
                <div class="w-12 h-12 bg-[#f8f7eb] rounded-full mb-6 flex items-center justify-center group-hover:bg-[#2788a5] transition">
                    <svg class="w-6 h-6 text-[#2788a5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 class="text-2xl mb-4"><?php echo $servizio['titolo']; ?></h3>
                <p class="text-gray-500 text-sm mb-6"><?php echo $servizio['descrizione']; ?></p>
                
                <button class="service-toggle text-sm font-semibold text-[#2788a5] hover:text-gray-900 transition flex items-center gap-2" data-service="<?php echo $idx; ?>">
                    <span>Scopri di più</span>
                    <svg class="w-4 h-4 transition-transform" data-icon="arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
                
                <div class="service-details max-h-0 overflow-hidden transition-all duration-300 ease-out" data-service="<?php echo $idx; ?>">
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <p class="text-gray-600 text-sm leading-relaxed"><?php echo $servizio['dettagli_estesi']; ?></p>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section id="contatti" class="py-24 px-6 bg-[#f8f7eb]">
    <div class="max-w-7xl mx-auto">
        <div class="mb-16 text-center">
            <h2 class="text-4xl md:text-5xl mb-4"><?php echo $testi['contatti']['titolo']; ?></h2>
            <div class="h-1 w-20 bg-[#2788a5] mx-auto"></div>
        </div>
        
        <!-- Foto Studio -->
        <div class="mb-16">
            <img src="<?php echo $testi['contatti']['foto_studio']; ?>" alt="Studio della Dr.ssa Susanna Mancini" class="w-full h-96 object-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition duration-700">
        </div>

        <div class="bg-white rounded-[3rem] overflow-hidden shadow-2xl grid md:grid-cols-2 gap-0">
            <!-- Left: Contact Info -->
            <div class="p-12 bg-[#2788a5] text-white flex flex-col justify-center">
                <h2 class="text-3xl mb-8 font-playfair"><?php echo $testi['contatti']['titolo']; ?></h2>
                <p class="mb-10 opacity-90"><?php echo $testi['contatti']['sottotitolo']; ?></p>
                
                <div class="space-y-6 mb-8">
                    <!-- Telefono -->
                    <div class="flex items-start gap-4">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <div>
                            <p class="text-sm opacity-75">Telefono</p>
                            <a href="tel:<?php echo $testi['contatti']['telefono']; ?>" class="font-semibold hover:opacity-70 transition"><?php echo $testi['contatti']['telefono']; ?></a>
                        </div>
                    </div>
                    
                    <!-- Email -->
                    <div class="flex items-start gap-4">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        <div>
                            <p class="text-sm opacity-75">Email</p>
                            <a href="mailto:<?php echo $testi['contatti']['email']; ?>" class="font-semibold hover:opacity-70 transition"><?php echo $testi['contatti']['email']; ?></a>
                        </div>
                    </div>
                    
                    <!-- Indirizzo -->
                    <div class="flex items-start gap-4">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <div>
                            <p class="text-sm opacity-75">Studio</p>
                            <p class="font-semibold"><?php echo $testi['contatti']['indirizzo']; ?></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: Form -->
            <form class="p-12 space-y-4 bg-white flex flex-col justify-center">
                <input type="text" placeholder="<?php echo $testi['contatti']['form']['nome_placeholder']; ?>" class="w-full p-4 border-b border-gray-200 focus:outline-none focus:border-[#2788a5] bg-transparent">
                <input type="email" placeholder="<?php echo $testi['contatti']['form']['email_placeholder']; ?>" class="w-full p-4 border-b border-gray-200 focus:outline-none focus:border-[#2788a5] bg-transparent">
                <textarea placeholder="<?php echo $testi['contatti']['form']['messaggio_placeholder']; ?>" rows="4" class="w-full p-4 border-b border-gray-200 focus:outline-none focus:border-[#2788a5] bg-transparent resize-none"></textarea>
                <button class="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-[#2788a5] transition duration-500 font-semibold"><?php echo $testi['contatti']['form']['submit_button']; ?></button>
            </form>
        </div>
    </div>
</section>

<footer class="py-8 text-center text-xs text-gray-400 uppercase tracking-widest">
    <?php echo $testi['footer']['copyright']; ?>
</footer>

    <script src="script.js"></script>
</body></html>