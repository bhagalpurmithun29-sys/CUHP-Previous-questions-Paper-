import React, { useState } from 'react';

interface ReportDialogProps {
  paperId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({ paperId, isOpen, onClose }) => {
  const [reportType, setReportType] = useState('WRONG_SUBJECT');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // fetch('/api/reports', { method: 'POST', body: JSON.stringify({ paperId, type: reportType, description }) })
      console.log('Submitted Report for', paperId);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
      }, 1000);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Report Issue</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Issue Type</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              required
            >
              <option value="WRONG_SUBJECT">Wrong Subject / Tagging</option>
              <option value="CORRUPTED_PDF">Corrupted PDF File</option>
              <option value="DUPLICATE_PAPER">Duplicate Paper</option>
              <option value="MISSING_PAGES">Missing Pages</option>
              <option value="LOW_QUALITY_SCAN">Low Quality / Unreadable Scan</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
              placeholder="Please provide details about the issue..."
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Screenshot (Optional)</label>
             <div className="border-2 border-dashed border-slate-300 rounded-md p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
               <span className="text-sm text-slate-500">Click to upload or drag & drop</span>
             </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
