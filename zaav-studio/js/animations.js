/**
 * Zaav Studio — Scroll & Reveal Animations
 */

(function () {
  'use strict';

  function initReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // Subtle parallax on hero elements
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const heroBg = document.querySelector('.hero-placeholder');
    const heroFloat = document.querySelector('.hero-float');

    if (!heroBg && !heroFloat) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;

      if (heroBg) {
        heroBg.style.transform = `translateY(${y * 0.25}px)`;
      }
      if (heroFloat) {
        heroFloat.style.transform = `translateY(${y * 0.12}px)`;
      }
    }, { passive: true });
  }

  // Magnetic buttons (subtle)
  function initMagnetic() {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.btn-primary, .btn-glass').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initParallax();
    initMagnetic();
  });
})();
