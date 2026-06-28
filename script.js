// script.js

document.querySelectorAll('.card').forEach(card => {

```
card.addEventListener('mousemove', e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background =
    `radial-gradient(circle at ${x}px ${y}px,
    rgba(255,255,255,.08),
    rgba(255,255,255,.01) 60%)`;

});

card.addEventListener('mouseleave', () => {

    card.style.background =
    'rgba(255,255,255,.01)';

});
```

});
document.addEventListener("mousemove", e=>{

const bg=document.querySelector(".background");

const x=e.clientX/window.innerWidth;
const y=e.clientY/window.innerHeight;

bg.style.transform=
`translate(${x*15}px,${y*15}px) scale(1.08)`;

});
