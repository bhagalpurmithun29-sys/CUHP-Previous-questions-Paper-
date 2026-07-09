import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import { FullScreenLoader } from './FullScreenLoader';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { loading, refresh, authenticated } = useSession();
  const [initFinished, setInitFinished] = useState(false);

  useEffect(() => {
    // In our architecture, the AuthContext already attempts to load the user on mount.
    // We wait for the `loading` flag from `useSession()` to become false.
    if (!loading) {
      setInitFinished(true);
    }
  }, [loading]);

  useEffect(() => {
    // If not authenticated after init, but maybe there's a token refresh interval needed,
    // we could set up an auto-refresh here.
    if (initFinished && authenticated) {
      const interval = setInterval(() => {
        refresh();
      }, 14 * 60 * 1000); // refresh every 14 minutes
      
      return () => clearInterval(interval);
    }
  }, [initFinished, authenticated, refresh]);

  if (!initFinished || loading) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
};
