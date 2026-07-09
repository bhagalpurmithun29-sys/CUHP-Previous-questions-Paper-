import React from 'react';
import { useAccountProfile } from '../hooks/useAccount';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ProfileInformation } from '../components/ProfileInformation';
import { AcademicInformation } from '../components/AcademicInformation';
import { AvatarManager } from '../components/AvatarManager';
import { ConnectedAccounts } from '../components/ConnectedAccounts';
import { PrivacyControls } from '../components/PrivacyControls';
import { DataExport } from '../components/DataExport';
import { DeleteAccount } from '../components/DeleteAccount';
import { ProfileActivity } from '../components/ProfileActivity';
import { ProfileCompletionCard } from '../components/ProfileCompletionCard';

export const AccountCenterPage: React.FC = () => {
  const { data: profile, isLoading } = useAccountProfile();

  if (isLoading || !profile) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <UserCircleIcon className="w-8 h-8 text-primary" />
          Account & Profile Center
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information, academic details, and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AvatarManager profile={profile} />
          <ProfileInformation profile={profile} />
          <AcademicInformation profile={profile} />
          <ConnectedAccounts />
          <DataExport />
          <DeleteAccount />
        </div>
        
        <div className="space-y-8">
          <ProfileCompletionCard profile={profile} />
          <PrivacyControls />
          <ProfileActivity />
        </div>
      </div>
    </div>
  );
};

export default AccountCenterPage;
