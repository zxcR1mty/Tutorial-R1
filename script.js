// ===== R1MTY Website JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();
    initCardHoverEffects();
    initCardClickHandler();
    initNavbarScroll();
    initParallaxEffect();
    initMobileResponsive();
});

// ===== АНИМАЦИЯ КАРТОЧЕК =====
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${0.05 + index * 0.05}s`;
    });
}

// ===== ЭФФЕКТ НАВЕДЕНИЯ НА КАРТОЧКИ (3D-наклон) =====
function initCardHoverEffects() {
    document.querySelectorAll('.card').forEach(card => {
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
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== КЛИК ПО КАРТОЧКЕ =====
function initCardClickHandler() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title')?.textContent?.trim();
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.15);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                width: 300px;
                height: 300px;
                left: 50%;
                top: 50%;
                margin-left: -150px;
                margin-top: -150px;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            console.log(`🔗 Переход на гайд: ${title || 'неизвестный'}`);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== ЭФФЕКТ ПРИ СКРОЛЛЕ ШАПКИ =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.6)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        lastScroll = currentScroll;
    });
}

// ===== ПАРАЛЛАКС-ЭФФЕКТ ДЛЯ ЛОГОТИПА =====
function initParallaxEffect() {
    const heroLogo = document.querySelector('.hero-logo-img');
    if (!heroLogo) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = document.querySelector('.hero')?.offsetHeight || 400;
                
                if (scrollY < heroHeight) {
                    const parallaxSpeed = 0.3;
                    heroLogo.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
                    heroLogo.style.opacity = 1 - (scrollY / heroHeight) * 0.6;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== МОБИЛЬНАЯ АДАПТАЦИЯ =====
function initMobileResponsive() {
    const handleResize = () => {
        const width = window.innerWidth;
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (width < 480) {
            navLinks.forEach(link => {
                link.style.fontSize = '11px';
                link.style.padding = '6px 12px';
            });
        } else if (width < 768) {
            navLinks.forEach(link => {
                link.style.fontSize = '12px';
                link.style.padding = '8px 16px';
            });
        } else {
            navLinks.forEach(link => {
                link.style.fontSize = '';
                link.style.padding = '';
            });
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
}

console.log('🚀 R1 Website загружен!');
console.log('📱 Соцсети в шапке: Telegram, VK, Discord');
