# Personal Site Redesign — Design Spec

Date: 2026-07-22
Status: Approved (verbal), pre-implementation

## Goal
Restyle Nadav Moskow's personal site to the "Website redesign concept" (Direction A)
handoff, while preserving existing content, the live-GitHub portfolio behaviour, the
light/dark theme toggle, and the working contact form. Also swap in the new résumé PDF
and reconcile on-site text to match it.

## Decisions (confirmed with user)
1. **Structure:** single scrolling homepage (`index.html`) containing all sections, plus
   a separate Projects page (`portfolio.html`). Old `resume.html` / `about.html` /
   `contact.html` become homepage sections; those URLs redirect to the relevant anchor.
2. **Portfolio:** keep the live GitHub fetch + manual work-project entries + category
   filter tabs, re-skinned in the new card style. Not the concept's static list.
3. **Extras kept:** light/dark toggle (requires a new light palette for all sections) and
   the Netlify contact form (styled into the new contact section).

## Visual system
- Fonts: Space Grotesk (headings), Hanken Grotesk (body), JetBrains Mono (labels/stats),
  via Google Fonts. Tabler icons retained for nav/form/footer utility icons.
- Dark palette (default): bg `#0a1120`, panel `#0c1424`, text `#eaf0fa`, muted
  `#aab6cc`/`#9fb0c6`/`#7e8ba3`, accent `#34e0c9`, warm `#f5a35a`; layered radial-gradient
  background per handoff tokens.
- Light palette: near-white bg, dark-navy text, darkened-teal accent for legibility;
  exposed through the existing `[data-theme]` attribute + CSS variables.
- `styles.css` rewritten around the new tokens; obsolete Fraunces-era classes removed.

## Navigation & footer
- Sticky blurred nav: logo chip (`logo-nm.png`) + name/tagline, links Work · Projects ·
  Resume · About, "Get in touch" pill, theme-toggle button. Mobile hamburger preserved.
- Homepage nav links are in-page anchors except Projects → `portfolio.html`. Projects page
  uses a "← Back home / Get in touch" nav variant.
- Nav + footer inlined into each page (no more JS fetch-injection).

## Homepage sections (top → bottom)
Hero → interactive drag-slider centerpiece (Direction A only; drop Direction B + A/B
switch) with 3 live stats → What I do (4 discipline cards) → Work at a glance (6 project
cards + "View all projects →") → Resume accordion (click-to-expand, single-open, current
role accent-bordered, Download PDF) → Skills & achievements (stat cards + skill-group
chips) → Education (small block, added for parity) → About (bio + pull quote) → Contact
(accent card containing the Netlify form + email/LinkedIn/GitHub/resume actions) → footer.

## Projects page (`portfolio.html`)
New-style header + re-skinned category filter pills; grid still populated by the live
GitHub fetch + manual work projects in `script.js`. New card look with tags + Code/Live
links. Text cards (no per-repo screenshots) since content is generated live.

## JavaScript (`script.js`)
- Keep: theme toggle, GitHub portfolio + category filtering, footer year, contact form
  (Netlify handles submit).
- Add: drag-slider logic (handoff `applyWipe`/`setFromX`/`updateStats` math) and resume
  accordion (single-open index). `prefers-reduced-motion` respected for animations.
- Remove: old resume modal system and resume filter-pills (accordion replaces them).

## Content reconciled to new résumé PDF
- SEMPHN role: replace placeholder with real achievements — automated eSign agreement
  routing / CRM update flows (500+ clinics, CRM, SharePoint, DocuSign) and Copilot Studio
  agents (internal resource, executive CRM assistant, Power Platform flow assistant).
- Application Administrator end date → Apr 2026.
- Keep "$100k+" for the licence stat; reflect the résumé's "$150k+ total" savings in hero
  copy so nothing contradicts the PDF.
- Skills, education, achievements, other roles cross-checked against the PDF.

## Cleanup
- Add `logo-nm.png` to repo; favicon → that logo (old `NM1.png` / `IMG_7191.jpg` already
  deleted).
- New résumé PDF already in place at same filename (old one already overwritten).
- Delete the concept `.zip` and the temp extract folder so they don't deploy.

## Non-goals
- No backend/CMS. Static site on Netlify unchanged.
- No new projects invented; portfolio still driven by GitHub + existing manual entries.
