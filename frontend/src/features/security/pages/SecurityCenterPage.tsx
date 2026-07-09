import React from 'react';
import { SecurityOverview } from '../components/SecurityOverview';
import { ActiveSessions } from '../components/ActiveSessions';
import { DeviceList } from '../components/DeviceList';
import { LoginHistory } from '../components/LoginHistory';
import { SecurityTimeline } from '../components/SecurityTimeline';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { SignOutAllDialog } from '../components/SignOutAllDialog';
import { useRevokeAllSessions } from '../hooks/useSecurityCenter';

export const SecurityCenterPage: React.FC = () => {
  const [isSignOutAllOpen, setIsSignOutAllOpen] = React.useState(false);
  const { mutate: revokeAll, isPending } = useRevokeAllSessions();

  const handleSignOutAll = () => {
    revokeAll(undefined, {
      onSuccess: () => {
        setIsSignOutAllOpen(false);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <ShieldCheckIcon className="w-8 h-8 text-primary" />
            Security Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your account's security, active sessions, and trusted devices.
          </p>
        </div>
        <button 
          onClick={() => setIsSignOutAllOpen(true)}
          className="px-4 py-2 bg-warning/10 text-warning rounded-lg font-medium hover:bg-warning/20 transition-colors whitespace-nowrap"
        >
          Sign Out All Other Sessions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SecurityOverview />
          <ActiveSessions />
          <DeviceList />
          <LoginHistory />
        </div>
        
        <div className="space-y-8">
          <SecurityTimeline />
        </div>
      </div>

      <SignOutAllDialog 
        isOpen={isSignOutAllOpen}
        onClose={() => setIsSignOutAllOpen(false)}
        onConfirm={handleSignOutAll}
        isLoading={isPending}
      />
    </div>
  );
};

export default SecurityCenterPage;
