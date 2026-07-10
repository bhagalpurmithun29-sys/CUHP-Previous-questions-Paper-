import React, { useState } from 'react';
import { useOCR } from '../hooks/useOCR';
import { OCRStatistics } from '../components/OCRStatistics';
import { FiMaximize, FiPlay } from 'react-icons/fi';

export const OCRDashboardPage: React.FC = () => {
  const { getStats, startOcr } = useOCR();
  const { data: stats, isLoading: isLoadingStats } = getStats;
  const [testPaperId, setTestPaperId] = useState('');

  const handleManualTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPaperId) return;
    try {
      await startOcr.mutateAsync(testPaperId);
      alert('OCR Job queued successfully. The background worker is processing it.');
      setTestPaperId('');
    } catch (err) {
      alert('Failed to queue job. Check paper ID.');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
          <span className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mr-3.5 border border-indigo-100 dark:border-indigo-800">
            <FiMaximize className="text-indigo-600 dark:text-indigo-400" size={26} />
          </span>
          OCR Processing Pipeline
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
          Monitor the text extraction engine, review low-confidence OCR results, and track processing throughput.
        </p>
      </div>

      {isLoadingStats ? (
        <div className="animate-pulse h-36 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-10"></div>
      ) : (
        <OCRStatistics stats={stats} />
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Manual Job Trigger</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Force an immediate OCR scan on a specific document by providing its ID.</p>
        
        <form onSubmit={handleManualTrigger} className="flex flex-col sm:flex-row gap-4 max-w-xl">
          <input 
            type="text" 
            placeholder="Enter Question Paper Object ID" 
            value={testPaperId}
            onChange={(e) => setTestPaperId(e.target.value)}
            className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            required
          />
          <button 
            type="submit" 
            disabled={startOcr.isPending}
            className="flex justify-center items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm whitespace-nowrap"
          >
            <FiPlay className="mr-2" /> {startOcr.isPending ? 'Queuing...' : 'Run OCR'}
          </button>
        </form>
      </div>
    </div>
  );
};
