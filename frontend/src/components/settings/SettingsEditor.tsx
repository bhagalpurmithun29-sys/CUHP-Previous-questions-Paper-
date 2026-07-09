import React, { useState } from 'react';

interface SettingsEditorProps {
  label: string;
  settingKey: string;
  type: 'string' | 'number' | 'boolean';
  initialValue: any;
}

export const SettingsEditor: React.FC<SettingsEditorProps> = ({ label, settingKey, type, initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // await fetch('/api/settings', { method: 'PUT', body: JSON.stringify({ key: settingKey, value }) });
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-800 mb-1">{label}</label>
        <span className="text-xs text-slate-500 font-mono bg-slate-200 px-1.5 py-0.5 rounded">{settingKey}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {type === 'boolean' ? (
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={value}
              onChange={(e) => setValue(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        ) : type === 'number' ? (
          <input 
            type="number" 
            value={value} 
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-24 border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            className="w-64 border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
        
        <button 
          onClick={handleSave}
          disabled={value === initialValue || isSaving}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-opacity"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};
