# Zaav Studio — Cinematic Website

Premium cinematic website for **Zaav Studio**, a film & creative production studio.

## Structure

```
zaav-studio/
├── index.html          # Home
├── work.html           # Portfolio
├── team.html           # Team
├── contact.html        # Contact
├── css/
│   ├── style.css       # Core styles + theme system
│   └── responsive.css  # Breakpoints
├── js/
│   ├── theme.js        # Dark / Light mode
│   ├── main.js         # Cursor, nav, filters, modal, form
│   └── animations.js   # Scroll reveals, parallax, magnetic
└── assets/
    ├── images/         # Replace placeholders with real images
    ├── videos/         # Hero / project videos
    └── icons/
```

## How to use

1. Open `index.html` in a browser (or serve via any static server).
2. Replace placeholder media containers with real images/videos.
3. Edit project data, team bios, and contact info directly in the HTML.
4. All content is in HTML — nothing critical is hard-coded in JS.

## Theme

- **Dark mode** is the primary cinematic experience.
- **Light mode** is a clean editorial gallery.
- Toggle lives in the navigation. Preference is saved in `localStorage`.

## Customization

- Colors are CSS variables in `:root` / `[data-theme="light"]`.
- Primary accent: `#00B295`
- Fonts: Inter (Google Fonts)

## Notes

- Custom cursor is disabled on touch / mobile.
- Respects `prefers-reduced-motion`.
- No frameworks — pure HTML, CSS, Vanilla JS.
- Liquid Glass effects use `backdrop-filter`.
- Project cards open a detail modal (data driven from HTML attributes).

© 2026 Zaav Studio
