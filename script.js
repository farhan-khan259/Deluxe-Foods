// ============================================
// NAVIGATION & HEADER
// ============================================
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const contractLink = navLinks?.querySelector('a[href="contract-manufacturing.html"]');
if (contractLink && !navLinks.querySelector('a[href="high-tech-lab.html"]')) {
  contractLink.insertAdjacentHTML('beforebegin', '<a href="high-tech-lab.html">High Tech Lab</a><a href="nutraceutical.html">Nutraceutical</a><a href="probiotic.html">Probiotic</a><a href="herbal.html">Herbal</a>');
}
const navItems = document.querySelectorAll('.nav-links a');

const siteFooter = document.querySelector('body > .footer');
if (siteFooter) {
  siteFooter.innerHTML = '<div class="footer-grid page-frame"><div class="footer-brand"><img src="assets/delux-foods-logo.png" alt="Deluxe Foods"><p>Precision in infant nutrition.<br>Made for life\'s most important beginning.</p><div class="social-links"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="LinkedIn">in</a></div></div><div class="footer-links"><a href="index.html">Home</a><a href="about.html">About</a><a href="index.html#products">Products</a><a href="baby-cereals.html">Baby Cereals</a><a href="high-tech-lab.html">High Tech Lab</a><a href="nutraceutical.html">Nutraceutical</a><a href="probiotic.html">Probiotic</a><a href="herbal.html">Herbal</a><a href="contract-manufacturing.html">Contract Manufacturing</a></div><div class="newsletter"><h3>Stay in the know</h3><p>Get Deluxe Foods news and nutrition insights.</p><form class="newsletter-form"><input type="email" aria-label="Email address" placeholder="Email address" required><button type="submit">Subscribe</button></form></div></div><div class="footer-bottom page-frame"><span>© 2026 Deluxe Foods. All rights reserved.</span><span>Made with care in Pakistan</span></div>';
}

// Scroll effect for header
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
}

// Close mobile menu when clicking a link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav') && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
  });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// FORM HANDLING
// ============================================
const forms = document.querySelectorAll('.newsletter-form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (email && email.value) {
      alert('Thank you for subscribing! Check your email for updates.');
      email.value = '';
    }
  });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// HERO IMAGE CAROUSEL
// ============================================
const heroSlides = [...document.querySelectorAll('.hero-image')];
const heroDots = [...document.querySelectorAll('.hero-dots button')];
const heroCurrent = document.querySelector('.hero-current');

if (heroSlides.length > 1) {
  let activeSlide = 0;
  let carouselTimer;

  const showSlide = (index) => {
    activeSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('slide-active', slideIndex === activeSlide);
    });
    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeSlide);
    });
    if (heroCurrent) heroCurrent.textContent = String(activeSlide + 1).padStart(2, '0');
  };

  const startCarousel = () => {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => showSlide(activeSlide + 1), 6000);
  };

  heroDots.forEach((dot, index) => dot.addEventListener('click', () => {
    showSlide(index);
    startCarousel();
  }));

  startCarousel();
}

// Avoid blank image panels if a third-party image host is temporarily unavailable.
document.querySelectorAll('.media-fallback img').forEach((image) => {
  image.addEventListener('error', () => image.closest('.media-fallback')?.classList.add('image-unavailable'));
});

// Shared editorial motion for the homepage and About page.
const sharedMotionTargets = document.querySelectorAll('body:not(.contract-page) .section-intro, body:not(.contract-page) .narrow, body:not(.contract-page) .mission-grid, body:not(.contract-page) .daily-copy, body:not(.contract-page) .consultation-copy, body:not(.contract-page) .labs-copy, body:not(.contract-page) .facility-copy');
sharedMotionTargets.forEach((element) => element.classList.add('motion-reveal'));

const sharedMotionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px' });

sharedMotionTargets.forEach((element) => sharedMotionObserver.observe(element));

const sharedReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!sharedReduceMotion) {
  const parallaxPanels = document.querySelectorAll('.image-statement-bg, .benefit-bg, .quality-banner-bg, .about-hero-bg');
  let sharedTicking = false;
  window.addEventListener('scroll', () => {
    if (!sharedTicking) {
      window.requestAnimationFrame(() => {
        const scrollOffset = Math.min(window.scrollY * 0.035, 24);
        parallaxPanels.forEach((panel) => {
          panel.style.translate = `0 ${scrollOffset}px`;
        });
        sharedTicking = false;
      });
      sharedTicking = true;
    }
  }, { passive: true });
}
