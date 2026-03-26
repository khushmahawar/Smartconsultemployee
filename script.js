// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Prevent Lenis from messing with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// ==========================================
// PRELOADER & INITIAL REVEAL
// ==========================================
const tl = gsap.timeline();

gsap.set('.line', { y: '110%' });
gsap.set('.badge-wrapper', { opacity: 0, y: 20 });
gsap.set(['.hero-subtitle', '.action-buttons'], { opacity: 0, y: 20 });
gsap.set('.timer-card', { opacity: 0, scale: 0.95 });

window.addEventListener('load', () => {
    // Text reveal
    tl.to('.preloader-text', {
        y: '0%', opacity: 1, duration: 1, ease: 'power4.out'
    })
    // Progress
    .to('.preloader-progress', {
        width: '100%', duration: 1.5, ease: 'power2.inOut'
    }, '-=0.5')
    // Hide preloader
    .to('.preloader', {
        y: '-100%', duration: 1.2, ease: 'power4.inOut',
        onComplete: () => {
            document.body.classList.remove('loading');
        }
    })
    // Reveal Nav
    .to('.navbar', {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out'
    }, '-=0.8')
    // Reveal Hero Text Stagger
    .to('.badge-wrapper', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.6')
    .to('.line', {
        y: '0%', duration: 1, stagger: 0.15, ease: 'power4.out'
    }, '-=0.6')
    .to(['.hero-subtitle', '.action-buttons'], {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
    }, '-=0.4')
    // Reveal Timer Card
    .to('.timer-card', {
        opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)'
    }, '-=0.5');
});

// ==========================================
// CUSTOM CURSOR & MAGNETIC EFFECT
// ==========================================
const customCursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const magneticElements = document.querySelectorAll('[data-magnetic]');

if (window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(customCursor, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' });
        gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    });

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
            cursorFollower.classList.add('hoverive');
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
            cursorFollower.classList.remove('hoverive');
        });
    });
}

// ==========================================
// 3D TILT EFFECT (TIMER CARD)
// ==========================================
const tiltElements = document.querySelectorAll('[data-tilt]');

if (window.innerWidth > 1024) {
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            gsap.to(el, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Move glow effect inside card
            const glow = el.querySelector('.timer-card-glow');
            if(glow) {
                gsap.to(glow, {
                    x: (x - centerX) * 0.2,
                    duration: 0.5
                });
            }
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                rotateX: 0,
                rotateY: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            });
            const glow = el.querySelector('.timer-card-glow');
            if(glow) gsap.to(glow, { x: 0, duration: 1 });
        });
    });
}

// ==========================================
// INFINITE MARQUEE
// ==========================================
const marqueeContainers = document.querySelectorAll('.marquee-content');
marqueeContainers.forEach((el) => {
    // Duplicate content twice more for seamless looping at all screens
    el.innerHTML += el.innerHTML;
});

// Calculate total width of one marquee-content container for seamless scroll
gsap.to('.marquee-container', {
    xPercent: -50,
    ease: 'none',
    duration: 20,
    repeat: -1
});

// ==========================================
// SCROLL ANIMATIONS (CARD STAGGERS)
// ==========================================
const revealTexts = document.querySelectorAll('.reveal-text');
revealTexts.forEach(el => {
    gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            opacity: 1, y: 0, duration: 1, ease: 'power3.out'
        }
    );
});

// Culture Cards Stagger
gsap.fromTo('.stagger-card', 
    { opacity: 0, y: 60 },
    {
        scrollTrigger: {
            trigger: '.cards-grid',
            start: 'top 80%',
        },
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }
);

// ==========================================
// PARALLAX EFFECTS
// ==========================================
gsap.utils.toArray('[data-speed]').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed'));
    gsap.to(el, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * (speed - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Parallax Image Background
gsap.to('.parallax-image', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.visual-break',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});


// ==========================================
// TIMER LOGIC
// ==========================================
const deadline = new Date("2026-04-15T23:59:59").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = deadline - now;

  if (distance < 0) {
    document.getElementById("timer").innerHTML = "<div class='time-box'><span style='font-size:1.5rem;'>Applications Closed ❌</span></div>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  const fDays = days < 10 ? '0' + days : days;
  const fHours = hours < 10 ? '0' + hours : hours;
  const fMins = minutes < 10 ? '0' + minutes : minutes;
  const fSecs = seconds < 10 ? '0' + seconds : seconds;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("minutes");
  const secsEl = document.getElementById("seconds");

  if(daysEl) daysEl.innerText = fDays;
  if(hoursEl) hoursEl.innerText = fHours;
  if(minsEl) minsEl.innerText = fMins;
  if(secsEl) secsEl.innerText = fSecs;
}

updateTimer();
setInterval(updateTimer, 1000);

// ==========================================
// NAVIGATION (RETAINED)
// ==========================================
function goToApply() {
  window.location.href = "/career";
}

function goToLogin() {
  window.location.href = "/login";
}