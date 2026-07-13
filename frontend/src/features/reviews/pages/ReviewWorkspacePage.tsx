import React from 'react';
import { DiscussionPanel } from '../components/DiscussionPanel';

export const ReviewWorkspacePage: React.FC = () => {
  // In a real scenario, this ID comes from URL params (e.g. useParams)
  const resourceId = 'mock_resource_id_for_demo';

  return (
    <div className="h-[calc(100vh-64px)] flex bg-gray-100 dark:bg-gray-950 overflow-hidden">
      
      {/* Mock Document/Resource Viewer Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center px-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Document Review Workspace</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 flex justify-center">
          <div className="w-[800px] h-[1000px] bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-12">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Computer Science - Midterm 2026</h1>
            <p className="text-gray-600 dark:text-gray-300">Document content goes here...</p>
          </div>
        </div>
      </div>

      {/* Collaboration / Review Panel */}
      <DiscussionPanel resourceId={resourceId} />

    </div>
  );
};

export default ReviewWorkspacePage;
