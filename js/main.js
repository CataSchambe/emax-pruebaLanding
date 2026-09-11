/**
 * GRUPO EMAX - ASESORÍA ENERGÉTICA
 * Core Application Controller (Theme Switcher, Navigation, FAQ)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Claro / Oscuro)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', 'true');
        themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        themeToggleBtn.setAttribute('title', 'Cambiar a modo claro');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', 'false');
        themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        themeToggleBtn.setAttribute('title', 'Cambiar a modo oscuro');
      }
    }
  }

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('emax-theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark.matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('emax-theme', newTheme);
    });
  }

  // Listen to OS theme changes if user hasn't chosen manually
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('emax-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        navLinks.classList.remove('open');
        menuToggleBtn.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        navLinks.classList.add('open');
        menuToggleBtn.classList.add('open');
        menuToggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggleBtn.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Header Scroll Shadow & Compact State
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. FAQ Accordion (Accessible with ARIA & hidden states)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      const panelId = `faq-panel-${index + 1}`;
      const triggerId = `faq-trigger-${index + 1}`;
      
      trigger.setAttribute('id', triggerId);
      trigger.setAttribute('aria-controls', panelId);
      content.setAttribute('id', panelId);
      content.setAttribute('role', 'region');
      content.setAttribute('aria-labelledby', triggerId);

      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherContent) {
              otherContent.style.maxHeight = null;
              otherContent.setAttribute('hidden', '');
            }
          }
        });

        // Toggle current item
        if (isExpanded) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
          content.setAttribute('hidden', '');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          content.removeAttribute('hidden');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // Initialize FAQ state: open first item, close others with hidden
  faqItems.forEach((item, index) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (trigger && content) {
      if (index === 0) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        content.setAttribute('hidden', '');
      }
    }
  });

  // 5. Active Section Navigation Observer
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
