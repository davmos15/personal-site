/* ===== Theme Toggle ===== */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    // Show sun in dark mode (click to go light), moon in light mode (click to go dark).
    icon.textContent = theme === 'dark' ? '☀' : '☾';
  }
}

/* ===== Navigation ===== */
function highlightActivePage() {
  let path = window.location.pathname.split('/').pop() || 'index.html';
  if (path === '') path = 'index.html';
  const page = path.replace('.html', '').toLowerCase() || 'index';
  document.querySelectorAll('.nav-menu a[data-page]').forEach(link => {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function initHamburger() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close when a nav link is tapped
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initNav() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
  updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'dark');
  highlightActivePage();
  initHamburger();
}

function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ===== Interactive demo (drag-to-reveal) ===== */
function initDemo() {
  const stage = document.getElementById('demo-stage');
  const auto = document.getElementById('demo-auto');
  const handle = document.getElementById('demo-handle');
  const hEl = document.getElementById('stat-hours');
  const mEl = document.getElementById('stat-money');
  const rEl = document.getElementById('stat-requests');
  if (!stage || !auto || !handle) return;

  let pct = 50;      // handle position 0..100 (left = more automated)
  let raf = null;
  let dragging = false;

  const updateStats = (t) => {
    const h = Math.round(40 * t);
    const m = Math.round(100 * t);
    const rq = Math.round(80 * t);
    if (hEl) hEl.textContent = h;
    if (mEl) mEl.textContent = '$' + m + 'k';
    if (rEl) rEl.textContent = rq + (t >= 0.985 ? '+' : '');
  };

  const applyWipe = () => {
    auto.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    handle.style.left = pct + '%';
    updateStats(1 - pct / 100);
  };

  const setFromX = (clientX) => {
    const r = stage.getBoundingClientRect();
    pct = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(applyWipe);
  };

  stage.addEventListener('pointerdown', (e) => {
    dragging = true;
    setFromX(e.clientX);
    try { stage.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
  });
  stage.addEventListener('pointermove', (e) => { if (dragging) setFromX(e.clientX); });
  const stop = () => { dragging = false; };
  stage.addEventListener('pointerup', stop);
  stage.addEventListener('pointercancel', stop);
  stage.addEventListener('pointerleave', stop);

  applyWipe();
}

/* ===== Resume accordion ===== */
function initRoles() {
  const roles = Array.from(document.querySelectorAll('#roles [data-role]'));
  if (roles.length === 0) return;

  roles.forEach((role) => {
    const head = role.querySelector('.role-head');
    if (!head) return;
    head.setAttribute('tabindex', '0');
    head.setAttribute('role', 'button');
    head.setAttribute('aria-expanded', role.classList.contains('is-open') ? 'true' : 'false');

    const toggle = () => {
      const willOpen = !role.classList.contains('is-open');
      roles.forEach((r) => {
        r.classList.remove('is-open');
        const h = r.querySelector('.role-head');
        if (h) h.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        role.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
      }
    };

    head.addEventListener('click', toggle);
    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

/* ===== Portfolio Data ===== */
const GITHUB_USERNAME = 'davmos15';
const GITHUB_CACHE_KEY = 'github_repos_cache';
const GITHUB_CACHE_TTL = 3600000; // 1 hour

const EXCLUDED_REPOS = ['tj-polaroid-cam', 'line-map', 'hosting-planner'];

const REPO_NAME_OVERRIDES = {
  'connect-garmin': 'Garmin Connect Analytics',
  'running-goal-tracker-garmin': 'Running Goal Tracker (Garmin)',
  'step-goal-tracker-garmin': 'Step Goal Tracker (Garmin)',
  'basic-phone-launcher': 'Minimal Android Launcher',
  'geography-quiz': 'Geography Quiz (Android)',
  'job-tracker': 'Job Application Tracker',
  'running-analytics': 'Running Analytics Dashboard',
  'shlagman-shabs': 'Friday Night Dinner Planner',
  'traffic-light-timer': 'Traffic Light Timer',
  'dr-pay-checker': 'Doctor Pay Checker',
  'family-event-manager': 'Family Event Manager',
  'personal-site': 'This Website',
  'afl-stats': 'AFL Stats',
  'mlb-fantasy-draft': 'MLB Fantasy Draft'
};

const REPO_CATEGORIES = {
  'connect-garmin': 'garmin',
  'running-goal-tracker-garmin': 'garmin',
  'step-goal-tracker-garmin': 'garmin',
  'basic-phone-launcher': 'android',
  'geography-quiz': 'android',
  'job-tracker': 'web',
  'running-analytics': 'web',
  'shlagman-shabs': 'fun',
  'traffic-light-timer': 'fun',
  'dr-pay-checker': 'web',
  'family-event-manager': 'web',
  'personal-site': 'web'
};

const CATEGORY_LABELS = {
  'android': 'Android',
  'fun': 'Fun',
  'garmin': 'Garmin',
  'it-infrastructure': 'IT / Infrastructure',
  'microsoft-suite': 'Microsoft Suite',
  'web': 'Web App'
};

// Repos that should not show a live link even if they have a homepage
const SUPPRESS_LIVE_URL = ['personal-site'];

const PORTFOLIO_PROJECTS = [
  {
    id: 'onboarding-offboarding',
    name: 'Onboarding & Offboarding Automations',
    description: 'Designed and implemented automated onboarding and offboarding systems using Power Automate, integrating Microsoft Forms, Freshdesk, Email, and Teams to streamline the entire employee lifecycle.',
    category: 'microsoft-suite',
    tools: ['Power Automate', 'Microsoft Forms', 'Freshdesk', 'Teams', 'Outlook'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  },
  {
    id: 'licence-optimisation',
    name: 'Licence Optimisation',
    description: 'Led a team of 5 people to analyse and optimise licence usage across Microsoft, Zoom, GSuite, Miro and more. Achieved over $45,000 in savings plus security improvements.',
    category: 'it-infrastructure',
    tools: ['Microsoft Admin', 'Excel', 'Data Analysis'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  },
  {
    id: 'netsuite',
    name: 'NetSuite ERP Migration',
    description: 'Supported a major migration from custom systems to NetSuite ERP. Handled data importing, transformation, testing, and now serve as key admin managing roles and permissions.',
    category: 'it-infrastructure',
    tools: ['NetSuite', 'SQL', 'Data Migration', 'Testing'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  },
  {
    id: 'it-management',
    name: 'IT Management & Governance',
    description: 'Brought external software under IT governance, managed helpdesk operations, and developed IT policies and procedures for global staff.',
    category: 'it-infrastructure',
    tools: ['Freshdesk', 'IT Governance', 'Policy Development'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  },
  {
    id: 'privacy-automation',
    name: 'Privacy Request Automation',
    description: 'Automated GDPR and CCPA data deletion and access requests. Employees submit requests via Microsoft Forms, triggering a Power Automate flow that alerts the appropriate teams via Teams adaptive cards. Responses are tracked and audited in a SharePoint list.',
    category: 'microsoft-suite',
    tools: ['Power Automate', 'Microsoft Forms', 'Teams', 'SharePoint'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  },
  {
    id: 'feature-upgrade-sync',
    name: 'Feature Upgrade List Sync',
    description: 'Automated weekly sync of feature upgrades from Jira to SharePoint sites for various IT-managed software using an Azure Function. A Power Automate flow merges all updates into a master list, providing a single source of truth that auto-updates weekly.',
    category: 'microsoft-suite',
    tools: ['Azure Functions', 'Power Automate', 'Jira', 'SharePoint'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  },
  {
    id: 'sales-rep-copilot',
    name: 'Sales Rep Copilot Agent',
    description: 'Built a Copilot Studio agent that allows users to query in natural language to find the appropriate sales rep for any region, deal value, or other criteria. Powered by a SharePoint list as the data source.',
    category: 'microsoft-suite',
    tools: ['Copilot Studio', 'SharePoint'],
    repoUrl: null,
    liveUrl: null,
    source: 'manual'
  }
];

/* ===== GitHub API ===== */
async function fetchGitHubRepos() {
  const cached = localStorage.getItem(GITHUB_CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < GITHUB_CACHE_TTL) {
        return data;
      }
    } catch (e) {
      // Invalid cache, continue to fetch
    }
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );
    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
    const repos = await response.json();

    localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({
      data: repos,
      timestamp: Date.now()
    }));

    return repos;
  } catch (error) {
    console.warn('GitHub API fetch failed, using cache or empty:', error);
    if (cached) {
      try { return JSON.parse(cached).data; } catch (e) { /* fall through */ }
    }
    return [];
  }
}

async function loadPortfolioProjects() {
  const githubRepos = await fetchGitHubRepos();

  const githubProjects = githubRepos
    .filter(repo => !EXCLUDED_REPOS.includes(repo.name))
    .map(repo => ({
      id: repo.name,
      name: REPO_NAME_OVERRIDES[repo.name] || repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: repo.description || 'No description available.',
      category: REPO_CATEGORIES[repo.name] || 'web',
      tools: [repo.language].filter(Boolean),
      repoUrl: repo.html_url,
      liveUrl: SUPPRESS_LIVE_URL.includes(repo.name) ? null : (repo.homepage || null),
      source: 'github',
      updatedAt: repo.updated_at
    }));

  const manualIds = new Set(PORTFOLIO_PROJECTS.map(p => p.id));
  const merged = [
    ...PORTFOLIO_PROJECTS,
    ...githubProjects.filter(gp => !manualIds.has(gp.id))
  ];

  return merged;
}

/* ===== Portfolio Rendering ===== */
function renderPortfolioCards(projects, filter) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="portfolio-empty">No projects in this category yet.</p>';
    return;
  }

  grid.innerHTML = filtered.map(project => {
    const toolsHtml = (project.tools || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    const catLabel = CATEGORY_LABELS[project.category] || 'Project';

    const linksHtml = [];
    if (project.repoUrl) {
      linksHtml.push(`<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation()"><i class="ti ti-brand-github" aria-hidden="true"></i> Code</a>`);
    }
    if (project.liveUrl) {
      linksHtml.push(`<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="project-link primary" onclick="event.stopPropagation()">Live site</a>`);
    }

    return `
      <article class="project-card" data-project-id="${escapeHtml(project.id)}">
        <div class="project-top"><span class="project-cat">${escapeHtml(catLabel)}</span></div>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.description)}</p>
        ${toolsHtml ? `<div class="tag-row">${toolsHtml}</div>` : ''}
        ${linksHtml.length ? `<div class="project-links">${linksHtml.join('')}</div>` : ''}
      </article>
    `;
  }).join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ===== Portfolio Tab Filtering ===== */
function initPortfolioTabs(projects) {
  const tabButtons = document.querySelectorAll('#portfolio-page .pill');
  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-tab');

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      renderPortfolioCards(projects, category);
    });

    button.addEventListener('keydown', (e) => {
      const tabs = Array.from(tabButtons);
      const currentIndex = tabs.indexOf(button);

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs[prevIndex].focus();
        tabs[prevIndex].click();
      }
    });
  });
}

/* ===== Portfolio Initialization ===== */
async function initPortfolio() {
  const portfolioPage = document.getElementById('portfolio-page');
  if (!portfolioPage) return;

  const projects = await loadPortfolioProjects();
  renderPortfolioCards(projects, 'all');
  initPortfolioTabs(projects);
}

/* ===== Initialize on page load ===== */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  setFooterYear();
  initDemo();
  initRoles();
  initPortfolio();
});
