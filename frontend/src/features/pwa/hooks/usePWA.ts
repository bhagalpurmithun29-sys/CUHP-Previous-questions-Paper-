import { useState, useEffect } from 'react';
import { deferredPrompt } from '../../pwa/installPrompt';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleInstallable = () => setIsInstallable(true);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('app-installable', handleInstallable);
    window.addEventListener('app-online', handleOnline);
    window.addEventListener('app-offline', handleOffline);

    return () => {
      window.removeEventListener('app-installable', handleInstallable);
      window.removeEventListener('app-online', handleOnline);
      window.removeEventListener('app-offline', handleOffline);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
    }
  };

  const { data: appVersion, isLoading: isVersionLoading } = useQuery({
    queryKey: ['app-version'],
    queryFn: async () => {
      const res = await axios.get('/api/v1/app/version');
      return res.data.data;
    },
    // Don't refetch if offline
    enabled: isOnline
  });

  return {
    isInstallable,
    isOnline,
    promptInstall,
    appVersion,
    isVersionLoading
  };
};
