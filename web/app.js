(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 14);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const nextOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(nextOpen));
      nav.classList.toggle('open', nextOpen);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -28px' });
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const terminal = document.getElementById('terminal-text');
  const lines = [
    'workspace inspect --lineage',
    'reports sort --severity',
    'metrics refresh --workspace',
    'jobs list --state active'
  ];

  if (terminal && !reduceMotion) {
    let line = 0;
    let index = terminal.textContent.length;
    let deleting = false;
    const animateText = () => {
      const target = lines[line];
      if (!deleting && index < target.length) {
        index += 1;
        terminal.textContent = target.slice(0, index);
        setTimeout(animateText, 52);
      } else if (!deleting) {
        deleting = true;
        setTimeout(animateText, 1600);
      } else if (index > 0) {
        index -= 1;
        terminal.textContent = target.slice(0, index);
        setTimeout(animateText, 22);
      } else {
        deleting = false;
        line = (line + 1) % lines.length;
        setTimeout(animateText, 320);
      }
    };
    setTimeout(animateText, 1900);
  }

  const canvas = document.getElementById('signal-field');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let ratio = 1;
  let points = [];
  const pointer = { x: -10000, y: -10000 };

  const createPoint = () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    size: 0.5 + Math.random() * 0.8,
    alpha: 0.08 + Math.random() * 0.18
  });

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const total = Math.min(68, Math.max(30, Math.floor((width * height) / 22000)));
    points = Array.from({ length: total }, createPoint);
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);
    points.forEach((point, i) => {
      const dx = point.x - pointer.x;
      const dy = point.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 150 && distance > 0) {
        point.vx += (dx / distance) * 0.002;
        point.vy += (dy / distance) * 0.002;
      }

      point.x += point.vx;
      point.y += point.vy;
      if (point.x < -10 || point.x > width + 10) point.vx *= -1;
      if (point.y < -10 || point.y > height + 10) point.vy *= -1;

      ctx.beginPath();
      ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(112, 178, 255, ${point.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < points.length; j += 1) {
        const other = points[j];
        const gap = Math.hypot(point.x - other.x, point.y - other.y);
        if (gap > 125) continue;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(74, 142, 246, ${(1 - gap / 125) * 0.07})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }
    });
    requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.x = -10000;
    pointer.y = -10000;
  });
  window.addEventListener('resize', resize, { passive: true });

  resize();
  requestAnimationFrame(render);
})();
