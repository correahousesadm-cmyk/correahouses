/**
 * Correa Houses - Main JavaScript
 * Modern, performant, accessible interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Theme toggle (dark/light) ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Default: light. Load saved preference or default to light.
    const savedTheme = localStorage.getItem('ch-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    function updateThemeColor(theme) {
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'light' ? '#ffffff' : '#1a1a2e';
        }
    }
    updateThemeColor(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const current = htmlElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', next);
        localStorage.setItem('ch-theme', next);
        updateThemeColor(next);
    });

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile menu ---
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');

    const openMenu = () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = '';
    };

    navToggle?.addEventListener('click', openMenu);
    navClose?.addEventListener('click', closeMenu);

    // Close menu on link click
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('show-menu') &&
            !navMenu.contains(e.target) &&
            !(navToggle?.contains(e.target))) {
            closeMenu();
        }
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            if (!link) return;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // --- Scroll animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything
        animatedElements.forEach(el => el.classList.add('animated'));
    }

    // --- Counter animation ---
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(element, target) {
        const duration = 1500;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // --- Gallery toggle ---
    const galleryToggle = document.getElementById('gallery-toggle');
    const galleryExtra = document.getElementById('gallery-extra');

    galleryToggle?.addEventListener('click', () => {
        if (!galleryExtra) return;
        galleryExtra.classList.toggle('show');
        const isShowing = galleryExtra.classList.contains('show');

        const icon = galleryToggle.querySelector('i, svg');
        galleryToggle.innerHTML = '';

        if (isShowing) {
            galleryToggle.innerHTML = '<i data-lucide="chevron-up"></i> Ver menos fotos';
        } else {
            galleryToggle.innerHTML = '<i data-lucide="images"></i> Ver mais fotos';
        }

        // Re-create Lucide icons for new elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Scroll to gallery if closing
        if (!isShowing) {
            document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox__close');
    const lightboxPrev = document.querySelector('.lightbox__prev');
    const lightboxNext = document.querySelector('.lightbox__next');

    let galleryImages = [];
    let currentImageIndex = 0;

    function collectGalleryImages() {
        galleryImages = Array.from(document.querySelectorAll('.gallery__item img'));
    }

    function openLightbox(index) {
        collectGalleryImages();
        currentImageIndex = index;
        lightboxImg.src = galleryImages[index].src;
        lightboxImg.alt = galleryImages[index].alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }

    // Attach click to gallery items (desktop only — evitar lightbox acidental no mobile)
    document.addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery__item');
        if (galleryItem) {
            collectGalleryImages();
            const img = galleryItem.querySelector('img');
            const index = galleryImages.indexOf(img);
            if (index !== -1) {
                openLightbox(index);
            }
        }
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext?.addEventListener('click', () => navigateLightbox(1));

    // Close on backdrop click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightbox?.querySelector('.lightbox__content')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
