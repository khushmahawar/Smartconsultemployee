// Success Page Neuro-Background
const canvas = document.getElementById('success-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = Math.random() > 0.5 ? '#00ffae' : '#00f2fe';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 50; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initCanvas();
createParticles();
animateParticles();

window.addEventListener('resize', initCanvas);

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();
  tl.from(".container", { scale: 0.8, opacity: 0, duration: 1, ease: "power4.out" })
    .from(".checkmark", { scale: 0, rotate: -45, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
    .from(".reveal-text", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
    .from(".status-badge", { x: -20, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(".tagline", { opacity: 0, duration: 1 }, "-=0.5")
    .from(".cyber-btn", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8");
});
