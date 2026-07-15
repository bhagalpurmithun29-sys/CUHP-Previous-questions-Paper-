import React, { useRef } from 'react';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import { useUploadStore } from '../store/upload.store';
import { toast } from 'react-hot-toast';

export const DropZone: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, setFile, nextStep } = useUploadStore();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Only PDF, JPEG, and JPG files are allowed.');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }
    setFile(selectedFile);
    // Automatically proceed to next step upon valid upload
    setTimeout(nextStep, 600);
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center text-center
          ${data.file ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !data.file && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleChange} 
          accept="application/pdf, image/jpeg, image/jpg" 
          className="hidden" 
        />
        
        {data.file ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data.file.name}</h3>
            <p className="text-gray-500 mt-2">
              {(data.file.size / (1024 * 1024)).toFixed(2)} MB • {data.file.type.split('/')[1].toUpperCase()} Document
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null as any); }}
              className="mt-6 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Replace File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FiUploadCloud className="w-16 h-16 text-gray-400 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Drag & drop your Question Paper</h3>
            <p className="text-gray-500 mt-2 mb-6 max-w-sm">
              Support for high-resolution PDF and JPEG documents up to 5MB. Ensure pages are clearly legible.
            </p>
            <span className="px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-sm hover:bg-primary-dark transition-colors">
              Browse Files
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
