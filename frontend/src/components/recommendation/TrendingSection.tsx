import React from 'react';
import { RecommendationCarousel } from './RecommendationCarousel';

export const TrendingSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Trending Across Campus</h2>
          <p className="mt-2 text-lg text-slate-600">The most downloaded and discussed papers this week.</p>
        </div>
        
        <RecommendationCarousel title="Popular Right Now" endpoint="trending?limit=8" />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col justify-center items-start">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">Exam Season</span>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">Prepare for Mid Terms</h3>
             <p className="text-slate-600 mb-6">Explore our curated collection of mid-term question papers from the last 5 years.</p>
             <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
               Explore Collection
             </button>
           </div>
           
           <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 flex flex-col justify-center items-start">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">New Arrivals</span>
             <h3 className="text-2xl font-bold text-slate-900 mb-2">Freshly Uploaded</h3>
             <p className="text-slate-600 mb-6">See the latest papers uploaded and verified by our moderation team today.</p>
             <button className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">
               View Latest
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
