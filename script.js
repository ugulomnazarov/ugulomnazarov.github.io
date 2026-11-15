(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = themeButton.querySelector('.theme-icon');
  const themeLabel = themeButton.querySelector('.theme-label');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');

  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    themeButton.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
    themeIcon.textContent = isDark ? '☀' : '☾';
    themeLabel.textContent = isDark ? 'Light mode' : 'Dark mode';
    metaTheme.content = isDark ? '#111914' : '#f6f8f5';
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('ubaydulla-theme'); } catch (_) {}
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');

  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('ubaydulla-theme', theme); } catch (_) {}
  });

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !isOpen);
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }
  });
})();
