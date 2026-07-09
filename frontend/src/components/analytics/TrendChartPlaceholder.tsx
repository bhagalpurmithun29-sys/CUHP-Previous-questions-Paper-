import React from 'react';

export const TrendChartPlaceholder: React.FC<{ title: string; type: 'bar' | 'line' | 'area' }> = ({ title, type }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <select className="bg-slate-50 border border-slate-200 text-sm rounded-md px-2 py-1 text-slate-600 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>
      
      {/* Chart Canvas Placeholder */}
      <div className="w-full h-64 bg-slate-50 border border-dashed border-slate-200 rounded flex flex-col items-center justify-center text-slate-400">
        <svg className="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span className="text-sm font-medium uppercase tracking-wider">{type} Chart Rendering Area</span>
        <span className="text-xs mt-1">Requires Recharts or Chart.js integration</span>
      </div>
    </div>
  );
};
