import React from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

export const AccessibilityPreferences: React.FC = () => {
  const { preferences, updatePreference } = useAccessibility();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm max-w-2xl mx-auto w-full space-y-6">
      
      {/* Text Scaling */}
      <div>
        <label className="flex flex-col gap-1">
          <span className="font-bold text-gray-900 dark:text-white">Text Scaling</span>
          <span className="text-sm text-gray-500">Increase or decrease global font sizes.</span>
        </label>
        <div className="mt-3 flex items-center gap-4">
           <span className="text-sm font-medium">A</span>
           <input 
             type="range" 
             min="0.8" 
             max="1.5" 
             step="0.1" 
             value={preferences.textScale}
             onChange={(e) => updatePreference('textScale', parseFloat(e.target.value))}
             className="flex-1 accent-indigo-600"
           />
           <span className="text-xl font-bold">A</span>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* High Contrast */}
      <div className="flex items-center justify-between">
        <label htmlFor="highContrast" className="flex flex-col gap-1 cursor-pointer">
          <span className="font-bold text-gray-900 dark:text-white">High Contrast Mode</span>
          <span className="text-sm text-gray-500">Enhance color contrast for better legibility.</span>
        </label>
        <input 
          id="highContrast"
          type="checkbox" 
          checked={preferences.highContrast}
          onChange={(e) => updatePreference('highContrast', e.target.checked)}
          className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
        />
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Reduced Motion */}
      <div className="flex items-center justify-between">
        <label htmlFor="reducedMotion" className="flex flex-col gap-1 cursor-pointer">
          <span className="font-bold text-gray-900 dark:text-white">Reduced Motion</span>
          <span className="text-sm text-gray-500">Minimize animations and transition effects.</span>
        </label>
        <input 
          id="reducedMotion"
          type="checkbox" 
          checked={preferences.reducedMotion}
          onChange={(e) => updatePreference('reducedMotion', e.target.checked)}
          className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
        />
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Screen Reader Optimized */}
      <div className="flex items-center justify-between">
        <label htmlFor="screenReader" className="flex flex-col gap-1 cursor-pointer">
          <span className="font-bold text-gray-900 dark:text-white">Screen Reader Optimization</span>
          <span className="text-sm text-gray-500">Enhance ARIA outputs and live regions.</span>
        </label>
        <input 
          id="screenReader"
          type="checkbox" 
          checked={preferences.screenReaderOptimized}
          onChange={(e) => updatePreference('screenReaderOptimized', e.target.checked)}
          className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
        />
      </div>

    </div>
  );
};
