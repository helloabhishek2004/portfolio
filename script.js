const typingElement = document.getElementById("typing");
const textArray = ["Abhishek", "a Designer", "a Developer", "an AI Explorer","a Creative Thinker"];
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

function setCanvasSize() {
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;
  
  canvas.style.width = displayWidth + 'px';
  canvas.style.height = displayHeight + 'px';
  
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = displayWidth * pixelRatio;
  canvas.height = displayHeight * pixelRatio;
  
  ctx.scale(pixelRatio, pixelRatio);
  
  initParticles();
}

let particles = [];
const PARTICLE_COUNT = 320;

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) *1,
      opacity: Math.random() * 0.5 + 0.3
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    
    const isDark = document.body.classList.contains('dark-mode');
    const color = isDark ? `rgba(255, 255, 255, ${p.opacity * 0.3})` : `rgba(43, 124, 90, ${p.opacity})`;
    ctx.fillStyle = color;
    ctx.fill();
    
    p.x += p.dx;
    p.y += p.dy;
    
    const buffer = 5;
    if (p.x < -buffer || p.x > window.innerWidth + buffer) p.dx *= -1;
    if (p.y < -buffer || p.y > window.innerHeight + buffer) p.dy *= -1;
  }
  
  requestAnimationFrame(animate);
}

setCanvasSize();
animate();

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    setCanvasSize();
  }, 250);
});

window.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    setTimeout(setCanvasSize, 100);
  }
});

window.matchMedia('(resolution)').addEventListener('change', setCanvasSize);


document.addEventListener('DOMContentLoaded', function() {
  const aboutMeCard = document.getElementById('about-me');
  const readMoreBtn = document.querySelector('.read-more-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModalBtn = document.querySelector('.close-modal');
  
  // Function to open modal
  function openModal() {
    modalOverlay.classList.add('active');
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  // Function to close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    // Restore body scrolling
    document.body.style.overflow = '';
  }
  
  // Open modal when clicking the card or the read more button
  aboutMeCard.addEventListener('click', function(e) {
    // Only open if they didn't click the button (button has its own listener)
    if (!e.target.classList.contains('read-more-btn')) {
      openModal();
    }
  });
  
  readMoreBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent triggering the card's click event
    openModal();
  });
  
  // Close modal when clicking the close button
  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside the modal content
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  // Close modal with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  // Initialize intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Apply animation when tile becomes visible
        animateTile(entry.target);
        // Stop observing after animation is applied
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Staggered animation for tiles
  const tiles = document.querySelectorAll('.card');
  tiles.forEach((tile, index) => {
    // Set initial state
    tile.style.opacity = '0';
    
    // Start observing tiles
    observer.observe(tile);
  });
  
  // Function to apply different animations to different tiles
  function animateTile(tile) {
    // Array of animation names
    const animations = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'zoomIn', 'flipIn'];
    
    // Choose animation based on tile type
    let animation = '';
    let duration = 0.6;
    let delay = 0;
    
    if (tile.classList.contains('hero')) {
      animation = 'zoomIn';
      delay = 0;
    } else if (tile.classList.contains('portrait-container')) {
      animation = 'fadeInRight';
      delay = 0.2;
    } else if (tile.classList.contains('project')) {
      animation = 'fadeInUp';
      delay = 0.4;
    } else if (tile.classList.contains('skills')) {
      animation = 'fadeInLeft';
      delay = 0.5;
    } else if (tile.classList.contains('contact')) {
      animation = 'fadeInRight';
      delay = 0.6;
    } else if (tile.classList.contains('about-me')) {
      animation = 'flipIn';
      delay = 0.3;
    } else {
      // Random animation for any other tiles
      animation = animations[Math.floor(Math.random() * animations.length)];
      delay = Math.random() * 0.5;
    }
    
    // Apply animation
    tile.style.animation = `${animation} ${duration}s ease-out forwards`;
    tile.style.animationDelay = `${delay}s`;
  }
  
  // Additional code to handle resize events
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Adjust layout if needed after resize
      const container = document.querySelector('main.container');
      const tiles = container.querySelectorAll('.card');
      
      // Apply responsive adjustments based on container width
      if (container.offsetWidth < 768) {
        // Mobile layout adjustments
        tiles.forEach(tile => {
          if (tile.classList.contains('hero') || tile.classList.contains('project')) {
            tile.style.gridColumn = 'span 1';
          }
        });
      } else {
        // Reset to default layout
        tiles.forEach(tile => {
          if (tile.classList.contains('hero') || tile.classList.contains('project')) {
            tile.style.gridColumn = 'span 2';
          }
        });
      }
    }, 250);
  });
  
  // Handle content-based sizing
  // This uses a MutationObserver to detect content changes
  const contentObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        const tile = mutation.target.closest('.card');
        if (tile) {
          // Let the tile grow with content (up to max-height)
          tile.style.height = 'auto';
        }
      }
    });
  });
  
  // Observe content changes in all tiles
  document.querySelectorAll('.card').forEach(tile => {
    contentObserver.observe(tile, { 
      childList: true, 
      subtree: true,
      characterData: true 
    });
  });
});