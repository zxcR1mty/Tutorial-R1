
js_code = '''// ===== R1MTY Website JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initCardHoverEffects();
    initSmoothScroll();
    initParallaxEffect();
    initNavbarScroll();
    initCardClickHandler();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    // Create mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    menuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Create mobile nav
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="#home">Главная</a>
        <a href="#guides">Гайды</a>
        <a href="#tools">Инструменты</a>
        <a href="https://t.me/" target="_blank">Telegram</a>
        <a href="https://github.com/" target="_blank">GitHub</a>
    `;
    
    navbar.appendChild(menuBtn);
    navbar.appendChild(mobileNav);
    
    // Toggle menu
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && mobileNav.classList.contains('active')) {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation to cards
                if (entry.target.classList.contains('cards-grid')) {
                    const cards = entry.target.querySelectorAll('.card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                } else {
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards grids
    document.querySelectorAll('.cards-grid').forEach(grid => {
        observer.observe(grid);
    });
    
    // Observe footer tagline
    const footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline) {
        observer.observe(footerTagline);
    }
}

// ===== CARD HOVER EFFECTS =====
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Mouse move glow effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Magnetic effect on icon
        const icon = card.querySelector('.card-icon');
        if (icon) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                icon.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) scale(1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                icon.style.transform = '';
            });
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const heroLogo = document.querySelector('.hero-logo-img');
    
    if (!heroLogo) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = document.querySelector('.hero').offsetHeight;
                
                if (scrollY < heroHeight) {
                    const parallaxSpeed = 0.3;
                    heroLogo.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
                    heroLogo.style.opacity = 1 - (scrollY / heroHeight) * 0.8;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        lastScroll = currentScroll;
    });
}

// ===== CARD CLICK HANDLER =====
function initCardClickHandler() {
    const cards = document.querySelectorAll('.card');
    
    const cardLinks = {
        'DOTA 2': '/guides/dota2',
        'VALORANT': '/guides/valorant',
        'CYBERPUNK 2077': '/guides/cyberpunk',
        'CS2': '/guides/cs2',
        'MINECRAFT': '/guides/minecraft',
        'WINDOWS 11': '/guides/windows11',
        'NVIDIA CONTROL PANEL': '/guides/nvidia-control-panel',
        'NVIDIA PROFILE INSPECTOR': '/guides/nvidia-profile-inspector',
        'NVIDIA APP': '/guides/nvidia-app',
        'MSI AFTERBURNER': '/guides/msi-afterburner'
    };
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent?.trim();
        
        card.addEventListener('click', () => {
            // Add click ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.1);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.marginLeft = -size / 2 + 'px';
            ripple.style.marginTop = -size / 2 + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Navigate (placeholder - replace with actual URLs)
            if (cardLinks[title]) {
                console.log(`Navigate to: ${cardLinks[title]}`);
                // window.location.href = cardLinks[title];
            }
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });
    
    // Add ripple keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITY: Debounce =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== UTILITY: Throttle =====
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== LAZY LOAD IMAGES =====
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== THEME TOGGLE (optional) =====
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initScrollAnimations,
        initCardHoverEffects,
        initSmoothScroll,
        initParallaxEffect,
        initNavbarScroll,
        initCardClickHandler
    };
}
'''

with open('/mnt/agents/output/script.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"✅ JS сохранён! Размер: {len(js_code)} символов")
