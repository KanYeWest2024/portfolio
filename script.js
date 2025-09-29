document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.querySelectorAll('.nav__toggle');
  const navLists = document.querySelectorAll('.nav__list');

  navToggle.forEach(btn => {
    btn.addEventListener('click', () => {
      const list = document.getElementById('main-menu');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      list.classList.toggle('nav__list--open');
    });
  });

  const path = window.location.pathname.toLowerCase();
  const links = document.querySelectorAll('.nav__link');

  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
   
    if (path.endsWith(href) || (path.includes('/projekty/') && href.includes('projekty.html'))) {
      a.classList.add('nav__link--active');
    }
  });

  const starfield = document.getElementById('starfield');

  function createStars(count = 140) {
    const frag = document.createDocumentFragment();
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'star';
     
      const size = (Math.random() * 2.4 + 0.6).toFixed(2);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.left = `${Math.random() * 100}%`;
      s.style.top = `${Math.random() * 100}%`;
      s.style.opacity = (Math.random() * 0.9 + 0.15).toFixed(2);
    
      s.style.animationDuration = `${(Math.random() * 6 + 2).toFixed(2)}s`;
      s.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
      frag.appendChild(s);
    }

    starfield.innerHTML = '';
    starfield.appendChild(frag);
  }

  createStars(Math.max(80, Math.floor((window.innerWidth * window.innerHeight) / 15000)));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      createStars(Math.max(80, Math.floor((window.innerWidth * window.innerHeight) / 15000)));
    }, 200);
  });

  let depth = 10;
  document.addEventListener('mousemove', (e) => {
    
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    
    const tx = (nx * depth).toFixed(2);
    const ty = (ny * depth).toFixed(2);
    starfield.style.transform = `translate(${tx}px, ${ty}px)`;
  });

});
