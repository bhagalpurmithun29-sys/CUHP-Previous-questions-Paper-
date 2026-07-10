import React, { useState } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import { FiList, FiPlus, FiMoreVertical } from 'react-icons/fi';

export const ReadingLists: React.FC = () => {
  const { readingLists, createList } = useBookmarks();
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreate = async () => {
    if (newListName.trim()) {
      await createList.mutateAsync({ name: newListName });
      setNewListName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wider flex items-center">
          <FiList className="mr-2" /> My Lists
        </h3>
        <button onClick={() => setIsCreating(!isCreating)} className="p-1 rounded text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
          <FiPlus />
        </button>
      </div>
      
      {isCreating && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/30 flex space-x-2">
          <input 
            type="text" 
            value={newListName} 
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="List name..." 
            className="flex-1 px-3 py-1.5 text-sm border border-blue-200 dark:border-blue-800/50 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button onClick={handleCreate} className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save</button>
        </div>
      )}

      <ul className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {readingLists?.map((list: any) => (
          <li key={list._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 flex justify-between items-center cursor-pointer transition-colors group">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{list.name}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{list.bookmarks?.length || 0} items</p>
            </div>
            <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              <FiMoreVertical size={16} />
            </button>
          </li>
        ))}
        {readingLists?.length === 0 && !isCreating && (
          <li className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
            No reading lists created yet. Click the + icon to start organizing.
          </li>
        )}
      </ul>
    </div>
  );
};
