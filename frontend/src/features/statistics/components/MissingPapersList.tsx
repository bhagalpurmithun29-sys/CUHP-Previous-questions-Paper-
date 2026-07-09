import React from 'react';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface MissingPapersListProps {
  subjects: { _id: string; name: string; code: string }[];
}

export const MissingPapersList: React.FC<MissingPapersListProps> = ({ subjects }) => {
  if (!subjects || subjects.length === 0) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <FiAlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500" />
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-500">Contribution Opportunities</h3>
      </div>
      <p className="text-sm text-amber-700 dark:text-amber-600 mb-6">
        These subjects currently have zero approved question papers in our repository. Be the first to contribute!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {subjects.map(sub => (
          <div key={sub._id} className="bg-white/60 dark:bg-gray-900/40 p-3 rounded-lg flex items-center justify-between border border-amber-100 dark:border-amber-900/20">
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-200 text-sm">{sub.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{sub.code}</div>
            </div>
          </div>
        ))}
      </div>
      
      <Link to="/dashboard/upload" className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
        Upload a paper now <FiArrowRight />
      </Link>
    </div>
  );
};
