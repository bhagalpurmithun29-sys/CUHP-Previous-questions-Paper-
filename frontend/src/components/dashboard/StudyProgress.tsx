import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

export const StudyProgress: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-8 -mb-8"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2 opacity-90">
          <FiTrendingUp className="w-5 h-5" />
          <h2 className="font-semibold">Study Progress</h2>
        </div>
        
        <div className="mt-6 mb-2 flex justify-between items-end">
          <div>
            <div className="text-4xl font-black">68%</div>
            <div className="text-sm opacity-80 mt-1">Goal completion this week</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">12 / 18</div>
            <div className="text-xs opacity-80 uppercase tracking-wider">Papers Reviewed</div>
          </div>
        </div>
        
        <div className="w-full bg-black/20 rounded-full h-2.5 mt-4 overflow-hidden">
          <div className="bg-white h-2.5 rounded-full" style={{ width: '68%' }}></div>
        </div>
        
        <button className="w-full mt-6 py-2.5 bg-white/20 hover:bg-white/30 transition-colors rounded-xl text-sm font-bold backdrop-blur-sm">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};
