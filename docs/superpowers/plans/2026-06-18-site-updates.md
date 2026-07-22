# Site Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 8 grouped site updates: new job content, spacing fixes, timeline cleanup, footer text, CTA copy, and em dash removal.

**Architecture:** Pure HTML/CSS edits across 5 files. No new files needed. JavaScript requires no changes — the timeline filter is data-driven and works with fewer items.

**Tech Stack:** HTML, CSS, plain JS (no framework)

---

## Files Modified

- `index.html` — job eyebrow, meta desc, hero copy, CTA button text
- `resume.html` — new job timeline item + modal, Foxit dates, remove build items + modals, remove Builds pill
- `about.html` — em dash removal, bio text
- `footer.html` — copyright line
- `styles.css` — list-style fix, node centering, top padding reduction, bottom spacing

---

### Task 1: Update index.html

**Files:**
- Modify: `index.html:7-8` (title + meta)
- Modify: `index.html:26` (eyebrow)
- Modify: `index.html:27-33` (hero title + lede)
- Modify: `index.html:35` (hero CTA button)
- Modify: `index.html:89-94` (CTA band copy + buttons)

- [ ] **Step 1: Update `<title>` and meta description**

Change:
```html
<title>Nadav Moskow | Application Administrator &amp; Systems Builder</title>
<meta name="description" content="Nadav Moskow — Application Administrator at Foxit Software. I build the automations and business systems that quietly run companies.">
```
To:
```html
<title>Nadav Moskow | Intelligence Automation Specialist</title>
<meta name="description" content="Nadav Moskow — Intelligence Automation Specialist at South Eastern Melbourne Primary Health Network. I build the automations and systems that quietly run organisations.">
```

- [ ] **Step 2: Update eyebrow text**

Change line 26:
```html
<p class="eyebrow"><i class="ti ti-building" aria-hidden="true"></i> Application Administrator &middot; Foxit Software</p>
```
To:
```html
<p class="eyebrow"><i class="ti ti-building" aria-hidden="true"></i> Intelligence Automation Specialist &middot; South Eastern Melbourne Primary Health Network</p>
```

- [ ] **Step 3: Update hero title and lede**

Change lines 27-33:
```html
<h1 class="hero-title">I build the automations and systems that <span class="em">quietly run companies.</span></h1>
<p class="hero-lede">
  I'm Nadav Moskow — an Application Administrator who turns messy manual work into reliable
  systems. I sit between the technical and business teams, building Power Platform automations,
  owning enterprise apps like NetSuite and Microsoft 365, and bringing AI into the everyday
  workflows people actually use.
</p>
```
To:
```html
<h1 class="hero-title">I build the automations and systems that <span class="em">quietly run organisations.</span></h1>
<p class="hero-lede">
  I'm Nadav Moskow — an Intelligence Automation Specialist who turns messy manual work into reliable
  systems. I sit between the technical and business teams, designing AI-powered workflows and
  automations that bring real efficiency to the people who use them every day.
</p>
```

- [ ] **Step 4: Update hero CTA button text**

Change line 35:
```html
<a href="resume.html" class="btn btn-primary"><i class="ti ti-timeline-event" aria-hidden="true"></i> View resume</a>
```
To:
```html
<a href="resume.html" class="btn btn-primary"><i class="ti ti-timeline-event" aria-hidden="true"></i> View my resume</a>
```

- [ ] **Step 5: Update CTA band copy and buttons**

Change lines 89-94:
```html
<h2>Let's see where I could help.</h2>
<p>Take a walk through my experience on the timeline, or browse the things I've actually built.</p>
<div class="hero-cta">
  <a href="resume.html" class="btn btn-primary">View the resume</a>
  <a href="portfolio.html" class="btn btn-ghost">Browse the portfolio</a>
</div>
```
To:
```html
<h2>Let's see where I could help.</h2>
<p>Take a walk through my experience on the timeline, or browse the things I've actually built.</p>
<div class="hero-cta">
  <a href="resume.html" class="btn btn-primary">View my resume</a>
  <a href="portfolio.html" class="btn btn-ghost">Browse my portfolio</a>
</div>
```

---

### Task 2: Update resume.html

**Files:**
- Modify: `resume.html:38-42` (remove Builds pill)
- Modify: `resume.html:47-59` (Foxit item: remove is-current + update dates)
- Modify: `resume.html:61-87` (remove two build timeline items)
- Modify: `resume.html:232-234` (Foxit modal data-dates)
- Remove: `<template id="modal-build-apps">` and `<template id="modal-build-site">`
- Add: new SEMPHN timeline item (top) and modal template

- [ ] **Step 1: Remove Builds filter pill**

