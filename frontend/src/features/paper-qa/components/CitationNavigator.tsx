import React from 'react';

interface Citation {
  title: string;
  page: number;
  question?: string;
  reference?: string;
  confidence: number;
}

interface CitationNavigatorProps {
  citations: Citation[];
  onCitationClick: (page: number) => void;
}

export const CitationNavigator: React.FC<CitationNavigatorProps> = ({ citations, onCitationClick }) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sources & Citations</h4>
      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
        {citations.map((cite, idx) => (
          <div 
            key={idx}
            onClick={() => onCitationClick(cite.page)}
            className="flex flex-col gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Page {cite.page}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cite.confidence > 0.8 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                {Math.round(cite.confidence * 100)}% Match
              </span>
            </div>
            {cite.reference && (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic line-clamp-1">"{cite.reference}"</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
