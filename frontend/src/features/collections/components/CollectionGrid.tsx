import React from 'react';
import { CollectionCard } from './CollectionCard';

export const CollectionGrid: React.FC<{ collections: any[], onEdit: (id: string) => void, onDelete: (id: string) => void }> = ({ collections, onEdit, onDelete }) => {
  if (!collections || collections.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No collections yet</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Create a smart folder or a manual collection to organize your study materials.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {collections.map(collection => (
        <CollectionCard 
          key={collection._id} 
          collection={collection} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};
