const PATH = {
  MARKETING_DASHBOARD: {
    PATH: '/marketing-dashboard',
    NAV: '../navbar.html'
  },
  MARKETING_DASHBOARD_ZH_TW: {
    PATH: '/marketing-dashboard/zh-TW',
    NAV: '../../navbar.html'
  },
  ROOT: {
    PATH: '/',
    NAV: './navbar.html'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Determine navbar html path based on current path
  const currentPath = window.location.pathname;
  const navbarPath = getNavbarPath(currentPath);
  
  // Load the appropriate navigation bar
  fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
      document.querySelector('body').insertAdjacentHTML('afterbegin', data);
      
      // Add mobile menu toggle functionality
      const bar = document.querySelector('.bar');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      bar.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });

      mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!event.target.closest('.blog-navbar')) {
          mobileMenu.classList.remove('active');
        }
      });
    })
    .catch(error => console.error('Error loading navigation:', error));
});

function getNavbarPath(path) {
  
  if (path.startsWith(PATH.MARKETING_DASHBOARD_ZH_TW.PATH)) {
    return PATH.MARKETING_DASHBOARD_ZH_TW.NAV;
  } else if (path.startsWith(PATH.MARKETING_DASHBOARD.PATH)) {
    return PATH.MARKETING_DASHBOARD.NAV;
  } else {
    return PATH.ROOT.NAV;
  }
}