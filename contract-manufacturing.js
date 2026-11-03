const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const contractLink = navLinks?.querySelector('a[href="contract-manufacturing.html"]');
if (contractLink && !navLinks.querySelector('a[href="high-tech-lab.html"]')) {
  contractLink.insertAdjacentHTML('beforebegin', '<a href="high-tech-lab.html">High Tech Lab</a><a href="nutraceutical.html">Nutraceutical</a><a href="probiotic.html">Probiotic</a><a href="herbal.html">Herbal</a>');
}

const siteFooter = document.querySelector('body > .footer');
if (siteFooter) {
  siteFooter.innerHTML = '<div class="footer-grid page-frame"><div class="footer-brand"><img src="assets/delux-foods-logo.png" alt="Deluxe Foods"><p>Precision in infant nutrition.<br>Made for life\'s most important beginning.</p><div class="social-links"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="LinkedIn">in</a></div></div><div class="footer-links"><a href="index.html">Home</a><a href="about.html">About</a><a href="index.html#products">Products</a><a href="baby-cereals.html">Baby Cereals</a><a href="high-tech-lab.html">High Tech Lab</a><a href="nutraceutical.html">Nutraceutical</a><a href="probiotic.html">Probiotic</a><a href="herbal.html">Herbal</a><a href="contract-manufacturing.html">Contract Manufacturing</a></div><div class="newsletter"><h3>Stay in the know</h3><p>Get Deluxe Foods news and nutrition insights.</p><form class="newsletter-form"><input type="email" aria-label="Email address" placeholder="Email address" required><button type="submit">Subscribe</button></form></div></div><div class="footer-bottom page-frame"><span>© 2026 Deluxe Foods. All rights reserved.</span><span>Made with care in Pakistan</span></div>';
}

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
