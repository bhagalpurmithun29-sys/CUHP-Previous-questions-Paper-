import React, { useState } from 'react';
import { AdjustmentsHorizontalIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { ThemeSettings } from '../components/ThemeSettings';
import { LanguageSettings } from '../components/LanguageSettings';
import { AccessibilitySettings } from '../components/AccessibilitySettings';
import { NotificationSettings } from '../components/NotificationSettings';
import { DashboardSettings } from '../components/DashboardSettings';
import { PrivacySettings } from '../components/PrivacySettings';
import { DownloadSettings } from '../components/DownloadSettings';
import { PreferenceResetDialog } from '../components/PreferenceResetDialog';
import { useResetPreferences } from '../hooks/usePreferences';

export const PreferencesPage: React.FC = () => {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const { mutate: resetPreferences, isPending } = useResetPreferences();

  const handleReset = () => {
    resetPreferences(undefined, {
      onSuccess: () => setIsResetOpen(false)
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <AdjustmentsHorizontalIcon className="w-8 h-8 text-primary" />
            Preferences & Accessibility
          </h1>
          <p className="text-muted-foreground mt-2">
            Personalize your experience, manage accessibility settings, and configure notifications.
          </p>
        </div>
        <button 
          onClick={() => setIsResetOpen(true)}
          className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Reset to Defaults
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ThemeSettings />
          <LanguageSettings />
          <AccessibilitySettings />
          <DownloadSettings />
        </div>
        <div className="space-y-8">
          <NotificationSettings />
          <DashboardSettings />
          <PrivacySettings />
        </div>
      </div>

      <PreferenceResetDialog 
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={handleReset}
        isLoading={isPending}
      />
    </div>
  );
};

export default PreferencesPage;
