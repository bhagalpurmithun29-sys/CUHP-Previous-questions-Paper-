import React from 'react';
import { Link } from 'react-router-dom';

interface SearchResultCardProps {
  result: any;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 0.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  const getConfidenceLabel = (score: number) => {
    if (score >= 0.8) return 'High Match';
    if (score >= 0.5) return 'Moderate Match';
    return 'Low Match';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-light bg-primary/10 px-2 py-0.5 rounded">
              {result.entityType || 'Document'}
            </span>
            {result.metadata?.topic && (
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                {result.metadata.topic}
              </span>
            )}
            {result.metadata?.difficulty && (
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                Diff: {result.metadata.difficulty}
              </span>
            )}
          </div>
          
          <Link to={result.url || '#'} className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary transition-colors block truncate">
            {result.title}
          </Link>
          
          {result.subtitle && (
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">{result.subtitle}</p>
          )}

          {/* Highlighted Snippets */}
          {result.snippet ? (
            <p 
              className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-3 prose prose-sm dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: result.snippet }}
            />
          ) : result.description ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-3">{result.description}</p>
          ) : null}
        </div>

        {/* Relevance Indicator */}
        {(result.score !== undefined) && (
          <div className="shrink-0 text-right">
            <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${getConfidenceColor(result.score)}`}>
              {getConfidenceLabel(result.score)}
            </div>
            <div className="text-xs text-gray-400 mt-1">Score: {(result.score * 100).toFixed(0)}%</div>
          </div>
        )}
      </div>
    </div>
  );
};
