export let deferredPrompt: any;

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    window.dispatchEvent(new Event('app-installable'));
  });

  window.addEventListener('appinstalled', () => {
    // Log install to analytics
    console.log('PWA was installed');
    deferredPrompt = null;
  });
}
