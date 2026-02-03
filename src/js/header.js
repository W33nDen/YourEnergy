// Set active navigation link based on current page
const setActiveNavLink = () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Remove all active classes
  [...navLinks, ...mobileNavLinks].forEach(link => {
    link.classList.remove('active');
  });

  // Set active based on current page
  if (currentPath.includes('favorites')) {
    navLinks[1]?.classList.add('active'); // Favorites
    mobileNavLinks[1]?.classList.add('active');
  } else {
    navLinks[0]?.classList.add('active'); // Home
    mobileNavLinks[0]?.classList.add('active');
  }
};

// Mobile menu toggle
const menuOpenBtn = document.querySelector('[data-menu-open]');
const menuCloseBtn = document.querySelector('[data-menu-close]');
const mobileMenu = document.querySelector('[data-menu]');

if (menuOpenBtn && menuCloseBtn && mobileMenu) {
  menuOpenBtn.addEventListener('click', () => {
    mobileMenu.classList.add('is-open');
  });

  menuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
  });
}

// Set active link on page load
setActiveNavLink();
