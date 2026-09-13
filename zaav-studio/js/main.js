/**
 * Zaav Studio — Main Interactions
 */

(function () {
  'use strict';

  // ---------- Custom Cursor ----------
  function initCursor() {
    if (window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches) {
      document.body.classList.add('no-custom-cursor');
      return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Expand on interactive elements
    const interactive = 'a, button, .work-card, .portfolio-item, .team-card, .filter-btn, .theme-toggle, input, textarea, select';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactive);
      if (target) {
        cursor.classList.add('expanded');
        follower.classList.add('expanded');
        if (target.classList.contains('work-card') || target.classList.contains('portfolio-item')) {
          cursor.classList.add('view-project');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactive);
      if (target) {
        cursor.classList.remove('expanded', 'view-project');
        follower.classList.remove('expanded');
      }
    });
  }

  // ---------- Navigation ----------
  function initNav() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    if (!nav) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = y;
    }, { passive: true });

    // Mobile menu
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
      });

      links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
          toggle.classList.remove('open');
          links.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  // ---------- Portfolio Filters ----------
  function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        items.forEach((item) => {
          const cat = item.dataset.category;
          if (filter === 'all' || cat === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.5s ease';
              item.style.opacity = '1';
            });
          } else {
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ---------- Project Modal ----------
  function initModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (!overlay) return;

    const modal = overlay.querySelector('.modal');
    const closeBtn = overlay.querySelector('.modal-close');
    const mediaEl = overlay.querySelector('.modal-media');
    const titleEl = overlay.querySelector('.modal-title');
    const descEl = overlay.querySelector('.modal-desc');
    const creditsEl = overlay.querySelector('.modal-credits');

    // Project data lives in HTML data attributes for easy editing
    function openModal(card) {
      const title = card.dataset.title || 'Project';
      const category = card.dataset.category || '';
      const year = card.dataset.year || '';
      const client = card.dataset.client || '—';
      const director = card.dataset.director || '—';
      const editor = card.dataset.editor || '—';
      const desc = card.dataset.desc || '';

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (mediaEl) {
        mediaEl.innerHTML = `<span class="label">MEDIA PLACEHOLDER — ${title}</span>`;
      }
      if (creditsEl) {
        creditsEl.innerHTML = `
          <div class="credit-item"><span class="label">Client</span><span>${client}</span></div>
          <div class="credit-item"><span class="label">Director</span><span>${director}</span></div>
          <div class="credit-item"><span class="label">Editor</span><span>${editor}</span></div>
          <div class="credit-item"><span class="label">Year</span><span>${year}</span></div>
          <div class="credit-item"><span class="label">Category</span><span>${category}</span></div>
        `;
      }

      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-item, .work-card[data-title]').forEach((card) => {
      card.addEventListener('click', () => openModal(card));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
  }

  // ---------- Contact Form (demo) ----------
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send — replace with real endpoint later
      setTimeout(() => {
        btn.textContent = 'Inquiry Sent ✓';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2500);
      }, 1200);
    });
  }

  // ---------- Init ----------
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNav();
    initFilters();
    initModal();
    initContactForm();
  });
})();
