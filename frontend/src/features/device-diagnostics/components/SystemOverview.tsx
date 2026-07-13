import React from 'react';

export const SystemOverview: React.FC = () => {
  const isOnline = navigator.onLine;
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  const supportsSW = 'serviceWorker' in navigator;
  const supportsIDB = 'indexedDB' in window;

  const checks = [
    { name: 'Network Connection', status: isOnline, msg: isOnline ? 'Online' : 'Offline' },
    { name: 'PWA Installed', status: isPWA, msg: isPWA ? 'Standalone' : 'Browser Mode' },
    { name: 'Offline Storage (IDB)', status: supportsIDB, msg: supportsIDB ? 'Available' : 'Unsupported' },
    { name: 'Background Workers', status: supportsSW, msg: supportsSW ? 'Supported' : 'Missing' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm max-w-2xl mx-auto w-full">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Local Device Readiness</h2>
      <div className="space-y-4">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{check.name}</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full \${check.status ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{check.msg}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
