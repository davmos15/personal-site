# Nadav's Resume Website

## Running Locally

To view the website locally before pushing to Git:

```bash
python3 server.py
```

This will start a local server at http://localhost:8000/ and automatically open it in your browser.

Press Ctrl+C to stop the server.

## Recent Improvements

1. **Local Development Server**: Added `server.py` for easy local testing
2. **Dynamic Navigation**: Navigation is now loaded from a single `nav.html` file
3. **Better Code Organization**: 
   - Fixed duplicate IDs (changed to classes)
   - Fixed HTML validation issues
   - Consistent file extensions in links
   - Removed empty CSS rules

## Structure

- `nav.html` - Shared navigation component
- `index.html` - Homepage
- `about.html` - About page
- `contact.html` - Contact page
- `projects.html` - Projects page
- `Resume.html` - Resume page
- `movies.html` - Movie watchlist
- `styles.css` - All styling
- `script.js` - JavaScript functionality (navigation loading, typewriter effect, collapsibles)