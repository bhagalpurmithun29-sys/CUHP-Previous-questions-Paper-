import React, { useState } from 'react';
import { useModeration } from '../hooks/useModeration';
import { FiAlertTriangle } from 'react-icons/fi';

interface ReportDialogProps {
  paperId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({ paperId, isOpen, onClose }) => {
  const { createReport } = useModeration();
  const [type, setType] = useState('OTHER');
  const [description, setDescription] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createReport.mutateAsync({
      paperId,
      type,
      description,
      priority: 'LOW',
      status: 'OPEN'
    });
    alert('Report submitted successfully. Thank you for your feedback!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center">
            <FiAlertTriangle className="mr-2 text-red-500" /> Report Issue
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl font-bold">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Issue Type</label>
            <select 
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors py-2"
              required
            >
              <option value="INCORRECT_METADATA">Incorrect Metadata (Subject, Year, etc.)</option>
              <option value="DUPLICATE_PAPER">Duplicate Paper</option>
              <option value="LOW_QUALITY_SCAN">Low Quality Scan / Unreadable</option>
              <option value="MISSING_PAGES">Missing Pages</option>
              <option value="COPYRIGHT_CONCERN">Copyright Concern</option>
              <option value="BROKEN_DOWNLOAD">Broken Download</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
            <textarea 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Please provide details about the issue..."
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors resize-none p-3"
              rows={4}
              maxLength={1000}
            />
            <div className="text-right text-xs text-gray-500 mt-1">{description.length}/1000</div>
          </div>
          
          <div className="pt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" disabled={createReport.isPending} className="px-4 py-2 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm">
              {createReport.isPending ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
