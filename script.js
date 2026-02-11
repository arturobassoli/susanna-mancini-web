// Service Details Toggle
(function(){
    const toggles = document.querySelectorAll('.service-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e){
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            const details = document.querySelector(`.service-details[data-service="${serviceId}"]`);
            const isHidden = details.classList.contains('hidden');
            
            // Hide all other details
            document.querySelectorAll('.service-details').forEach(d => {
                d.classList.add('hidden');
            });
            
            // Toggle current details
            if(isHidden){
                details.classList.remove('hidden');
                this.textContent = 'Chiudi ↑';
            } else {
                details.classList.add('hidden');
                this.textContent = 'Scopri di più →';
            }
        });
    });
})();

// Mobile Menu Toggle
(function(){
    const btn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    if(!btn || !menu) return;

    function openMenu(){
        btn.setAttribute('aria-expanded','true');
        menu.classList.remove('translate-x-full');
        menu.classList.add('translate-x-0');
        // swap icons
        const openIcon = btn.querySelector('[data-open-icon]');
        const closeIcon = btn.querySelector('[data-close-icon]');
        if (openIcon) openIcon.classList.add('hidden');
        if (closeIcon) closeIcon.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeMenu(){
        btn.setAttribute('aria-expanded','false');
        menu.classList.remove('translate-x-0');
        menu.classList.add('translate-x-full');
        const openIcon = btn.querySelector('[data-open-icon]');
        const closeIcon = btn.querySelector('[data-close-icon]');
        if (openIcon) openIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    btn.addEventListener('click', ()=> {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) closeMenu(); else openMenu();
    });

    if (closeBtn){
        closeBtn.addEventListener('click', closeMenu);
    }

    // close menu when clicking a link
    menu.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click', ()=> {
            closeMenu();
        });
    });

    // Escape key closes menu
    document.addEventListener('keydown', (e)=>{
        if (e.key === 'Escape') closeMenu();
    });

    // ensure menu closes if resizing to desktop
    window.addEventListener('resize', ()=> {
        if (window.innerWidth >= 768){
            closeMenu();
        }
    });
})();
