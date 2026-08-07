// ========== MAIN.JS ==========
// ========== LOADING SCREEN ==========
document.body.classList.add('loading');

const loader = document.getElementById('loader');
const loaderPercent = document.querySelector('.loader-percent');

// Animate the percentage counter
let percent = 0;
const percentInterval = setInterval(() => {
  percent += 2;
  if (percent <= 100) {
    loaderPercent.textContent = percent + '%';
  } else {
    clearInterval(percentInterval);
  }
}, 28);

// Hide loader after content loads + minimum animation time
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');

    // Remove loader from DOM after transition
    setTimeout(() => {
      loader.remove();
    }, 700);
  }, 1500);
});




// ---- Navbar Scroll Effect + Scroll Progress ----
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
});

// ---- Hamburger Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

// ---- Typed Text Effect ----
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Software Developer',
  'CS Student @ UCY',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(type, typingSpeed);
}

setTimeout(type, 1000);

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ---- Project Card 3D Tilt ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Smooth Scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Add active style to nav ----
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active {
    color: var(--accent-light) !important;
  }
  .nav-links a.active::after {
    width: 100% !important;
  }
`;
document.head.appendChild(style);

// ---- Hero Title Fix - prevent overflow ----
function adjustHeroTitle() {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.maxWidth =
      window.innerWidth > 900 ? '55%' : '100%';
  }
}

adjustHeroTitle();
window.addEventListener('resize', adjustHeroTitle);

// ---- Page Load Animation ----
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
// ---- Tab Switcher ----
// Scoped per .tab-switcher so multiple independent tab groups on the page
// (Journey, Projects, ...) don't interfere with each other's active tab.
document.querySelectorAll('.tab-switcher').forEach(switcher => {
  const scope = switcher.parentElement;
  const tabBtns = switcher.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Animate out current tab
      const currentTab = scope.querySelector('.tab-content.active');
      if (currentTab) {
        currentTab.style.opacity = '0';
        currentTab.style.transform = 'translateY(16px)';
        setTimeout(() => {
          currentTab.classList.remove('active');
          currentTab.style.opacity = '';
          currentTab.style.transform = '';

          // Animate in new tab
          const newTab = scope.querySelector('#tab-' + targetTab);
          newTab.classList.add('active');
          newTab.classList.add('animating');
          setTimeout(() => {
            newTab.style.opacity = '1';
            newTab.style.transform = 'translateY(0)';
            newTab.classList.remove('animating');

            // Re-trigger reveal animations
            newTab.querySelectorAll('.reveal').forEach(el => {
              el.classList.remove('visible');
              setTimeout(() => revealObserver.observe(el), 50);
            });
          }, 30);
        }, 300);
      }
    });
  });
});
// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Ripple effect feedback
  themeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 150);
});
// ========== HEXAGON STAGGER REVEAL ==========
const hexagons = document.querySelectorAll('.hex');

const hexObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const index = Array.from(hexagons).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 50);
      hexObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

hexagons.forEach(hex => hexObserver.observe(hex));

// ---- Back to Top ----
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Project Modal ----
const projectModal = document.getElementById('projectModal');
const modalCloseBtn = document.querySelector('.modal-close');
const modalMedia = document.getElementById('modalMedia');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalGithub = document.getElementById('modalGithub');
const modalDemo = document.getElementById('modalDemo');
const modalVideoBtn = document.getElementById('modalVideoBtn');
const modalDefaultMedia = modalMedia.innerHTML;

let lastFocusedEl = null;

function getYouTubeEmbedUrl(url) {
  const match = url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

function openProjectModal(card) {
  const title = card.querySelector('h3')?.textContent.trim() || '';
  const description = card.querySelector('.project-desc')?.textContent.trim() || '';
  const tags = Array.from(card.querySelectorAll('.project-tags span')).map(t => t.textContent);
  const githubLink = card.querySelector('.link-github');
  const demoLink = card.querySelector('.link-demo');
  const videoUrl = card.dataset.video || '';

  const photo = card.querySelector('.frame-photo');

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalTags.innerHTML = tags.map(t => `<span>${t}</span>`).join('');
  modalMedia.innerHTML = photo
    ? `<img src="${photo.src}" alt="${title} preview" />`
    : modalDefaultMedia;

  modalGithub.hidden = !githubLink;
  if (githubLink) modalGithub.href = githubLink.href;

  modalDemo.hidden = !demoLink;
  if (demoLink) modalDemo.href = demoLink.href;

  modalVideoBtn.hidden = !videoUrl;
  modalVideoBtn.dataset.video = videoUrl;

  lastFocusedEl = document.activeElement;
  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalCloseBtn.focus();
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    openProjectModal(card);
  });
  card.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')) {
      e.preventDefault();
      openProjectModal(card);
    }
  });
});

document.querySelectorAll('[data-modal-close]').forEach(el => {
  el.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('open')) {
    closeProjectModal();
  }
});

modalVideoBtn.addEventListener('click', () => {
  const url = modalVideoBtn.dataset.video;
  if (!url) return;
  modalMedia.innerHTML = /youtu\.?be/.test(url)
    ? `<iframe src="${getYouTubeEmbedUrl(url)}" allow="autoplay; fullscreen" allowfullscreen></iframe>`
    : `<video src="${url}" controls autoplay></video>`;
});