import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';

export const NotificationSettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-64 animate-pulse bg-muted/20 rounded-xl"></div>;

  const handleChange = (key: string, value: boolean) => {
    updatePreferences({
      notifications: {
        ...preferences.notifications,
        [key]: value
      }
    });
  };

  const settings = [
    { id: 'emailNotifications', label: 'Email Notifications', description: 'Receive daily digests and critical updates via email.' },
    { id: 'inAppNotifications', label: 'In-App Notifications', description: 'Show notification bell alerts when logged in.' },
    { id: 'securityAlerts', label: 'Security Alerts', description: 'Get notified about new logins and password changes.' },
    { id: 'academicUpdates', label: 'Academic Updates', description: 'Alerts for new question papers in your department.' },
    { id: 'announcements', label: 'Platform Announcements', description: 'News, features, and platform maintenance.' }
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Notification Preferences</h3>
      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between gap-4">
            <div>
              <label htmlFor={`notif-\${setting.id}`} className="font-medium text-foreground block cursor-pointer">
                {setting.label}
              </label>
              <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                id={`notif-\${setting.id}`}
                className="sr-only peer"
                checked={preferences.notifications[setting.id] ?? true}
                onChange={(e) => handleChange(setting.id, e.target.checked)}
                disabled={isPending}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
