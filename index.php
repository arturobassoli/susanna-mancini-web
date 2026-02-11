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
            <span class="text-xl font-bold tracking-tighter text-[#2788a5]"><?php echo $testi['navbar']['logo']; ?></span>
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
                <span class="text-xl font-bold tracking-tighter text-[#2788a5]"><?php echo $testi['navbar']['logo']; ?></span>
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

<section id="servizi" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl mb-4"><?php echo $testi['servizi']['titolo']; ?></h2>
            <div class="h-1 w-20 bg-[#2788a5] mx-auto"></div>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
            <?php foreach ($testi['servizi']['items'] as $servizio): ?>
            <div class="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition group border-2 border-transparent hover:border-[#2788a5]">
                <div class="w-12 h-12 bg-[#f8f7eb] rounded-full mb-6 flex items-center justify-center group-hover:bg-[#2788a5] transition">
                    <svg class="w-6 h-6 text-[#2788a5] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 class="text-2xl mb-4"><?php echo $servizio['titolo']; ?></h3>
                <p class="text-gray-500 text-sm"><?php echo $servizio['descrizione']; ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section id="contatti" class="py-24 px-6 bg-[#f8f7eb]">
    <div class="max-w-4xl mx-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div class="p-12 md:w-1/2 bg-[#2788a5] text-white">
            <h2 class="text-3xl mb-6"><?php echo $testi['contatti']['titolo']; ?></h2>
            <p class="mb-8 opacity-90"><?php echo $testi['contatti']['sottotitolo']; ?></p>
            <div class="space-y-4">
                <p class="flex items-center gap-4"><span class="font-bold">Tel:</span> <a class="hover:opacity-70" href="tel:<?php echo $testi['contatti']['telefono']; ?>"><?php echo $testi['contatti']['telefono']; ?></a></p>
                <p class="flex items-center gap-4"><span class="font-bold">Email:</span> <a class="hover:opacity-70" href="mailto:<?php echo $testi['contatti']['email']; ?>"><?php echo $testi['contatti']['email']; ?></a></p>
            </div>
        </div>
        <form class="p-12 md:w-1/2 space-y-4">
            <input type="text" placeholder="<?php echo $testi['contatti']['form']['nome_placeholder']; ?>" class="w-full p-4 border-b border-gray-200 focus:outline-none focus:border-[#2788a5]">
            <input type="email" placeholder="<?php echo $testi['contatti']['form']['email_placeholder']; ?>" class="w-full p-4 border-b border-gray-200 focus:outline-none focus:border-[#2788a5]">
            <textarea placeholder="<?php echo $testi['contatti']['form']['messaggio_placeholder']; ?>" rows="4" class="w-full p-4 border-b border-gray-200 focus:outline-none focus:border-[#2788a5]"></textarea>
            <button class="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-[#2788a5] transition duration-500"><?php echo $testi['contatti']['form']['submit_button']; ?></button>
        </form>
    </div>
</section>

<footer class="py-8 text-center text-xs text-gray-400 uppercase tracking-widest">
    <?php echo $testi['footer']['copyright']; ?>
</footer>

    <script src="script.js"></script>
</body></html>