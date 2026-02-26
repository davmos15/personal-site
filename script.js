/* ===== Typewriter Effect ===== */
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

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
    // Show sun in dark mode (click to go light), moon in light mode (click to go dark)
    icon.textContent = theme === 'dark' ? '\u2600' : '\u263E';
  }
}

/* ===== Navigation ===== */
function loadNavigation() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const navContainers = document.querySelectorAll('#nav-placeholder');
            navContainers.forEach(container => {
                container.innerHTML = data;
            });
            // Attach theme toggle after nav is injected
            const toggleBtn = document.getElementById('theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', toggleTheme);
            }
            updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'dark');
            // Re-init dropdown navigation after nav loads
            initDropdownTabNavigation();
        })
        .catch(error => console.error('Error loading navigation:', error));
}

window.onload = function() {
    initTheme();
    loadNavigation();

    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};

/*code to make the resume boxes expand*/
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* ===== Tab Navigation ===== */
function initTabs() {
  const tabButtons = document.querySelectorAll('#resume .tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      const targetPanel = document.getElementById(`${targetTab}-panel`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });

    // Keyboard navigation
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

/* ===== Modal Functionality ===== */
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalDates = document.getElementById('modal-dates');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');

  if (!modalOverlay) return;

  // Get all clickable cards
  const cards = document.querySelectorAll('[data-modal]');

  cards.forEach(card => {
    const openModal = () => {
      const templateId = card.getAttribute('data-modal');
      const template = document.getElementById(templateId);

      if (template) {
        const content = template.content.cloneNode(true);
        const modalData = content.querySelector('.modal-data');

        if (modalData) {
          modalTitle.textContent = modalData.getAttribute('data-title') || '';
          modalSubtitle.textContent = modalData.getAttribute('data-subtitle') || '';
          modalDates.textContent = modalData.getAttribute('data-dates') || '';

          // Hide subtitle/dates if empty
          modalSubtitle.style.display = modalData.getAttribute('data-subtitle') ? 'block' : 'none';
          modalDates.style.display = modalData.getAttribute('data-dates') ? 'block' : 'none';

          // Clone the inner content
          modalBody.innerHTML = '';
          Array.from(modalData.children).forEach(child => {
            modalBody.appendChild(child.cloneNode(true));
          });
        }

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        modalClose.focus();
      }
    };

    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===== Dropdown Tab Navigation ===== */
function initDropdownTabNavigation() {
  // Check URL for tab parameter on page load
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');

  if (tabParam) {
    const tabButton = document.querySelector(`.tab-btn[data-tab="${tabParam}"]`);
    if (tabButton) {
      tabButton.click();
    }
  }

  // Add click handlers to dropdown items with data-tab
  document.querySelectorAll('.dropitem[data-tab]').forEach(item => {
    item.addEventListener('click', (e) => {
      const tab = item.getAttribute('data-tab');
      // Add tab parameter to URL
      item.href = `Resume.html?tab=${tab}`;
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
  'personal-site': 'This Website'
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

// Repos that should not show a live link even if they have a homepage
const SUPPRESS_LIVE_URL = ['personal-site'];

const PORTFOLIO_PROJECTS = [
  {
    id: 'onboarding-offboarding',
    name: 'Onboarding & Offboarding Automation',
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
  }
];

/* ===== GitHub API ===== */
async function fetchGitHubRepos() {
  // Check cache first
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

    // Cache the result
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

  // Convert GitHub repos to project objects
  const githubProjects = githubRepos
    .filter(repo => !EXCLUDED_REPOS.includes(repo.name))
    .map(repo => ({
      id: repo.name,
      name: REPO_NAME_OVERRIDES[repo.name] || repo.name,
      description: repo.description || 'No description available.',
      category: REPO_CATEGORIES[repo.name] || 'other',
      tools: [repo.language].filter(Boolean),
      repoUrl: repo.html_url,
      liveUrl: SUPPRESS_LIVE_URL.includes(repo.name) ? null : (repo.homepage || null),
      source: 'github',
      updatedAt: repo.updated_at
    }));

  // Merge: manual entries take priority (matched by id)
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
    grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--color-text-muted); font-style: italic;">No projects in this category yet.</p>';
    return;
  }

  grid.innerHTML = filtered.map(project => {
    const toolsHtml = project.tools.map(t => `<span class="tool-tag">${escapeHtml(t)}</span>`).join('');

    const linksHtml = [];
    if (project.repoUrl) {
      linksHtml.push(`<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">Code</a>`);
    }
    if (project.liveUrl) {
      linksHtml.push(`<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener" class="card-link card-link-primary" onclick="event.stopPropagation()">Live Demo</a>`);
    }

    const hasLinks = linksHtml.length > 0;

    return `
      <article class="portfolio-card" tabindex="0" data-project-id="${escapeHtml(project.id)}">
        <h3 class="card-title">${escapeHtml(project.name)}</h3>
        <p class="card-summary">${escapeHtml(project.description)}</p>
        <div class="card-tools">${toolsHtml}</div>
        ${hasLinks ? `<div class="card-links">${linksHtml.join('')}</div>` : ''}
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
  const tabButtons = document.querySelectorAll('#portfolio-page .tab-btn');
  if (tabButtons.length === 0) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      renderPortfolioCards(projects, category);
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
  initTabs();
  initModals();
  initPortfolio();
});
