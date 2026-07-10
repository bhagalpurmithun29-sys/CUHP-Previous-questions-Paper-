import React from 'react';
import { useLibrary } from '../hooks/useLibrary';
import { FiBookOpen, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const ContinueReading: React.FC = () => {
  const { overview } = useLibrary();
  const progress = overview?.progress;

  if (!progress || progress.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
        <FiBookOpen className="mr-3 text-blue-600 dark:text-blue-400" /> Continue Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {progress.slice(0, 3).map((item: any) => (
          <Link 
            key={item._id}
            to={`/viewer/${item.paperId?._id}?page=${item.lastPageRead}`}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group hover:border-blue-300 dark:hover:border-blue-700"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors h-10">
              {item.paperId?.title || 'Unknown Paper'}
            </h4>
            
            <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
              <span className="flex items-center"><FiBookOpen className="mr-1.5 text-blue-500" /> Pg {item.lastPageRead}</span>
              <span className="flex items-center"><FiClock className="mr-1.5" /> {new Date(item.lastReadAt).toLocaleDateString()}</span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1.5 overflow-hidden shadow-inner">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${item.progressPercentage}%` }}></div>
            </div>
            <div className="text-right text-xs text-gray-500 font-semibold">{item.progressPercentage}% Complete</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
