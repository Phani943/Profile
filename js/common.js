document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navOverlay = document.querySelector('.nav-overlay');

    const setMenuState = (isOpen) => {
        if (!menuToggle || !navbar) {
            return;
        }

        navbar.classList.toggle('active', isOpen);
        menuToggle.classList.toggle('active', isOpen);
        if (navOverlay) {
            navOverlay.classList.toggle('active', isOpen);
        }
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navbar.classList.contains('active');
            setMenuState(!isOpen);
        });

        document.querySelectorAll('.nav_link').forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                setMenuState(false);
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                setMenuState(false);
            }
        });

        document.addEventListener('click', (e) => {
            if (
                navbar.classList.contains('active') &&
                !navbar.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                setMenuState(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navbar.classList.contains('active')) {
                setMenuState(false);
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
