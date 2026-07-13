import React, { useState } from 'react';
import { useAIAnalytics } from '../hooks/useAIAnalytics';

export const ExportReports: React.FC = () => {
  const { exportReport } = useAIAnalytics();
  const [reportType, setReportType] = useState('USAGE');

  const handleExport = () => {
    exportReport.mutate({ type: reportType, filters: {} }, {
      onSuccess: (data) => {
        // Simulate downloading the URL returned by the backend
        window.open(data.url, '_blank');
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Export Data</h3>
      <div className="space-y-4">
        <select 
          value={reportType} 
          onChange={(e) => setReportType(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="USAGE">Platform Usage Report (PDF)</option>
          <option value="DEPARTMENT">Department Analytics (CSV)</option>
          <option value="EXECUTIVE">Executive KPI Summary (PDF)</option>
        </select>
        <button 
          onClick={handleExport}
          disabled={exportReport.isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors text-sm disabled:opacity-50 flex justify-center items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          {exportReport.isPending ? 'Generating...' : 'Download Report'}
        </button>
      </div>
    </div>
  );
};
