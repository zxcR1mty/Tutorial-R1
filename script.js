document.addEventListener("mousemove", e=>{

const bg=document.querySelector(".background");

const x=e.clientX/window.innerWidth;
const y=e.clientY/window.innerHeight;

bg.style.transform=
`translate(${x*15}px,${y*15}px) scale(1.08)`;

});
