// Hover glow на карточках
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
            radial-gradient(circle at ${x}px ${y}px, 
            rgba(0, 255, 120, 0.15), 
            rgba(255,255,255,0.02) 60%)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255,255,255,0.03)';
    });
});

// Параллакс фона
document.addEventListener("mousemove", (e) => {
    const bg = document.querySelector(".background");
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;
    bg.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
});
