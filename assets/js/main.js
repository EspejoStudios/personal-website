// ============================================================
// main.js — Espejo Studios · Kanso x Cyberpunk
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Nav scroll state ────────────────────────────────────
  const nav = document.querySelector('.ks-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.dataset.scrolled = window.scrollY > 40;
    }, { passive: true });
  }

  // ─── Staggered reveal system ─────────────────────────────
  const revealSections = document.querySelectorAll('[data-animate="reveal"]');

  revealSections.forEach(section => {
    // Set CSS custom property for each child's delay
    section.querySelectorAll('[data-animate="child"]').forEach(child => {
      child.style.setProperty('--reveal-delay', child.dataset.delay || 0);
    });

    // Hero reveals immediately
    if (section.classList.contains('ks-hero')) {
      requestAnimationFrame(() => {
        section.classList.add('is-revealed');
      });
    }
  });

  // Observe non-hero sections
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealSections.forEach(section => {
      if (!section.classList.contains('ks-hero')) {
        observer.observe(section);
      }
    });
  } else {
    // If reduced motion, reveal everything immediately
    revealSections.forEach(section => {
      section.classList.add('is-revealed');
    });
  }

  // ─── Burger / overlay ────────────────────────────────────
  const burger  = document.getElementById('ksBurger');
  const overlay = document.getElementById('ksOverlay');

  function openMenu() {
    burger.classList.add('is-open');
    overlay.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (burger && overlay) {
    burger.addEventListener('click', () => {
      burger.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMenu();
    });

    overlay.querySelectorAll('.ks-overlay__link').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });
  }

  // ─── Smooth scroll for anchor links ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
