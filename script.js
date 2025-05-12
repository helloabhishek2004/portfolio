const typingElement = document.getElementById("typing");
const textArray = ["Abhishek", "a Designer", "a Developer", "a Creative Thinker"];
let textIndex = 0;
let charIndex = 0;

function typeEffect() {
  if (charIndex < textArray[textIndex].length) {
    typingElement.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeEffect, 300);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

const toggleBtn = document.getElementById('darkToggle');
const toggleIcon = document.getElementById('toggleIcon');

function setDarkModeIcon(isDark) {
  // Fade out and slide up
  toggleIcon.style.opacity = '0';
  toggleIcon.style.transform = 'translateY(-20px) scale(0.7) rotate(-90deg)';
  setTimeout(() => {
    toggleIcon.textContent = isDark ? '☀️' : '🌙';
    // Fade in and slide in
    toggleIcon.style.transform = isDark
      ? 'translateY(0) scale(1.2) rotate(180deg)'
      : 'translateY(0) scale(1) rotate(0deg)';
    toggleIcon.style.opacity = '1';
  }, 200);
}

function updateDarkMode() {
  const isDark = document.body.classList.contains('dark-mode');
  setDarkModeIcon(isDark);
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  updateDarkMode();
});

// Initialize icon on load
document.addEventListener('DOMContentLoaded', () => {
  updateDarkMode();
});

const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function resizeCanvas() {
    // Always fill the entire viewport, regardless of zoom
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 20);
        ctx.fillStyle = "rgb(143, 124, 90)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    // Ensure canvas always fills the page, even after zooming
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        resizeCanvas();
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    resizeCanvas();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
