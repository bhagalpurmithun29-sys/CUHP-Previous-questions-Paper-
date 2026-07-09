import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';

export const AccessibilitySettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-48 animate-pulse bg-muted/20 rounded-xl"></div>;

  const handleChange = (key: string, value: boolean) => {
    updatePreferences({
      accessibility: {
        ...preferences.accessibility,
        [key]: value
      }
    });
  };

  const settings = [
    { id: 'reducedMotion', label: 'Reduced Motion', description: 'Minimize animations and transitions.' },
    { id: 'highContrast', label: 'High Contrast', description: 'Increase contrast for better readability.' },
    { id: 'largerText', label: 'Larger Text', description: 'Increase the base font size globally.' },
    { id: 'keyboardNavigation', label: 'Enhanced Keyboard Navigation', description: 'Show persistent focus rings on interactive elements.' }
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Accessibility Settings</h3>
      <div className="space-y-6">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-start justify-between gap-4">
            <div>
              <label htmlFor={setting.id} className="font-medium text-foreground block cursor-pointer">
                {setting.label}
              </label>
              <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input 
                type="checkbox" 
                id={setting.id}
                className="sr-only peer"
                checked={preferences.accessibility[setting.id] || false}
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
