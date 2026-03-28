// ============================================================
// main.js — Espejo Studios
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Espejo Studios — site loaded');

  // Nav scroll behavior
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
});
