// Service Details Toggle with Smooth Animation
(function(){
    const toggles = document.querySelectorAll('.service-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function(e){
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            const details = document.querySelector(`.service-details[data-service="${serviceId}"]`);
            const arrowIcon = this.querySelector('[data-icon="arrow"]');
            const isExpanded = details.classList.contains('expanded');
            
            // Close all other details
            document.querySelectorAll('.service-details').forEach(d => {
                if(d !== details && d.classList.contains('expanded')) {
                    d.classList.remove('expanded');
                    d.style.maxHeight = '0px';
                    const relatedToggle = document.querySelector(`.service-toggle[data-service="${d.getAttribute('data-service')}"]`);
                    if(relatedToggle) {
                        relatedToggle.querySelector('[data-icon="arrow"]').style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current details
            if(isExpanded){
                details.classList.remove('expanded');
                details.style.maxHeight = '0px';
                arrowIcon.style.transform = 'rotate(0deg)';
            } else {
                details.classList.add('expanded');
                details.style.maxHeight = details.scrollHeight + 'px';
                arrowIcon.style.transform = 'rotate(90deg)';
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
