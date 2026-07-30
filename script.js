const nav = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 24));
const progressBar = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => { const scrollable = document.documentElement.scrollHeight - window.innerHeight; if (progressBar && scrollable > 0) progressBar.style.transform = `scaleX(${window.scrollY / scrollable})`; }, { passive: true });
menuToggle?.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', open); document.body.classList.toggle('menu-open', open); });
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }));

const reveals = document.querySelectorAll('.reveal, .reveal-left');
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .14 });
reveals.forEach(item => revealObserver.observe(item));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; const item = entry.target; const target = +item.dataset.count; const duration = 1700; const start = performance.now(); const update = now => { const progress = Math.min((now - start) / duration, 1); item.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target).toLocaleString() + item.dataset.suffix; if (progress < 1) requestAnimationFrame(update); }; requestAnimationFrame(update); counterObserver.unobserve(item); }), { threshold: .6 });
counters.forEach(counter => counterObserver.observe(counter));
window.addEventListener('load', () => setTimeout(() => document.querySelector('.loader')?.classList.add('hidden'), 350));

// Touch-friendly editorial carousel with keyboard support and reduced-motion awareness.
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...track.children];
  const dots = [...document.querySelectorAll('[data-carousel-dot]')];
  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0, startX = 0, timer;
  const show = index => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
  };
  const restart = () => { if (!reducedMotion) { clearInterval(timer); timer = setInterval(() => show(current + 1), 5600); } };
  previous?.addEventListener('click', () => { show(current - 1); restart(); });
  next?.addEventListener('click', () => { show(current + 1); restart(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { show(index); restart(); }));
  carousel.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { show(current - 1); restart(); } if (event.key === 'ArrowRight') { show(current + 1); restart(); } });
  carousel.addEventListener('pointerdown', event => { startX = event.clientX; });
  carousel.addEventListener('pointerup', event => { const delta = event.clientX - startX; if (Math.abs(delta) > 45) { show(current + (delta < 0 ? 1 : -1)); restart(); } });
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', restart);
  restart();
});
