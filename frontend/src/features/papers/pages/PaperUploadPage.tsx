import React from 'react';
import { UploadWizard } from '../components/UploadWizard';
import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';

export const PaperUploadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Contribute to the Question Bank
          </h1>
          <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
            Upload previous year question papers to help your peers. All uploads are reviewed by moderators before being published.
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4"
        >
          <div className="flex-shrink-0 mt-1">
            <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Upload Guidelines</h4>
            <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
              <li>Ensure the scanned document is legible and upright.</li>
              <li>Only original university question papers are accepted.</li>
              <li>Do not upload copyrighted notes or textbooks.</li>
              <li>Maximum file size is 20MB. Format must be PDF.</li>
            </ul>
          </div>
        </motion.div>

        {/* Wizard Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <UploadWizard />
        </motion.div>

      </div>
    </div>
  );
};
