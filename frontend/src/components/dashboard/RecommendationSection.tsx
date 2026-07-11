import React from 'react';
import { FiTrendingUp, FiStar, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const recommendations = [
  { id: '1', title: 'Data Structures 2023 End Term', code: 'CS201', subject: 'Computer Science', type: 'Recommended', icon: <FiStar className="text-amber-500" /> },
  { id: '2', title: 'Calculus II Mid Term 2022', code: 'MA102', subject: 'Mathematics', type: 'Trending', icon: <FiTrendingUp className="text-emerald-500" /> },
  { id: '3', title: 'Quantum Mechanics Finals', code: 'PH301', subject: 'Physics', type: 'Recently Added', icon: <FiClock className="text-blue-500" /> },
];

export const RecommendationSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FiStar /> Suggested for You
        </h2>
        <button className="text-sm font-medium text-primary hover:underline">Browse All</button>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Link 
            key={rec.id} 
            to={`/viewer/${rec.id}`} 
            className="block p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {rec.code}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{rec.subject}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{rec.title}</h3>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                  {rec.icon}
                </div>
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{rec.type}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
