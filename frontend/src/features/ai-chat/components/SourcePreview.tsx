import React from 'react';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SourcePreviewProps {
  snippet: string;
  documentTitle: string;
}

export const SourcePreview: React.FC<SourcePreviewProps> = ({ snippet, documentTitle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mt-2 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <DocumentMagnifyingGlassIcon className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{documentTitle}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-primary/30 pl-2 line-clamp-3">
        "{snippet}"
      </p>
    </div>
  );
};
