// WhatsApp: troque pelo número real da Pizzeto no formato 55 + DDD + número.
const WHATSAPP_NUMBER = '5500000000000';

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobileMenu');
const scrollLinks = document.querySelectorAll('[data-scroll]');
const whatsappLinks = document.querySelectorAll('[data-whatsapp]');
const orderButtons = document.querySelectorAll('[data-order]');
const year = document.querySelector('#currentYear');

function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsapp(message) {
  window.open(buildWhatsappUrl(message), '_blank', 'noopener');
}

function closeMobileMenu() {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

function toggleMobileMenu() {
  if (!mobileMenu || !menuButton) return;

  const isOpen = mobileMenu.classList.toggle('is-open');
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
}

if (menuButton) {
  menuButton.addEventListener('click', toggleMobileMenu);
}

scrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');

    if (!targetId || !targetId.startsWith('#')) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMobileMenu();
  });
});

whatsappLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const message = link.dataset.whatsapp || 'Olá, gostaria de fazer um pedido na Pizzeto';
    openWhatsapp(message);
    closeMobileMenu();
  });
});

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.dataset.order || 'um item do cardápio';
    openWhatsapp(`Olá, gostaria de pedir ${item}.`);
  });
});

document.addEventListener('click', (event) => {
  if (!mobileMenu || !menuButton || !mobileMenu.classList.contains('is-open')) return;

  const clickedInsideMenu = mobileMenu.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealSections = document.querySelectorAll('.section-reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealSections.forEach((section) => observer.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add('is-visible'));
}
