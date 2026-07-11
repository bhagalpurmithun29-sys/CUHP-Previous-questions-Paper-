import React from 'react';
import { DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface CitationPanelProps {
  citations: any[];
}

export const CitationPanel: React.FC<CitationPanelProps> = ({ citations }) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
      <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        <MagnifyingGlassIcon className="w-4 h-4" />
        Repository Sources Retrieved
      </h5>
      <div className="flex flex-wrap gap-2">
        {citations.map((citation, idx) => (
          <Link
            key={idx}
            to={citation.url || `/question-papers/${citation.paperId || citation.documentId || ''}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm transition-colors group"
          >
            <div className="bg-primary/10 text-primary w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold">
              {idx + 1}
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors max-w-[200px] truncate">
              {citation.title || citation.paperCode || 'Repository Document'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
