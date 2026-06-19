/**
 * Manuel Rodríguez Vicente — CV Portfolio
 * JavaScript for interactivity, animations, and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initActiveNavLink();
});

// ============ NAVBAR SCROLL EFFECT ============
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    btn.classList.toggle('open');
  });

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      btn.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
      navLinks.classList.remove('active');
      btn.classList.remove('open');
    }
  });
}

// ============ SCROLL REVEAL ANIMATIONS ============
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.skill-card, .edu-card, .project-card, .lang-card, .timeline-item, .about-detail-item, .contact-link-item, .video-link-card'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // Immediate reveal for elements above the fold
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, 200);
}

// ============ SMOOTH SCROLL (for Safari fallback) ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}

// ============ ACTIVE NAV LINK ON SCROLL ============
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -40% 0px',
    }
  );

  sections.forEach(section => observer.observe(section));
}

// ============ COUNTER ANIMATION FOR STAT NUMBERS ============
function animateCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const projectStatNums = document.querySelectorAll('.project-stat-num');

  const allStats = [...statNumbers, ...projectStatNums];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  allStats.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(10px)';
    stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(stat);
  });
}

// Initialize counter animation observer
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateCounters, 300);
});
