// ==========================================================================
// Gökçe Hukuk Danışmanlık — ana sayfa etkileşimleri
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initHeroSlider();
  initTestimonialSlider();
  initValueAccordion();
  initContactForm();
  initServiceTabs();
});

const WEB3FORMS_ACCESS_KEY = '24d7fbe7-d5ac-4017-be15-9fa0c67e3b67';

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

/* ---------- Uzmanlık alanları: sekme (tab) grubu ---------- */
function initServiceTabs() {
  const root = document.getElementById('service-tabs');
  const panelsRoot = document.getElementById('service-panels');
  if (!root || !panelsRoot) return;

  const tabs = Array.from(root.querySelectorAll('.service-tab'));
  const panels = Array.from(panelsRoot.querySelectorAll('.service-panel'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tab.dataset.index;
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach((p) => p.classList.toggle('active', p.dataset.index === index));
    });
  });
}

/* ---------- Contact form: textarea + file upload + info modal ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const textarea = document.getElementById('contact-message');
  const dropZone = document.getElementById('file-drop');
  const fileInput = document.getElementById('file-input');
  const fileListEl = document.getElementById('file-list');

  let selectedFiles = [];

  /* File upload: click, drag & drop, chip list with remove */
  function renderFileList() {
    fileListEl.innerHTML = '';
    selectedFiles.forEach((file, index) => {
      const chip = document.createElement('span');
      chip.className = 'file-chip';
      const name = document.createElement('span');
      name.textContent = file.name;
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.setAttribute('aria-label', `${file.name} dosyasını kaldır`);
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        selectedFiles.splice(index, 1);
        renderFileList();
      });
      chip.appendChild(name);
      chip.appendChild(removeBtn);
      fileListEl.appendChild(chip);
    });
  }

  function addFiles(fileArray) {
    selectedFiles = selectedFiles.concat(Array.from(fileArray));
    renderFileList();
  }

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    addFiles(fileInput.files);
    fileInput.value = '';
  });
  ['dragover', 'dragenter'].forEach((evt) => {
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
  });
  ['dragleave', 'dragend'].forEach((evt) => {
    dropZone.addEventListener(evt, () => dropZone.classList.remove('dragover'));
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
  });

  /* Contact-info modal: gate before real submission */
  const modalOverlay = document.getElementById('contact-modal-overlay');
  const modalClose = document.getElementById('contact-modal-close');
  const modalSubmit = document.getElementById('contact-modal-submit');
  const modalStatus = document.getElementById('contact-modal-status');
  const nameInput = document.getElementById('contact-name');
  const phoneInput = document.getElementById('contact-phone');
  const emailInput = document.getElementById('contact-email');

  function openModal() {
    modalOverlay.classList.remove('hidden');
    modalStatus.classList.add('hidden');
  }
  function closeModal() {
    modalOverlay.classList.add('hidden');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    openModal();
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function validateField(input) {
    const field = input.closest('.contact-field');
    const isValid = input.value.trim().length > 0;
    field.classList.toggle('invalid', !isValid);
    input.classList.toggle('invalid', !isValid);
    return isValid;
  }

  [nameInput, phoneInput, emailInput].forEach((input) => {
    input.addEventListener('input', () => validateField(input));
  });

  modalSubmit.addEventListener('click', async () => {
    const validName = validateField(nameInput);
    const validPhone = validateField(phoneInput);
    const validEmail = validateField(emailInput);
    if (!validName || !validPhone || !validEmail) return;

    modalSubmit.disabled = true;
    modalSubmit.textContent = 'Gönderiliyor...';
    modalStatus.classList.add('hidden');

    try {
      // Not: Web3Forms'un ücretsiz planı dosya eki desteklemiyor (Pro özelliği).
      // Dosyaların kendisini göndermek yerine, seçilen dosya adlarını mesaja ekliyoruz.
      let messageText = textarea.value.trim();
      if (selectedFiles.length > 0) {
        const fileNames = selectedFiles.map((file) => file.name).join(', ');
        messageText += `\n\n--- Eklenmek istenen dosyalar (ayrıca e-posta ile iletilmesi gerekir) ---\n${fileNames}`;
      }

      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'Gökçe Hukuk Danışmanlık — Web Sitesi Formu');
      formData.append('name', nameInput.value.trim());
      formData.append('phone', phoneInput.value.trim());
      formData.append('email', emailInput.value.trim());
      formData.append('message', messageText);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        modalStatus.textContent = 'Talebiniz alındı, en kısa sürede size dönüş yapacağız.';
        modalStatus.className = 'contact-modal-status success';
        form.reset();
        selectedFiles = [];
        renderFileList();
        setTimeout(closeModal, 2200);
      } else {
        console.error('Web3Forms gönderim hatası:', result);
        modalStatus.textContent = result.message
          ? `Gönderilemedi: ${result.message}`
          : 'Gönderilemedi, lütfen tekrar deneyin veya bizi telefonla arayın.';
        modalStatus.className = 'contact-modal-status error';
      }
    } catch (err) {
      console.error('Web3Forms isteği başarısız oldu:', err);
      modalStatus.textContent = 'Gönderilemedi, lütfen tekrar deneyin veya bizi telefonla arayın.';
      modalStatus.className = 'contact-modal-status error';
    } finally {
      modalSubmit.disabled = false;
      modalSubmit.textContent = 'Gönderimi Tamamla';
    }
  });
}
