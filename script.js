document.addEventListener('DOMContentLoaded', function() {
  // Service Worker Registration
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

  // Copyright functionality
  const copyrightYear = document.getElementById('copyright-year');
  copyrightYear.textContent = new Date().getFullYear() || '2025';

  // Accordion functionality
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-bs-target');
      const target = document.querySelector(targetId);
      const isExpanded = button.classList.contains('collapsed');
      
      // Close all other accordion items
      document.querySelectorAll('.accordion-collapse.show').forEach(collapse => {
        if (collapse.id !== targetId.substring(1)) {
          collapse.classList.remove('show');
          const otherButton = document.querySelector(`[data-bs-target="#${collapse.id}"]`);
          otherButton.classList.add('collapsed');
          otherButton.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle the clicked item
      button.classList.toggle('collapsed');
      target.classList.toggle('show');
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });
});

