import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';

export const PrivacySettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-48 animate-pulse bg-muted/20 rounded-xl"></div>;

  const handleToggle = (key: string, value: boolean) => {
    updatePreferences({
      privacy: { ...preferences.privacy, [key]: value }
    });
  };

  const handleSelect = (key: string, value: string) => {
    updatePreferences({
      privacy: { ...preferences.privacy, [key]: value }
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Privacy & Visibility</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block font-medium text-foreground mb-2">Profile Visibility</label>
          <select 
            value={preferences.privacy.profileVisibility} 
            onChange={(e) => handleSelect('profileVisibility', e.target.value)}
            disabled={isPending}
            className="w-full max-w-sm px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="public">Public (Everyone)</option>
            <option value="connections">Connections Only</option>
            <option value="private">Private (Only Me)</option>
          </select>
          <p className="text-sm text-muted-foreground mt-2">Control who can view your academic profile and statistics.</p>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <label className="font-medium text-foreground block cursor-pointer">Activity Visibility</label>
            <p className="text-sm text-muted-foreground mt-1">Show when you are currently online or active.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={preferences.privacy.activityVisibility}
              onChange={(e) => handleToggle('activityVisibility', e.target.checked)}
              disabled={isPending}
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <label className="font-medium text-foreground block cursor-pointer">Leaderboard Participation</label>
            <p className="text-sm text-muted-foreground mt-1">Include your scores in public rankings.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={preferences.privacy.leaderboardParticipation}
              onChange={(e) => handleToggle('leaderboardParticipation', e.target.checked)}
              disabled={isPending}
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
