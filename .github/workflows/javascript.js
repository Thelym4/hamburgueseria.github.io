/* ========================================
   BLAZE BURGER - Premium JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScroll();
    initParallaxEffect();
    initMobileMenu();
    initVideoBackground();
});

/* ========================================
   NAVBAR
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active link based on scroll position
        updateActiveLink(sections, navLinks);
    });
}

function updateActiveLink(sections, navLinks) {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add stagger effect for burger cards
    const burgerCards = document.querySelectorAll('.burger-card');
    burgerCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger effect for ingredient cards
    const ingredientCards = document.querySelectorAll('.ingredient-card');
    ingredientCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
    });
}

/* ========================================
   COUNTER ANIMATIONS
   ======================================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/* ========================================
   PARALLAX MOUSE EFFECT
   ======================================== */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroContent.style.transform = `
                translate(${x * -20}px, ${y * -10}px)
            `;
        });

        hero.addEventListener('mouseleave', () => {
            heroContent.style.transform = 'translate(0, 0)';
        });
    }

    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 10;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.innerHTML = navLinks.innerHTML;
        document.body.appendChild(overlay);

        // Style the overlay
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 10, 0.98);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 24px;
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.4s ease, visibility 0.4s ease;
            }
            .mobile-menu-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            .mobile-menu-overlay a {
                font-size: 1.5rem;
                font-weight: 500;
                color: #fff;
                text-transform: uppercase;
                letter-spacing: 2px;
                padding: 12px 24px;
                transition: color 0.3s ease, transform 0.3s ease;
            }
            .mobile-menu-overlay a:hover {
                color: #d4a853;
                transform: scale(1.1);
            }
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }
        `;
        document.head.appendChild(style);

        // Toggle menu
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking links
        overlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }
}

function closeMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (menuBtn && overlay) {
        menuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ========================================
   VIDEO BACKGROUND
   ======================================== */
function initVideoBackground() {
    const video = document.querySelector('.hero-video');

    if (video) {
        // Ensure video plays on mobile
        video.play().catch(() => {
            // If autoplay fails, show a fallback or just continue
            console.log('Video autoplay was prevented');
        });

        // Pause video when not in viewport (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(video);
    }
}

/* ========================================
   CARD HOVER EFFECTS
   ======================================== */
document.querySelectorAll('.burger-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        }
    });
});

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ========================================
   TEXT REVEAL ANIMATION
   ======================================== */
function initTextReveal() {
    const titles = document.querySelectorAll('.section-title');

    titles.forEach(title => {
        const words = title.innerHTML.split(' ');
        title.innerHTML = words.map(word =>
            `<span class="word-wrap"><span class="word">${word}</span></span>`
        ).join(' ');
    });
}

/* ========================================
   CURSOR TRAIL EFFECT (Optional Premium)
   ======================================== */
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.5}px;
            height: ${8 - i * 0.5}px;
            background: rgba(212, 168, 83, ${1 - i * 0.1});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;

            const nextDot = trail[index + 1] || trail[0];
            x += (parseFloat(nextDot.style.left || mouseX) - x) * 0.3;
            y += (parseFloat(nextDot.style.top || mouseY) - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    // Uncomment to enable cursor trail
    // animateTrail();
}

/* ========================================
   PAGE LOAD ANIMATION
   ======================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero elements with stagger
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.2 + index * 0.15}s`;
    });
});

/* ========================================
   SCROLL PROGRESS INDICATOR
   ======================================== */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #d4a853, #e6c47a);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

// Initialize scroll progress
initScrollProgress();

/* ========================================
   TILT EFFECT FOR CARDS
   ======================================== */
document.querySelectorAll('.ingredient-card, .burger-card').forEach(card => {
    // Remove CSS transition for instant response
    card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Reduced rotation intensity for subtler effect
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        // Apply transform directly without transition delay
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        // Smooth return animation only on leave
        card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';

        // Reset transition after animation completes
        setTimeout(() => {
            card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        }, 400);
    });
});

console.log('🔥 Blaze Burger - Premium Experience Loaded');
