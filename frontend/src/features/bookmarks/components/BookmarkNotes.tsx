import React, { useState } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { FiEdit3, FiCheck } from 'react-icons/fi';

interface BookmarkNotesProps {
  bookmarkId: string;
  initialNote?: string;
}

export const BookmarkNotes: React.FC<BookmarkNotesProps> = ({ bookmarkId, initialNote = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(initialNote);
  const { updateBookmark } = useBookmarks();

  const handleSave = () => {
    updateBookmark.mutate({ id: bookmarkId, data: { note } });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="group flex items-start cursor-pointer w-full" onClick={() => setIsEditing(true)}>
        <p className={`text-sm ${note ? 'text-gray-700 dark:text-gray-300 italic' : 'text-gray-400'}`}>
          {note || 'Add a note...'}
        </p>
        <FiEdit3 className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 mt-2 w-full">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 text-sm border border-blue-300 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/10 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner"
        rows={2}
        autoFocus
      />
      <div className="flex justify-end space-x-2">
        <button onClick={() => setIsEditing(false)} className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Cancel</button>
        <button onClick={handleSave} className="flex items-center text-xs font-medium bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          <FiCheck className="mr-1" /> Save
        </button>
      </div>
    </div>
  );
};
