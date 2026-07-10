import React, { useState } from 'react';
import { useAIMetadata } from '../hooks/useAIMetadata';
import { FiCpu, FiPlay, FiCheckCircle, FiSearch } from 'react-icons/fi';

export const AIMetadataDashboardPage: React.FC = () => {
  const { getStats, getMetadata, processMetadata, reviewMetadata } = useAIMetadata();
  const { data: stats, isLoading: isLoadingStats } = getStats;
  const [testPaperId, setTestPaperId] = useState('');
  const [activePaperId, setActivePaperId] = useState('');
  const { data: activeMetadata, isLoading: isLoadingMetadata } = getMetadata(activePaperId);

  const handleManualTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPaperId) return;
    try {
      await processMetadata.mutateAsync(testPaperId);
      setActivePaperId(testPaperId);
      setTestPaperId('');
    } catch (err) {
      alert('Failed to queue job. Check paper ID.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (testPaperId) setActivePaperId(testPaperId);
  };

  const handleReview = async () => {
      if(!activeMetadata) return;
      try {
          const acceptedSuggestions = {
              title: activeMetadata.suggestions?.title?.value,
              examYear: activeMetadata.suggestions?.academicYear?.value
          };
          await reviewMetadata.mutateAsync({ paperId: activePaperId, acceptedSuggestions });
      } catch (e) {
          alert('Failed to approve metadata.');
      }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
          <span className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mr-3.5 border border-indigo-100 dark:border-indigo-800">
            <FiCpu className="text-indigo-600 dark:text-indigo-400" size={26} />
          </span>
          AI Metadata & Intelligence Engine
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
          Monitor the AI Extraction pipeline, review suggested document metadata, and approve changes to the repository.
        </p>
      </div>

      {!isLoadingStats && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Processed</p>
                <h3 className="text-3xl font-bold mt-2 text-blue-600 dark:text-blue-500">{stats.completed}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Needs Review</p>
                <h3 className="text-3xl font-bold mt-2 text-amber-500 dark:text-amber-400">{stats.needsReview}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approved</p>
                <h3 className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-500">{stats.reviewed}</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Failed</p>
                <h3 className="text-3xl font-bold mt-2 text-rose-600 dark:text-rose-500">{stats.failed}</h3>
            </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Paper Lookup & Processing</h2>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <input 
            type="text" 
            placeholder="Enter Question Paper Object ID" 
            value={testPaperId}
            onChange={(e) => setTestPaperId(e.target.value)}
            className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
            required
          />
          <button 
            type="button" 
            onClick={handleSearch}
            className="flex justify-center items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            <FiSearch className="mr-2" /> View
          </button>
          <button 
            type="button" 
            onClick={handleManualTrigger}
            disabled={processMetadata.isPending}
            className="flex justify-center items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 shadow-sm whitespace-nowrap"
          >
            <FiPlay className="mr-2" /> {processMetadata.isPending ? 'Queuing...' : 'Run Extraction'}
          </button>
        </form>
      </div>

      {activePaperId && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Analysis Results</h2>
            {activeMetadata && (
                <span className={`px-3 py-1 text-sm font-bold rounded-lg ${activeMetadata.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : activeMetadata.status === 'NEEDS_REVIEW' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {activeMetadata.status}
                </span>
            )}
          </div>
          
          <div className="p-8">
            {isLoadingMetadata ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            ) : !activeMetadata ? (
                <div className="text-center py-10 text-gray-500">No metadata found for this document. Try running extraction.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Metadata Suggestions</h3>
                        <div className="space-y-4">
                            {Object.entries(activeMetadata.suggestions || {}).map(([key, val]: any) => val && (
                                <div key={key} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">{key}</div>
                                    <div className="font-semibold text-gray-900 dark:text-white text-lg">{val.value}</div>
                                    <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 dark:bg-emerald-900/20 inline-block px-2 py-1 rounded">
                                        Confidence: {val.confidence}%
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!activeMetadata.moderatorReviewed && (
                             <button onClick={handleReview} disabled={reviewMetadata.isPending} className="mt-8 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50">
                                {reviewMetadata.isPending ? 'Approving...' : 'Approve & Update Repository'}
                             </button>
                        )}
                        {activeMetadata.moderatorReviewed && (
                             <div className="mt-8 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold flex items-center justify-center">
                                 <FiCheckCircle className="mr-2" size={20} /> Metadata Approved
                             </div>
                        )}
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Document Intelligence</h3>
                        <div className="space-y-8">
                            <div>
                                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Keywords</div>
                                <div className="flex flex-wrap gap-2">
                                    {activeMetadata.intelligence?.keywords?.map((kw: string) => (
                                        <span key={kw} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-lg text-sm font-semibold border border-indigo-100 dark:border-indigo-800 shadow-sm">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Topics & Learning Areas</div>
                                <div className="flex flex-wrap gap-2">
                                    {activeMetadata.intelligence?.topics?.map((topic: string) => (
                                        <span key={topic} className="px-3 py-1.5 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-lg text-sm font-semibold border border-blue-100 dark:border-blue-800 shadow-sm">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-inner">
                                <div className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-2 uppercase tracking-widest">Overall AI Confidence</div>
                                <div className="text-5xl font-black text-indigo-700 dark:text-indigo-400 drop-shadow-sm">{activeMetadata.overallConfidence}%</div>
                                <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 mt-3 font-semibold">Generated by Document Intelligence Engine v2.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
