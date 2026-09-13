/**
 * Zaav Studio — Theme System
 * Smooth dark / light mode transitions
 */

(function () {
  const STORAGE_KEY = 'zaav-theme';
  const root = document.documentElement;

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme, animate = true) {
    if (!animate) {
      root.setAttribute('data-theme', theme);
      return;
    }

    // Smooth transition class
    root.classList.add('theme-transitioning');
    root.setAttribute('data-theme', theme);

    setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 600);
  }

  function initTheme() {
    const theme = getPreferred();
    applyTheme(theme, false);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    localStorage.setItem(STORAGE_KEY, next);
  }

  // Expose
  window.ZaavTheme = { init: initTheme, toggle: toggleTheme };

  // Init immediately to prevent flash
  initTheme();

  document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
      btn.setAttribute('aria-label', 'Toggle dark / light mode');
    });
  });
})();
