// ==========================================================================
// Gökçe Hukuk Danışmanlık — ana sayfa etkileşimleri
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initHeroSlider();
  initTestimonialSlider();
  initValueAccordion();
});

/* ---------- Sticky header background on scroll ---------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const update = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Mobile menu toggle ---------- */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
}

/* ---------- Hero slider ---------- */
function initHeroSlider() {
  const root = document.getElementById('hero-slider');
  const dotsContainer = document.getElementById('hero-dots');
  if (!root) return;

  const slides = Array.from(root.querySelectorAll('.hero-slide'));
  if (slides.length === 0) return;

  let current = slides.findIndex((s) => s.classList.contains('active'));
  if (current < 0) current = 0;

  const AUTOPLAY_MS = 6500;
  let timer = null;

  // Build progress dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === current ? ' active' : '');
    dot.setAttribute('aria-label', `Slayt ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
    restartAutoplay();
  }

  function next() { goTo(current + 1); }

  function restartAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, AUTOPLAY_MS);
  }

  // Pause autoplay while hovering or focused within
  root.addEventListener('mouseenter', () => timer && clearInterval(timer));
  root.addEventListener('mouseleave', restartAutoplay);

  render();
  restartAutoplay();
}

/* ---------- Testimonial slider ---------- */
function initTestimonialSlider() {
  const root = document.getElementById('testimonial-slider');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!root || !dotsContainer) return;

  const items = Array.from(root.querySelectorAll('.testimonial'));
  if (items.length === 0) return;

  let current = 0;
  const AUTOPLAY_MS = 5500;
  let timer = null;

  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Yorum ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });
  const dots = Array.from(dotsContainer.children);

  function render() {
    items.forEach((item, i) => item.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function goTo(index) {
    current = (index + items.length) % items.length;
    render();
    restart();
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
  }

  render();
  restart();
}

/* ---------- Value proposition accordion ---------- */
function initValueAccordion() {
  const root = document.getElementById('value-accordion');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.value-item'));

  items.forEach((item) => {
    const header = item.querySelector('.value-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach((i) => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}
