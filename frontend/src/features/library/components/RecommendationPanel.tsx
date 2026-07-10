import React from 'react';
import { useLibrary } from '../hooks/useLibrary';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const RecommendationPanel: React.FC = () => {
  const { recommendations } = useLibrary();

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-indigo-800 dark:text-indigo-400 flex items-center text-lg">
          <FiTrendingUp className="mr-2" /> Recommended for You
        </h3>
      </div>
      
      <div className="space-y-3">
        {recommendations.slice(0, 3).map((paper: any) => (
          <Link 
            key={paper._id} 
            to={`/viewer/${paper._id}`}
            className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{paper.title}</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-medium">
                {paper.views || 0} views
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center">
                Study Now <FiArrowRight className="ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
