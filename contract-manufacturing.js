const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav') && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const form = document.querySelector('.newsletter-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = form.querySelector('input[type="email"]');
  if (email?.value) {
    alert('Thank you for subscribing to Deluxe Foods updates.');
    email.value = '';
  }
});

const motionTargets = document.querySelectorAll('.section-intro, .overview-image, .overview-copy, .quality-promise-copy, .contract-contact > div');
motionTargets.forEach((element) => element.classList.add('scroll-reveal'));

const motionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px' });

motionTargets.forEach((element) => motionObserver.observe(element));

const heroImage = document.querySelector('.contract-hero-image');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroImage && !reduceMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.08, 42);
        heroImage.style.transform = `scale(1.02) translate3d(0, ${offset}px, 0)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
