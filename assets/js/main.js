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

  // ─── Desktop dropdown groups ─────────────────────────────
  const navGroups = document.querySelectorAll('[data-nav-group]');

  function closeAllGroups() {
    navGroups.forEach(g => {
      g.classList.remove('is-open');
      g.querySelector('.ks-nav__group-btn')?.setAttribute('aria-expanded', 'false');
    });
  }

  navGroups.forEach(group => {
    const btn = group.querySelector('.ks-nav__group-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = group.classList.contains('is-open');
      closeAllGroups();
      if (!isOpen) {
        group.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', closeAllGroups);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllGroups();
  });

  // ─── Mobile burger / overlay ─────────────────────────────
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

  // ─── Staggered reveal system ─────────────────────────────
  const revealSections = document.querySelectorAll('[data-animate="reveal"]');

  revealSections.forEach(section => {
    section.querySelectorAll('[data-animate="child"]').forEach(child => {
      child.style.setProperty('--reveal-delay', child.dataset.delay || 0);
    });

    if (section.classList.contains('ks-hero') || section.classList.contains('ks-page-hero')) {
      requestAnimationFrame(() => section.classList.add('is-revealed'));
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
      if (!section.classList.contains('ks-hero') && !section.classList.contains('ks-page-hero')) {
        observer.observe(section);
      }
    });
  } else {
    revealSections.forEach(s => s.classList.add('is-revealed'));
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
