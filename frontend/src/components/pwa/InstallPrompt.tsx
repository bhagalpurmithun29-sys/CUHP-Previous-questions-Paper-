import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Don't show immediately if they dismissed recently
      if (!localStorage.getItem('cuhp_pwa_dismissed')) {
        setShow(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('cuhp_pwa_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-5 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
          <FiDownload className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-1">Install App</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Install CUHP Question Bank for offline access and faster loading.</p>
          <div className="flex gap-2">
            <button onClick={handleInstall} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-primary-dark transition-colors">Install</button>
            <button onClick={handleDismiss} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Later</button>
          </div>
        </div>
      </div>
    </div>
  );
};
