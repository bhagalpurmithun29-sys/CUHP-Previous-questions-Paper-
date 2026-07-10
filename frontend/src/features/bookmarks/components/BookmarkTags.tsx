import React, { useState } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { FiTag, FiPlus, FiX } from 'react-icons/fi';

interface BookmarkTagsProps {
  bookmarkId: string;
  tags: string[];
}

export const BookmarkTags: React.FC<BookmarkTagsProps> = ({ bookmarkId, tags = [] }) => {
  const { updateBookmark } = useBookmarks();
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      const updatedTags = [...new Set([...tags, newTag.trim()])];
      updateBookmark.mutate({ id: bookmarkId, data: { tags: updatedTags } });
      setNewTag('');
      setIsAdding(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(t => t !== tagToRemove);
    updateBookmark.mutate({ id: bookmarkId, data: { tags: updatedTags } });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-2">
      {tags.map((tag, i) => (
        <span key={i} className="flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded font-medium border border-gray-200 dark:border-gray-600">
          <FiTag className="mr-1 text-gray-500" size={10} />
          {tag}
          <button onClick={() => removeTag(tag)} className="ml-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <FiX size={12} />
          </button>
        </span>
      ))}
      
      {isAdding ? (
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAdd}
          onBlur={() => setIsAdding(false)}
          placeholder="New tag..."
          className="text-xs px-2 py-1 border border-blue-300 rounded outline-none w-24 shadow-sm"
          autoFocus
        />
      ) : (
        <button onClick={() => setIsAdding(true)} className="flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded border border-dashed border-blue-300 dark:border-blue-700 transition-colors">
          <FiPlus className="mr-1" /> Add Tag
        </button>
      )}
    </div>
  );
};
