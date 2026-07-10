import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModeration } from '../hooks/useModeration';
import { FiAlertTriangle, FiCheck, FiX, FiClock, FiUser, FiArrowLeft, FiMessageSquare } from 'react-icons/fi';

export const ReportPaperPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getReportById, assignModerator, approveReport, rejectReport, escalateReport } = useModeration();
  const { data: report, isLoading } = getReportById(id as string);
  
  const [resolutionNotes, setResolutionNotes] = useState('');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent shadow-sm"></div>
      </div>
    );
  }

  if (!report) {
    return <div className="p-8 text-center text-gray-500">Report not found.</div>;
  }

  const handleApprove = async () => {
    if (confirm('Are you sure you want to approve this report?')) {
      await approveReport.mutateAsync({ id: report._id, notes: resolutionNotes });
      navigate('/moderation');
    }
  };

  const handleReject = async () => {
    if (confirm('Are you sure you want to reject this report?')) {
      await rejectReport.mutateAsync({ id: report._id, notes: resolutionNotes });
      navigate('/moderation');
    }
  };

  const handleEscalate = async () => {
    const reason = prompt('Reason for escalation:');
    if (reason) {
      await escalateReport.mutateAsync({ id: report._id, reason });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <button onClick={() => navigate('/moderation')} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 font-medium transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Queue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 ${
                  report.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                  report.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                  report.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {report.priority} PRIORITY
                </span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{report.type.replace(/_/g, ' ')}</h1>
                <p className="text-sm text-gray-500 flex items-center">
                  <FiClock className="mr-1.5" /> Reported on {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${
                report.status === 'OPEN' ? 'border-yellow-200 bg-yellow-50 text-yellow-700' :
                report.status === 'RESOLVED' ? 'border-green-200 bg-green-50 text-green-700' :
                report.status === 'CLOSED' ? 'border-red-200 bg-red-50 text-red-700' : 'border-blue-200 bg-blue-50 text-blue-700'
              }`}>
                {report.status}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-5 mb-8 border border-gray-100 dark:border-gray-600">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{report.description}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Moderator Resolution</h3>
              <textarea
                value={resolutionNotes}
                onChange={e => setResolutionNotes(e.target.value)}
                placeholder="Enter internal resolution notes or reasoning..."
                className="w-full h-32 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-4 resize-none"
                disabled={report.status === 'RESOLVED' || report.status === 'CLOSED'}
              />
              
              {!(report.status === 'RESOLVED' || report.status === 'CLOSED') && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex justify-center items-center shadow-sm">
                    <FiCheck className="mr-2" /> Approve & Resolve
                  </button>
                  <button onClick={handleReject} className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg font-medium transition-colors flex justify-center items-center shadow-sm">
                    <FiX className="mr-2" /> Reject Report
                  </button>
                  <button onClick={handleEscalate} className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2.5 rounded-lg font-medium transition-colors flex justify-center items-center shadow-sm">
                    <FiAlertTriangle className="mr-2" /> Escalate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiUser className="mr-2 text-blue-500" /> Reporter Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 block mb-0.5">Name</span>
                <span className="font-medium text-gray-900 dark:text-white">{report.reporterId?.firstName} {report.reporterId?.lastName}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-0.5">Email</span>
                <span className="font-medium text-gray-900 dark:text-white break-all">{report.reporterId?.email}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Affected Paper</h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
              <h4 className="font-medium text-blue-600 dark:text-blue-400 line-clamp-2 mb-3">{report.paperId?.title}</h4>
              <button onClick={() => window.open(`/viewer/${report.paperId?._id}`, '_blank')} className="w-full text-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                View Paper in New Tab
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
