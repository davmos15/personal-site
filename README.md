# Nadav's Resume Website

## Running Locally

To view the website locally before pushing to Git:

```bash
python3 server.py
```

This will start a local server at http://localhost:8000/ and automatically open it in your browser.

Press Ctrl+C to stop the server.

## Recent Improvements

1. **Dark/Light Mode**: Toggle between dark and light themes (defaults to dark). Preference is saved in localStorage.
2. **Portfolio Page**: Renamed from Projects, now features card-based layout with tabbed categories (Garmin, Android, Web Apps, Fun, Microsoft Suite, IT/Infrastructure). Automatically pulls public repos from GitHub.
3. **CSS Custom Properties**: All colours use CSS variables for consistent theming.
4. **Netlify Config**: Added `netlify.toml` with Node 22 and redirect from old projects URL.
5. **Sticky Footer**: Footer now consistently sits at the bottom of all pages.
6. **Local Development Server**: `server.py` for easy local testing.
7. **Dynamic Navigation**: Navigation loaded from a single `nav.html` file.

## Structure

- `nav.html` - Shared navigation component (includes theme toggle)
- `index.html` - Homepage
- `about.html` - About page
- `contact.html` - Contact page
- `portfolio.html` - Portfolio page (card grid with GitHub integration)
- `Resume.html` - Resume page (tabbed cards with modals)
- `styles.css` - All styling (CSS custom properties for dark/light theming)
- `script.js` - JavaScript (navigation, theme toggle, tabs, modals, GitHub API, portfolio rendering)
- `netlify.toml` - Netlify deployment config (Node 22, redirects)
- `server.py` - Local development server
