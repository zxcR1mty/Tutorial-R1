// Glow эффект на карточках
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 120, 0.25), rgba(255,255,255,0.03))`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255,255,255,0.03)';
    });
});

// Параллакс фона
document.addEventListener('mousemove', e => {
    const bg = document.querySelector('.background');
    const x = (e.clientX / window.innerWidth) * 28;
    const y = (e.clientY / window.innerHeight) * 28;
    bg.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
});

// Частицы
function createParticle() {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.width = Math.random() * 4 + 'px';
    p.style.height = p.style.width;
    p.style.background = '#00ff88';
    p.style.borderRadius = '50%';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.opacity = Math.random() * 0.5 + 0.3;
    p.style.zIndex = '-2';
    document.body.appendChild(p);

    setTimeout(() => p.remove(), 18000);
}

setInterval(createParticle, 80);
