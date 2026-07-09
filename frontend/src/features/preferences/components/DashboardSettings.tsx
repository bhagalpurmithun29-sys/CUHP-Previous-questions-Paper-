import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';

export const DashboardSettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-48 animate-pulse bg-muted/20 rounded-xl"></div>;

  const handleChange = (key: string, value: string) => {
    updatePreferences({
      dashboard: {
        ...preferences.dashboard,
        [key]: value
      }
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Dashboard Settings</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block font-medium text-foreground mb-2">Default Layout</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="layout" 
                value="grid" 
                checked={preferences.dashboard.layoutPreferences === 'grid'}
                onChange={(e) => handleChange('layoutPreferences', e.target.value)}
                className="text-primary focus:ring-primary"
              />
              Grid View
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="layout" 
                value="list" 
                checked={preferences.dashboard.layoutPreferences === 'list'}
                onChange={(e) => handleChange('layoutPreferences', e.target.value)}
                className="text-primary focus:ring-primary"
              />
              List View
            </label>
          </div>
        </div>

        <div>
          <label className="block font-medium text-foreground mb-2">Card Density</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="density" 
                value="comfortable" 
                checked={preferences.dashboard.cardDensity === 'comfortable'}
                onChange={(e) => handleChange('cardDensity', e.target.value)}
                className="text-primary focus:ring-primary"
              />
              Comfortable
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="density" 
                value="compact" 
                checked={preferences.dashboard.cardDensity === 'compact'}
                onChange={(e) => handleChange('cardDensity', e.target.value)}
                className="text-primary focus:ring-primary"
              />
              Compact
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
