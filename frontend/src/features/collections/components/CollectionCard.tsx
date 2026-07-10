import React from 'react';
import { FiFolder, FiCpu, FiMoreVertical, FiPaperclip } from 'react-icons/fi';

interface CollectionCardProps {
  collection: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onEdit, onDelete }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group relative cursor-pointer overflow-hidden"
      style={{ borderTop: `4px solid ${collection.color || '#3B82F6'}` }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700" style={{ color: collection.color || '#3B82F6' }}>
            {collection.isSmart ? <FiCpu size={24} /> : <FiFolder size={24} />}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(collection._id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500">
              <FiMoreVertical />
            </button>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">{collection.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 min-h-[40px]">
          {collection.description || 'No description provided.'}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm font-medium">
          <span className="text-gray-500 flex items-center">
            <FiPaperclip className="mr-1.5" />
            {collection.paperCount || collection.paperIds?.length || 0} Items
          </span>
          {collection.isSmart && (
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
              Smart Folder
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
