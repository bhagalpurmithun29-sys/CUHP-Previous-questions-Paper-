import React from 'react';

export const DocumentInfo: React.FC<{ paper: any }> = ({ paper }) => {
  if (!paper) return <div className="p-4 text-gray-500">No data</div>;

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">Information</h3>
      
      <div className="space-y-4 text-sm">
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Title</label>
          <p className="font-medium text-gray-900 dark:text-gray-100">{paper.title}</p>
        </div>
        
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Paper Code</label>
          <p className="text-gray-800 dark:text-gray-200">{paper.paperCode}</p>
        </div>

        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Academic Year</label>
          <p className="text-gray-800 dark:text-gray-200">{paper.academicYear} - {paper.examSession}</p>
        </div>
        
        <div>
          <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Course & Subject</label>
          <p className="text-gray-800 dark:text-gray-200">{paper.courseId?.name}</p>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{paper.subjectId?.name}</p>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Details</label>
          <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex justify-between"><span>Max Marks:</span> <span className="font-medium">{paper.maximumMarks}</span></li>
            <li className="flex justify-between"><span>Duration:</span> <span className="font-medium">{paper.durationMinutes} mins</span></li>
            <li className="flex justify-between"><span>Pages:</span> <span className="font-medium">{paper.pageCount}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
