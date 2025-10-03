document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations when page loads
  initScrollAnimation();

  // Load header
  loadHeader();

  // Load footer and set copyright year
  loadFooter();

  // Service Worker Registration
  registerServiceWorker();

  // Initialize back to top button
  initBackToTop();
});


// Scroll-triggered zoom animation for project images only
function initScrollAnimation() {
  const projectImages = document.querySelectorAll('.project-image');
  
  // Create intersection observer for project images
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          const element = entry.target;
          
          if (entry.isIntersecting) {
              // Element is entering viewport - zoom in slightly (smaller scale)
              element.classList.add('scroll-in');
              element.classList.remove('scroll-out');
          } else {
              // Element is leaving viewport - zoom out slightly (larger scale)
              element.classList.add('scroll-out');
              element.classList.remove('scroll-in');
          }
      });
  }, {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '-50px 0px' // Add some margin for smoother effect
  });

  // Observe all project images
  projectImages.forEach(image => {
      observer.observe(image);
  });
  
  // Parallax + zoom effect for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.innerWidth > 768) {
      let ticking = false;
      
      function updateParallax() {
          const scrolled = window.pageYOffset;
          const heroHeight = heroSection.offsetHeight;
          
          // Parallax effect
          const parallaxSpeed = 0.5;
          const yPos = -(scrolled * parallaxSpeed);
          
          // Zoom effect - scale increases as we scroll down
          const maxScroll = heroHeight;
          const scrollProgress = Math.min(scrolled / maxScroll, 1);
          const scale = 1 + (scrollProgress * 0.3); // Scale from 1.0 to 1.3
          
          // Apply both effects
          heroSection.style.backgroundPosition = `center ${yPos}px`;
          heroSection.style.backgroundSize = `${scale * 100}%`;
          
          ticking = false;
      }
      
      function requestTick() {
          if (!ticking) {
              requestAnimationFrame(updateParallax);
              ticking = true;
          }
      }
      
      window.addEventListener('scroll', requestTick);
  }
}

function loadHeader() {
  fetch('./header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // Initialize mobile menu
      initMobileMenu();

      // Smooth scrolling for anchor links
      anchorAnimation();
    })
    .catch(error => console.error('Error loading header:', error));
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

  // Return early if mobile menu elements don't exist
  if (!mobileMenuBtn || !mobileNavOverlay || !mobileNavClose) {
    return;
  }

  // Helper function to close mobile menu
  function closeMobileMenu() {
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Helper function to open mobile menu
  function openMobileMenu() {
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // Open mobile menu
  mobileMenuBtn.addEventListener('click', openMobileMenu);

  // Close mobile menu
  mobileNavClose.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking on overlay
  mobileNavOverlay.addEventListener('click', function(e) {
    if (e.target === mobileNavOverlay) {
      closeMobileMenu();
    }
  });

  // Close mobile menu when clicking on navigation links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

function loadFooter() {
  fetch('./footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        
        // Set copyright year after footer is loaded
        const copyrightYear = document.getElementById('copyright-year');
        if (copyrightYear) {
            copyrightYear.textContent = new Date().getFullYear();
        }
    })
    .catch(error => console.error('Error loading footer:', error));
}

function anchorAnimation() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
        }
    });
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Check if we're in development mode (localhost or 127.0.0.1)
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (!isDevelopment) {
      navigator.serviceWorker.register('/sw.js').then(
        () => console.log('service worker registered'),
        err => console.error('service worker failed', err)
      );
    } else {
      console.log('Service worker disabled in development mode');
    }
  } else {
    console.log('service worker is not supported');
  }
}

// Back to Top Button functionality
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (!backToTopButton) return; // Exit if button doesn't exist on this page
  
  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
  
  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Event listeners
  window.addEventListener('scroll', toggleBackToTopButton);
  backToTopButton.addEventListener('click', scrollToTop);
  
  // Initial check
  toggleBackToTopButton();
}