Change lines 38-42:
```html
<div class="filter-pills" role="group" aria-label="Filter timeline">
  <button class="pill active" data-filter="all" aria-pressed="true">All</button>
  <button class="pill" data-filter="experience" aria-pressed="false">Experience</button>
  <button class="pill" data-filter="build" aria-pressed="false">Builds</button>
</div>
```
To:
```html
<div class="filter-pills" role="group" aria-label="Filter timeline">
  <button class="pill active" data-filter="all" aria-pressed="true">All</button>
  <button class="pill" data-filter="experience" aria-pressed="false">Experience</button>
</div>
```

- [ ] **Step 2: Add new SEMPHN job as top timeline item**

Insert this block immediately after `<ol class="timeline" id="timeline" aria-label="Career timeline">` and before the existing Foxit `<li>`:
```html
      <li class="timeline-item is-current" data-type="experience">
        <span class="timeline-node" aria-hidden="true"></span>
        <button class="timeline-card" data-modal="modal-intel-auto">
          <div class="timeline-meta">
            <span class="timeline-dates">Apr 2026 &ndash; Current</span>
            <span class="badge badge-current">Current</span>
          </div>
          <h3>Intelligence Automation Specialist</h3>
          <p class="timeline-org">South Eastern Melbourne Primary Health Network</p>
          <p class="card-summary">Designing and implementing AI-powered automation solutions to improve operational efficiency across a primary health network.</p>
          <span class="card-cue">View detail <i class="ti ti-arrow-right" aria-hidden="true"></i></span>
        </button>
      </li>
```

- [ ] **Step 3: Update Foxit item — remove is-current, update dates, remove Current badge**

Change the opening portion of the Foxit `<li>`:
```html
      <li class="timeline-item is-current" data-type="experience">
        <span class="timeline-node" aria-hidden="true"></span>
        <button class="timeline-card" data-modal="modal-app-admin">
          <div class="timeline-meta">
            <span class="timeline-dates">Oct 2022 &ndash; Current</span>
            <span class="badge badge-current">Current</span>
          </div>
```
To:
```html
      <li class="timeline-item" data-type="experience">
        <span class="timeline-node" aria-hidden="true"></span>
        <button class="timeline-card" data-modal="modal-app-admin">
          <div class="timeline-meta">
            <span class="timeline-dates">Oct 2022 &ndash; Mar 2026</span>
          </div>
```

- [ ] **Step 4: Update Foxit modal dates**

In `<template id="modal-app-admin">`, change:
```html
<div class="modal-data" data-title="Application Administrator" data-subtitle="Foxit Software Inc." data-dates="October 2022 - Current">
```
To:
```html
<div class="modal-data" data-title="Application Administrator" data-subtitle="Foxit Software Inc." data-dates="October 2022 - March 2026">
```

- [ ] **Step 5: Remove two build timeline items**

Remove both `<li class="timeline-item" data-type="build">` blocks (lines ~61-87): the "Web Apps & Tools Built with Claude" item and the "This Personal Resume Website" item. Delete from opening `<li>` through closing `</li>` for each.

- [ ] **Step 6: Remove build modal templates**

Remove the entire `<template id="modal-build-apps">` block and the entire `<template id="modal-build-site">` block.

- [ ] **Step 7: Add SEMPHN modal template**

Add this block just before `<div id="footer-placeholder">`:
```html
<template id="modal-intel-auto">
  <div class="modal-data" data-title="Intelligence Automation Specialist" data-subtitle="South Eastern Melbourne Primary Health Network" data-dates="April 2026 - Current">
    <h3>Key Responsibilities</h3>
    <ul>
      <li>Designing and implementing AI-driven automation solutions to streamline operations across a primary health network.</li>
      <li>Identifying manual processes and transforming them into efficient, reliable automated workflows.</li>
      <li>Collaborating with clinical and operational stakeholders to understand requirements and deliver practical solutions.</li>
    </ul>
    <h3>Major Achievements</h3>
    <ul>
      <li>Update with key achievements at SEMPHN.</li>
    </ul>
  </div>
</template>
```

> **Note for user:** Fill in the actual responsibilities and achievements in this modal before shipping.

---

### Task 3: Update about.html

**Files:**
- Modify: `about.html:45` (em dash in pull quote cite)
- Modify: `about.html:29-34` (bio paragraph referencing Foxit)

- [ ] **Step 1: Remove em dash from pull quote cite**

Change line 45:
```html
<cite>Chris Gardner &mdash; The Pursuit of Happyness</cite>
```
To:
```html
<cite>Chris Gardner, The Pursuit of Happyness</cite>
```

- [ ] **Step 2: Update bio to reflect job change**

