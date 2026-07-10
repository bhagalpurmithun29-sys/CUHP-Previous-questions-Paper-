import React, { useState } from 'react';
import { FiBookmark } from 'react-icons/fi';
import { useBookmarks } from '../hooks/useBookmarks';

interface BookmarkButtonProps {
  paperId: string;
  pageNumber?: number;
  className?: string;
  iconOnly?: boolean;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ paperId, pageNumber, className = '', iconOnly = false }) => {
  const { addBookmark, bookmarks, removeBookmark } = useBookmarks();
  
  const existingBookmark = bookmarks?.find((b: any) => 
    b.paperId?._id === paperId && 
    (pageNumber ? b.pageNumber === pageNumber : b.type === 'PAPER')
  );

  const [isHovered, setIsHovered] = useState(false);

  const toggleBookmark = () => {
    if (existingBookmark) {
      removeBookmark.mutate(existingBookmark._id);
    } else {
      addBookmark.mutate({
        paperId,
        type: pageNumber ? 'PAGE' : 'PAPER',
        pageNumber,
        note: '',
        tags: []
      });
    }
  };

  return (
    <button 
      onClick={toggleBookmark}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center transition-colors ${existingBookmark ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400'} ${className}`}
      title={existingBookmark ? "Remove Bookmark" : "Add Bookmark"}
    >
      <FiBookmark className={existingBookmark ? "fill-current" : (isHovered ? "fill-blue-100 dark:fill-blue-900/40" : "")} />
      {!iconOnly && <span className="ml-2 font-medium text-sm">{existingBookmark ? 'Bookmarked' : 'Bookmark'}</span>}
    </button>
  );
};
