import React from 'react';
import { BookmarkButton } from './BookmarkButton';

interface PageBookmarkProps {
  paperId: string;
  pageNumber: number;
}

export const PageBookmark: React.FC<PageBookmarkProps> = ({ paperId, pageNumber }) => {
  return (
    <div className="absolute top-2 right-2 z-10 bg-white/90 dark:bg-gray-800/90 p-1.5 rounded-lg shadow-sm backdrop-blur-sm border border-gray-200 dark:border-gray-700">
      <BookmarkButton paperId={paperId} pageNumber={pageNumber} iconOnly />
    </div>
  );
};