Change the first bio paragraph (lines 29-34):
```html
I'm a Business Systems Professional bridging technical and business teams through process
automation and system optimisation. I have 4+ years at Foxit Software, delivering significant
savings through licence optimisation and Power Platform solutions. If you want to learn more
about my experience and other projects I've worked on, you can click through to see
<a href="resume.html">my resume</a>.
```
To:
```html
I'm an automation-focused professional who bridges technical and business teams through
process design and AI-powered workflows. I spent 4+ years at Foxit Software delivering significant
savings through licence optimisation and Power Platform solutions, and I'm now an Intelligence
Automation Specialist at South Eastern Melbourne Primary Health Network. If you want to learn more
about my experience and other projects I've worked on, you can click through to see
<a href="resume.html">my resume</a>.
```

---

### Task 4: Update footer.html

**Files:**
- Modify: `footer.html:9`

- [ ] **Step 1: Update footer copyright line**

Change line 9:
```html
<p class="footer-copy">&copy; <span id="footer-year"></span> Nadav Moskow &middot; Built with HTML, CSS &amp; JavaScript</p>
```
To:
```html
<p class="footer-copy">&copy; <span id="footer-year"></span> Nadav Moskow &middot; Built with HTML, CSS &amp; JavaScript, with the assistance of AI</p>
```

---

### Task 5: Update styles.css

**Files:**
- Modify: `styles.css:391-393` (hero top padding)
- Modify: `styles.css:544-546` (page-head top padding)
- Modify: `styles.css:599-603` (add list-style: none to .timeline)
- Modify: `styles.css:622` (fix .timeline-node left: 8px → left: 0)
- Add after `styles.css:724`: bottom spacing rule for last resume section
- Modify: `styles.css:841` (#portfolio-grid: add margin-bottom)

- [ ] **Step 1: Add `list-style: none` to `.timeline`**

Change:
```css
.timeline {
  position: relative;
  margin: 36px 0 0;
  padding: 0 0 0 8px;
}
```
To:
```css
.timeline {
  list-style: none;
  position: relative;
  margin: 36px 0 0;
  padding: 0 0 0 8px;
}
```

- [ ] **Step 2: Center timeline nodes on the spine**

The spine (`::before`) has `left: 19px` on `.timeline`, centered at 20px. The `.timeline-item` children start 8px into the timeline (due to `padding-left: 8px`). With `left: 8px` on the node, its center lands at 28px — 8px off the spine. Changing to `left: 0` centers the 24px node at 20px, aligning it with the spine.

Change in `.timeline-node`:
```css
  left: 8px;
```
To:
```css
  left: 0;
```

- [ ] **Step 3: Reduce top padding on inner-page headers**

Change `.page-head`:
```css
.page-head {
  padding: clamp(48px, 9vw, 88px) 0 8px;
}
```
To:
```css
.page-head {
  padding: clamp(36px, 7vw, 64px) 0 8px;
}
```

- [ ] **Step 4: Reduce top padding on homepage hero**

Change `.hero`:
```css
.hero {
  padding: clamp(56px, 12vw, 120px) 0 clamp(40px, 7vw, 72px);
}
```
To:
```css
.hero {
  padding: clamp(48px, 9vw, 96px) 0 clamp(32px, 6vw, 60px);
}
```

- [ ] **Step 5: Add bottom spacing to last resume section**

After the existing `.resume-section` block, add:
```css
.resume-section:last-child {
  padding-bottom: clamp(48px, 8vw, 72px);
}
```

- [ ] **Step 6: Add bottom spacing to portfolio grid**

Change the existing `#portfolio-grid` rule:
```css
#portfolio-grid { margin-top: 24px; }
```
To:
```css
#portfolio-grid { margin-top: 24px; margin-bottom: clamp(48px, 8vw, 72px); }
```

---

## Self-Review

**Spec coverage:**
1. New job on home + resume ✓ (Tasks 1+2)
2. Top gap reduction ✓ (Task 5 steps 3+4)
3. Remove timeline numbers, center dots, remove Builds ✓ (Task 2 step 1; Task 5 steps 1+2)
4. Gap after achievements and footer ✓ (Task 5 step 5)
5. Footer text update ✓ (Task 4)
6. Portfolio bottom gap ✓ (Task 5 step 6)
7. Remove em dashes ✓ (Task 3 step 1)
8. "View my" CTA text ✓ (Task 1 steps 4+5)

**Placeholder check:** The SEMPHN modal body has one "Update with key achievements" note — unavoidable since content is unknown to the plan writer. All other steps contain complete code.

**Type consistency:** No cross-task type dependencies; all changes are self-contained HTML/CSS content edits.
