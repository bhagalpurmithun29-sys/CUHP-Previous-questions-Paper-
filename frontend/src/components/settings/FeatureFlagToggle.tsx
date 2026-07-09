import React, { useState } from 'react';

interface FeatureFlagToggleProps {
  title: string;
  description: string;
  initialState: boolean;
  disabled?: boolean;
  badge?: string;
}

export const FeatureFlagToggle: React.FC<FeatureFlagToggleProps> = ({ title, description, initialState, disabled, badge }) => {
  const [isEnabled, setIsEnabled] = useState(initialState);

  return (
    <div className={`flex items-start justify-between p-4 rounded-lg border ${isEnabled ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-white'}`}>
      <div className="flex-1 pr-6">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          {badge && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">{badge}</span>}
        </div>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex items-center mt-1">
        <label className={`relative inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isEnabled}
            disabled={disabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};
