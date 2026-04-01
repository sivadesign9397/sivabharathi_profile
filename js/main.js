/* ============================================
   SIVA BHARATHI — PORTFOLIO INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- DOM References ----------
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMenu = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  const themeToggle = document.querySelector('.theme-toggle');
  const reveals = document.querySelectorAll('.reveal');
  const caseCards = document.querySelectorAll('.case-card');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const sections = document.querySelectorAll('.section[id]');

  // ---------- Sticky Navigation ----------
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ---------- Active Nav Highlight ----------
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ---------- Mobile Menu ----------
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------- Dark Mode Toggle ----------
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  // ---------- Scroll Reveal Animations ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // ---------- Section Visibility Toggles ----------
  function setupSectionToggle(btnId, hiddenClass, expandText, collapseText) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      const hiddenElements = document.querySelectorAll(`.${hiddenClass}`);
      const isExpanding = !btn.classList.contains('active');

      hiddenElements.forEach(el => {
        el.classList.toggle('active');
        if (isExpanding) el.classList.add('revealed');
      });

      btn.classList.toggle('active');
      btn.innerHTML = `
        ${isExpanding ? collapseText : expandText}
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
    });
  }

  setupSectionToggle('view-all-services', 'service-hidden', 'View All Services', 'Show Less');
  setupSectionToggle('view-all-projects', 'case-hidden', 'View All Projects', 'Show Less');

  // ---------- Case Study Data ----------
  const caseStudies = {
    careerscloud: {
      title: 'CareersCloud – LMS Web & Mobile App',
      tags: ['LMS', 'Web App', 'Mobile App', 'EdTech'],
      problem: 'Educational institutions lacked a unified platform to manage course content, student progress, and assessments. Existing LMS solutions were dated, unintuitive, and caused high dropout rates due to poor user experience.',
      role: [
        'Led end-to-end UI/UX design for web and mobile platforms',
        'Conducted user research with students, tutors, and administrators',
        'Created design systems, wireframes, and interactive prototypes',
        'Collaborated closely with frontend and backend developers to ensure pixel-perfect implementation'
      ],
      process: 'Discovery → User Research → Information Architecture → Wireframing → Visual Design → Prototyping → Usability Testing → Developer Handoff → Iteration',
      tools: ['Figma', 'Adobe XD', 'Miro', 'Maze', 'Zeplin'],
      outcome: 'Delivered a modern, intuitive learning platform that increased student engagement by 40%. Reduced task completion time for tutors by 35% through a streamlined dashboard. The mobile app achieved a 4.5-star rating within the first quarter of launch.'
    },
    smartcare: {
      title: 'Smartcare.health – Healthcare SaaS',
      tags: ['Healthcare', 'SaaS', 'Dashboard', 'Web App'],
      problem: 'Healthcare providers struggled with fragmented patient data, clunky interfaces, and slow workflows that impacted care quality. Existing tools were not designed with clinical workflows in mind, leading to data entry fatigue and errors.',
      role: [
        'Designed the complete SaaS platform UI for patient management',
        'Built data-dense dashboards optimized for clinical readability',
        'Ensured HIPAA-compliant design patterns and accessibility standards',
        'Iterated based on feedback from medical professionals and administrators'
      ],
      process: 'Stakeholder Interviews → Competitive Analysis → User Flow Mapping → Lo-Fi Wireframes → Hi-Fi Mockups → Design System → Prototype Testing → Handoff',
      tools: ['Figma', 'Adobe Illustrator', 'Miro', 'Hotjar', 'Jira'],
      outcome: 'Reduced average patient registration time by 50%. Doctor dashboard adoption increased by 60% compared to previous system. Successfully onboarded 15+ clinics within the first 6 months of deployment.'
    },
    pondytrends: {
      title: 'PondyTrends – Ecommerce App',
      tags: ['Ecommerce', 'Mobile App', 'Retail', 'UI Design'],
      problem: 'Local Pondicherry businesses needed a mobile-first ecommerce platform to reach customers online. Generic e-commerce templates failed to capture the unique local brand identity and shopping behavior patterns.',
      role: [
        'Designed full mobile app UI for iOS and Android platforms',
        'Created product browsing, cart, and checkout experiences',
        'Designed promotional banners and category navigation systems',
        'Built a cohesive visual brand identity for the app store listings'
      ],
      process: 'Market Research → User Personas → Task Analysis → Wireframing → UI Design → Micro-interaction Design → Testing → Launch',
      tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'InVision'],
      outcome: 'Launched successfully with 2,000+ downloads in the first month. Cart abandonment rate was kept under 25% through optimized checkout flow. Average session duration of 6+ minutes indicated high user engagement.'
    },
    ipayu: {
      title: 'IPayu – Mobile Recharge App',
      tags: ['Fintech', 'Mobile App', 'Payments', 'UI/UX'],
      problem: 'Users found existing mobile recharge apps confusing and unreliable, with too many steps to complete a simple recharge. Trust and security concerns also prevented wider adoption in tier-2 and tier-3 cities.',
      role: [
        'Designed intuitive mobile recharge and bill payment flows',
        'Created a trust-building UI with clear transaction confirmations',
        'Simplified the recharge process from 7 steps to just 3 taps',
        'Designed onboarding and first-time user experience'
      ],
      process: 'User Interviews → Competitive Audit → Flow Optimization → Wireframing → Visual Design → Usability Testing → Refinement → Handoff',
      tools: ['Figma', 'Sketch', 'Principle', 'Zeplin'],
      outcome: 'Achieved 98% task success rate for mobile recharge. Reduced average transaction completion time to under 30 seconds. App received 4.3-star rating with specific praise for its simplicity and clarity.'
    }
  };

  // ---------- Case Study Modal ----------
  caseCards.forEach(card => {
    card.addEventListener('click', () => {
      const studyKey = card.dataset.study;
      const study = caseStudies[studyKey];
      if (!study) return;

      openModal(study);
    });
  });

  function openModal(study) {
    const modal = modalOverlay.querySelector('.modal');

    // Set header
    modal.querySelector('.modal-title').textContent = study.title;
    const tagsContainer = modal.querySelector('.modal-tags');
    tagsContainer.innerHTML = study.tags.map(t => `<span class="case-tag">${t}</span>`).join('');

    // Set body
    modal.querySelector('.modal-problem').textContent = study.problem;

    const roleList = modal.querySelector('.modal-role-list');
    roleList.innerHTML = study.role.map(r => `<li>${r}</li>`).join('');

    modal.querySelector('.modal-process').textContent = study.process;

    const toolsContainer = modal.querySelector('.modal-tools-list');
    toolsContainer.innerHTML = study.tools.map(t => `<span class="modal-tool-tag">${t}</span>`).join('');

    modal.querySelector('.modal-outcome').textContent = study.outcome;

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate submission
      const submitBtn = contactForm.querySelector('.form-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  function showFormMessage(text, type) {
    let existing = document.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = `form-message form-message-${type}`;
    msg.textContent = text;
    msg.style.cssText = `
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 12px;
      background: ${type === 'success' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
      color: ${type === 'success' ? '#059669' : '#DC2626'};
      border: 1px solid ${type === 'success' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
    `;
    contactForm.appendChild(msg);

    setTimeout(() => msg.remove(), 5000);
  }

  // ---------- Smooth Scroll for all anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Counter Animation for Stats ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.count;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const suffix = target.replace(/[0-9]/g, '');
    const num = parseInt(target);
    let current = 0;
    const increment = Math.ceil(num / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        current = num;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 40);
  }

});

// ============================================
// ABOUT SECTION — Canvas Particle Network
// ============================================
(function initAboutCanvas() {
  const canvas = document.getElementById('about-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const section = canvas.closest('.about');

  function resize() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function getColor(alpha) {
    return document.body.classList.contains('dark-mode')
      ? `rgba(123,47,247,${alpha})`
      : `rgba(67,97,238,${alpha})`;
  }

  const COUNT = 38;
  const MAX_D = 140;

  const pts = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.55,
    vy: (Math.random() - 0.5) * 0.55,
    r: Math.random() * 2.2 + 1,
    ph: Math.random() * Math.PI * 2
  }));

  let raf, tick = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tick++;

    pts.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      const r = p.r + Math.sin(tick * 0.02 + p.ph) * 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = getColor(0.45);
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < MAX_D) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = getColor((1 - d / MAX_D) * 0.18);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    raf = requestAnimationFrame(draw);
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { if (!raf) draw(); }
    else { cancelAnimationFrame(raf); raf = null; }
  }, { threshold: 0.05 });

  obs.observe(section);
})();
