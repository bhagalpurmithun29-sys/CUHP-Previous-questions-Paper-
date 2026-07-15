import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiEye, FiClock, FiUser, FiFileText } from 'react-icons/fi';
import { usePendingPapers, useApprovedPapers, useReviewPaper } from '../hooks/useModeration';
import { useAuth } from '../../auth/hooks/useAuth';
import { UserRole } from '../../../constants';

export default function ReviewUploadsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [page, setPage] = useState(1);

  const { data: pendingData, isLoading: isLoadingPending } = usePendingPapers(page, 10);
  const { data: approvedData, isLoading: isLoadingApproved } = useApprovedPapers(page, 10);
  
  const { mutate: reviewPaper, isPending: isReviewing } = useReviewPaper();

  const handleApprove = (id: string) => {
    if (window.confirm('Are you sure you want to approve this paper?')) {
      reviewPaper({ paperId: id, status: 'APPROVED' });
    }
  };

  const handleReject = (id: string) => {
    if (window.confirm('Are you sure you want to reject this paper?')) {
      reviewPaper({ paperId: id, status: 'REJECTED' });
    }
  };

  const activeData = activeTab === 'pending' ? pendingData?.data : approvedData?.data;
  const isLoading = activeTab === 'pending' ? isLoadingPending : isLoadingApproved;
  const totalPages = activeTab === 'pending' ? pendingData?.pagination?.totalPages : approvedData?.pagination?.totalPages;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Moderation Queue</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Review and manage uploaded question papers.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => { setActiveTab('pending'); setPage(1); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'pending' 
                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Pending Review
          </button>
          <button
            onClick={() => { setActiveTab('approved'); setPage(1); }}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'approved' 
                ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Recently Approved
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !activeData || activeData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <FiFileText className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">No papers found</p>
            <p className="text-sm">Queue is completely empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <th className="p-4 whitespace-nowrap">Paper Details</th>
                  <th className="p-4 whitespace-nowrap">Subject / Course</th>
                  <th className="p-4 whitespace-nowrap">Uploader</th>
                  {activeTab === 'approved' && user?.role === UserRole.ADMIN && (
                    <th className="p-4 whitespace-nowrap">Approved By</th>
                  )}
                  <th className="p-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {activeData.map((paper: any) => (
                  <tr key={paper._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                          <FiFileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">{paper.title}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{paper.paperCode}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><FiClock className="w-3 h-3" /> {paper.academicYear}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{paper.subjectId?.subjectName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{paper.courseId?.courseName}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                          <FiUser className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{paper.uploaderId?.name || paper.uploaderId?.email}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(paper.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    
                    {activeTab === 'approved' && user?.role === UserRole.ADMIN && (
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                            <FiCheckCircle className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {paper.approverId ? (paper.approverId.firstName ? `${paper.approverId.firstName} ${paper.approverId.lastName || ''}` : paper.approverId.email) : 'System Admin'}
                            </p>
                          </div>
                        </div>
                      </td>
                    )}
                    
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={`/viewer/${paper._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors tooltip-trigger"
                          title="View PDF"
                        >
                          <FiEye className="w-5 h-5" />
                        </a>
                        
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(paper._id)}
                              disabled={isReviewing}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <FiCheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleReject(paper._id)}
                              disabled={isReviewing}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <FiXCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm font-medium text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
