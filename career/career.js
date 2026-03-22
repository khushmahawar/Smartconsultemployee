// Robotic Backdrop: Particle System
const canvas = document.getElementById('bg-canvas');
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
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = `rgba(0, 242, 254, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.strokeStyle = `rgba(0, 242, 254, ${0.1 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  initCanvas();
  createParticles();
});

// Initialization
initCanvas();
createParticles();
animateParticles();

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline();

  tl.from(".glass-nav", { y: -50, opacity: 0, duration: 1, ease: "power4.out" })
    .from(".content-side h1", { x: -100, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.5")
    .from(".tagline", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .from(".pill", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5")
    .from(".form-side", { x: 100, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=1")
    .from(".input-row", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.8")
    .from(".minimal-footer", { opacity: 0, duration: 1 }, "-=0.5");

  // Mouse Parallax for Content
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    gsap.to(".glass-box", { rotationY: x, rotationX: -y, duration: 1, ease: "power2.out" });
    gsap.to(".content-side", { x: -x * 2, y: -y * 2, duration: 1.5, ease: "power2.out" });
  });
});

function goToLogin() {
  window.location.href = "/login/index.html";
}

// Form Handlers
document.getElementById("jobForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const loader = document.getElementById("loader");
  loader.classList.add("show");
  
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    college: document.getElementById("college").value,
    cpi: document.getElementById("cpi").value,
    phone: document.getElementById("phone").value
  };

  fetch("https://script.google.com/macros/s/AKfycbygedLkIw1WGOqSiNtp7enAXAzvOV51pdJUZkweKElDhhfEu9A49sOFlRxGUjdCyF7OCg/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then((response) => {
    loader.classList.remove("show");
    if (response.trim() === "EXISTS") {
      document.getElementById("errorBox").classList.add("show");
    } else {
      window.location.href = "/applied/index.html";
    }
  })
  .catch(() => {
    loader.classList.remove("show");
    alert("Connection unstable. Sync failed.");
  });
});

