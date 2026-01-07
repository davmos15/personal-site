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

function loadNavigation() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const navContainers = document.querySelectorAll('#nav-placeholder');
            navContainers.forEach(container => {
                container.innerHTML = data;
            });
        })
        .catch(error => console.error('Error loading navigation:', error));
}

window.onload = function() {
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

/* Tab Navigation */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
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

/* Modal Functionality */
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

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initModals();
});