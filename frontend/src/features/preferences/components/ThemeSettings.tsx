import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export const ThemeSettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-32 animate-pulse bg-muted/20 rounded-xl"></div>;

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    updatePreferences({ theme });
  };

  const options = [
    { id: 'light', label: 'Light', icon: <SunIcon className="w-6 h-6" /> },
    { id: 'dark', label: 'Dark', icon: <MoonIcon className="w-6 h-6" /> },
    { id: 'system', label: 'System', icon: <ComputerDesktopIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Appearance Theme</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleThemeChange(option.id as any)}
            className={`p-4 flex flex-col items-center justify-center gap-3 rounded-xl border-2 transition-all \${
              preferences.theme === option.id 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-border bg-card hover:bg-muted/50 text-muted-foreground'
            }`}
          >
            {option.icon}
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
