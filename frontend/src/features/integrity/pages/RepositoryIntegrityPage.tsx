import React, { useState } from 'react';
import { useRepositoryIntegrity } from '../hooks/useRepositoryIntegrity';
import { RepositoryHealth } from '../components/RepositoryHealth';
import { FiShield, FiCheck, FiGitMerge } from 'react-icons/fi';

export const RepositoryIntegrityPage: React.FC = () => {
  const { healthData, isLoadingHealth, getDuplicates, mergePapers } = useRepositoryIntegrity();
  const [page] = useState(1);
  const { data: duplicateData, isLoading: isLoadingDups } = getDuplicates(page, false);

  const handleMerge = async (reportId: string) => {
    if (confirm('Merge these papers? The newer upload will be archived and references combined.')) {
      await mergePapers.mutateAsync({ reportId, notes: 'Merged via Integrity Dashboard' });
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
          <span className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mr-3.5 border border-indigo-100 dark:border-indigo-800">
            <FiShield className="text-indigo-600 dark:text-indigo-400" size={26} />
          </span>
          Repository Integrity Engine
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg max-w-3xl leading-relaxed">
          Monitor global repository health, automatically detect duplicate uploads, and resolve metadata conflicts to ensure a single source of truth.
        </p>
      </div>

      {isLoadingHealth ? (
        <div className="animate-pulse h-36 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-10"></div>
      ) : (
        <RepositoryHealth healthData={healthData} />
      )}

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Duplicate Detection Queue</h2>
        </div>
        
        {isLoadingDups ? (
          <div className="p-16 text-center text-gray-500 font-medium">Scanning repository via background jobs...</div>
        ) : !duplicateData?.reports || duplicateData.reports.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FiCheck className="text-4xl text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Repository is Clean</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Zero duplicates detected across the network.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-8 py-5">Severity</th>
                  <th className="px-8 py-5">Incoming Upload</th>
                  <th className="px-8 py-5">Matched Record</th>
                  <th className="px-8 py-5">Confidence</th>
                  <th className="px-8 py-5 text-right">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {duplicateData.reports.map((report: any) => (
                  <tr key={report._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors group">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm border ${
                        report.detectionLevel === 'EXACT_DUPLICATE' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:border-rose-800' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800'
                      }`}>
                        {report.detectionLevel.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1 truncate max-w-[200px]">{report.newPaper?.title || 'Unknown Title'}</div>
                      <div className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-700 inline-block px-2 py-0.5 rounded">{report.newPaper?.checksum?.substring(0,8)}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1 truncate max-w-[200px]">{report.matchedPaper?.title || 'Unknown Title'}</div>
                      <div className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-700 inline-block px-2 py-0.5 rounded">{report.matchedPaper?.checksum?.substring(0,8)}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden shadow-inner">
                          <div className={`h-2.5 rounded-full ${report.similarityScore > 90 ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${report.similarityScore}%` }}></div>
                        </div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">{report.similarityScore}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleMerge(report._id)}
                        disabled={mergePapers.isPending}
                        className="inline-flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 text-white font-semibold rounded-xl text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50"
                      >
                        <FiGitMerge className="mr-2" /> {mergePapers.isPending ? 'Merging...' : 'Merge'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
