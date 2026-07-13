export function setupOfflineFallback() {
  window.addEventListener('online', () => {
    console.log('App is online');
    window.dispatchEvent(new Event('app-online'));
  });

  window.addEventListener('offline', () => {
    console.log('App is offline');
    window.dispatchEvent(new Event('app-offline'));
  });
}
