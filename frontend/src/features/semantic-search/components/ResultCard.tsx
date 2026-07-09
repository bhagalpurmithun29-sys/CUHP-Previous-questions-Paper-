import React from 'react';
import { FiFileText, FiCalendar, FiBookOpen, FiCpu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface ResultCardProps {
  result: any;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/explorer/paper/${result._id}`)}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
          {result.title}
        </h3>
        {result.isSemanticOnly && (
          <span className="shrink-0 flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg">
            <FiCpu /> AI Match
          </span>
        )}
      </div>

      {result.semanticContext && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
          <p className="line-clamp-3 italic">"{result.semanticContext}"</p>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <FiBookOpen className="text-primary/70" />
          <span>{result.subject?.name || 'Unknown Subject'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiCalendar className="text-primary/70" />
          <span>{result.year || result.metadata?.year}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiFileText className="text-primary/70" />
          <span>{result.examType || result.metadata?.examType}</span>
        </div>
        
        {result.hybridScore && (
          <div className="ml-auto text-xs font-mono font-medium text-gray-400">
            Score: {result.hybridScore.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};
