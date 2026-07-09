import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';
import { LanguageIcon } from '@heroicons/react/24/outline';

export const LanguageSettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-32 animate-pulse bg-muted/20 rounded-xl"></div>;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ language: e.target.value });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
          <LanguageIcon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">Display Language</h3>
          <p className="text-sm text-muted-foreground mb-4">Select the language used throughout the application.</p>
          
          <select 
            value={preferences.language} 
            onChange={handleLanguageChange}
            className="w-full max-w-sm px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="en">English (US)</option>
            <option value="hi">Hindi (हिंदी)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
