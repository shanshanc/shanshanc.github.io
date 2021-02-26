window.addEventListener('load', () => {
  if (!'serviceWorker' in navigator) {
    console.log('service worker is not supported');
    return;
  }

  navigator.serviceWorker.register('/sw.js').then(
    () => console.log('service worker registered'),
    err => console.error('service worker failed', err)
  );

});

