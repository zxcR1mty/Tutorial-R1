// Параллакс фона
document.addEventListener('mousemove', e => {
    const bg = document.querySelector('.background');
    const x = (e.clientX / window.innerWidth) * 25;
    const y = (e.clientY / window.innerHeight) * 25;
    bg.style.transform = `translate(${x}px, ${y}px)`;
});

// Glow на карточках
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,120,0.25), rgba(255,255,255,0.04))`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255,255,255,0.04)';
    });
});

// Частицы
function createParticle() {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.width = Math.random() * 3.5 + 'px';
    p.style.height = p.style.width;
    p.style.background = '#00ff88';
    p.style.borderRadius = '50%';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-10px';
    p.style.opacity = Math.random() * 0.6 + 0.3;
    p.style.zIndex = '-2';
    document.body.appendChild(p);

    let y = -10;
    const speed = Math.random() * 1.5 + 0.8;

    const interval = setInterval(() => {
        y += speed;
        p.style.top = y + 'vh';
        if (y > 110) {
            clearInterval(interval);
            p.remove();
        }
    }, 30);
}

setInterval(createParticle, 90);
