import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiCheckCircle } from 'react-icons/fi';

export const BulkImportWizard: React.FC<{ onImport: (data: any) => void, isLoading: boolean }> = ({ onImport, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (file) {
          onImport({ fileName: file.name, size: file.size });
      }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 mr-4">
              <FiUploadCloud size={24} />
          </div>
          <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bulk Import</h3>
              <p className="text-sm text-gray-500">Upload ZIP package with PDFs and metadata CSV.</p>
          </div>
      </div>
      
      <form onSubmit={handleSubmit}>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-10 flex flex-col items-center justify-center mb-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative">
              <FiFile size={40} className="text-gray-400 mb-4" />
              {file ? (
                  <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
              ) : (
                  <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">ZIP, CSV, or Excel (max. 5GB)</p>
                  </div>
              )}
              <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  id="import-file" 
                  accept=".zip,.csv,.xlsx" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
          </div>
          
          <button 
            type="submit" 
            disabled={!file || isLoading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50 flex justify-center items-center"
          >
              {isLoading ? 'Processing Import...' : <><FiCheckCircle className="mr-2" /> Start Bulk Import</>}
          </button>
      </form>
    </div>
  );
};
