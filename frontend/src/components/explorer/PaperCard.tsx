import React from 'react';
import { FiFileText, FiDownload, FiEye, FiBookmark, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import toast from 'react-hot-toast';

interface PaperCardProps {
  paper: any;
  viewMode: 'grid' | 'list' | 'compact';
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper, viewMode }) => {
  const { isAuthenticated } = useAuth();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to bookmark papers');
      return;
    }
    toast.success('Bookmarked successfully');
  };

  const handleDownload = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error('Please login to download papers');
      return;
    }
    // Proceed to download link
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-4">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
          <FiFileText className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Link to={`/papers/${paper._id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-1">
                {paper.title}
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{paper.subjectId?.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  {paper.subjectId?.code}
                </span>
                <FiCheckCircle className="w-4 h-4 text-green-500" title="Verified" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span>Course: {paper.courseId?.name}</span>
            <span>Sem: {paper.semesterId?.number}</span>
            <span>Year: {paper.academicYear}</span>
            <span className="capitalize">Type: {paper.examType?.toLowerCase()}</span>
            <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 sm:border-l border-gray-100 dark:border-gray-800 sm:pl-4">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1"><FiDownload /> {paper.downloadCount}</span>
            <span className="flex items-center gap-1"><FiEye /> {paper.viewCount}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleBookmark} className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors">
              <FiBookmark className="w-4 h-4" />
            </button>
            <a href={paper.fileUrl} target="_blank" rel="noreferrer" onClick={handleDownload} className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors">
              <FiDownload className="w-4 h-4" /> Download
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow flex flex-col h-full group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
          <FiFileText className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
          <FiDownload className="w-3 h-3" /> {paper.downloadCount}
        </div>
      </div>
      
      <Link to={`/papers/${paper._id}`} className="text-base font-bold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2 mb-1">
        {paper.title}
      </Link>
      
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{paper.subjectId?.name}</span>
        <FiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" title="Verified" />
      </div>
      
      <div className="mt-auto space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex justify-between">
          <span>Sem {paper.semesterId?.number}</span>
          <span>{paper.academicYear}</span>
        </div>
        <div className="flex justify-between">
          <span className="capitalize">{paper.examType?.toLowerCase()}</span>
          <span>{paper.subjectId?.code}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <button onClick={handleBookmark} className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-md transition-colors">
          <FiBookmark className="w-4 h-4" />
        </button>
        <a href={paper.fileUrl} target="_blank" rel="noreferrer" onClick={handleDownload} className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light flex items-center gap-1">
          Download <FiDownload className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
