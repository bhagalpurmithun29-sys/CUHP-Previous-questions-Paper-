import React, { useState } from 'react';
import { useCollections } from '../hooks/useCollections';
import { CollectionGrid } from '../components/CollectionGrid';
import { FiFolderPlus, FiCpu } from 'react-icons/fi';
import { SmartFolderBuilder } from '../components/SmartFolderBuilder';

export const CollectionsPage: React.FC = () => {
  const { collections, isLoading, createCollection, deleteCollection } = useCollections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSmartFolder, setIsSmartFolder] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', rules: [] });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCollection.mutateAsync({ ...formData, isSmart: isSmartFolder });
    setIsModalOpen(false);
    setFormData({ name: '', description: '', rules: [] });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      await deleteCollection.mutateAsync(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-sm"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            Collections & Folders
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Organize your study resources with smart folders and manual collections.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { setIsSmartFolder(false); setIsModalOpen(true); }}
            className="flex items-center px-4 py-2 font-medium bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <FiFolderPlus className="mr-2 text-blue-500" /> New Collection
          </button>
          <button 
            onClick={() => { setIsSmartFolder(true); setIsModalOpen(true); }}
            className="flex items-center px-4 py-2 font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FiCpu className="mr-2" /> New Smart Folder
          </button>
        </div>
      </div>

      <CollectionGrid collections={collections} onEdit={() => {}} onDelete={handleDelete} />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center">
                {isSmartFolder ? <><FiCpu className="mr-2 text-blue-500" /> Create Smart Folder</> : <><FiFolderPlus className="mr-2 text-blue-500" /> Create Collection</>}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl font-bold">&times;</button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Collection Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  placeholder={isSmartFolder ? "e.g., Computer Science Papers 2024" : "e.g., Exam Prep"}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none"
                  rows={2}
                />
              </div>

              {isSmartFolder && (
                <SmartFolderBuilder 
                  rules={formData.rules} 
                  onChange={rules => setFormData({...formData, rules})} 
                />
              )}
              
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" disabled={createCollection.isPending} className="px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {createCollection.isPending ? 'Creating...' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
