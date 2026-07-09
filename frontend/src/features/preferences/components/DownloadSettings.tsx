import React from 'react';
import { usePreferences, useUpdatePreferences } from '../hooks/usePreferences';

export const DownloadSettings: React.FC = () => {
  const { data: preferences, isLoading } = usePreferences();
  const { mutate: updatePreferences } = useUpdatePreferences();

  if (isLoading || !preferences) return <div className="h-48 animate-pulse bg-muted/20 rounded-xl"></div>;

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">Download Preferences</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block font-medium text-foreground mb-2">Default File Format</label>
          <select 
            value={preferences.downloads.defaultFormat} 
            onChange={(e) => updatePreferences({ downloads: { ...preferences.downloads, defaultFormat: e.target.value } })}
            className="w-full max-w-sm px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="pdf">PDF Document (.pdf)</option>
            <option value="docx">Word Document (.docx)</option>
            <option value="txt">Plain Text (.txt)</option>
          </select>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <label className="font-medium text-foreground block cursor-pointer">Auto-Open Files</label>
            <p className="text-sm text-muted-foreground mt-1">Automatically open downloaded question papers.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={preferences.downloads.autoOpen}
              onChange={(e) => updatePreferences({ downloads: { ...preferences.downloads, autoOpen: e.target.checked } })}
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
