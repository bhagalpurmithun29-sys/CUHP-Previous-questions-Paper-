import React, { useState } from 'react';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { useNavigate } from 'react-router-dom';

export const CreateAnnouncementPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('UNIVERSITY_NOTICE');
  const [publishAt, setPublishAt] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const { createAnnouncement } = useAnnouncements();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAnnouncement.mutate(
      { title, content, type, publishAt, isPinned },
      { onSuccess: () => navigate('/announcements') }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
      <div className="max-w-[800px] mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Announcement</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input 
              required
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="UNIVERSITY_NOTICE">University Notice</option>
                <option value="DEPARTMENT_NOTICE">Department Notice</option>
                <option value="COURSE_CIRCULAR">Course Circular</option>
                <option value="EMERGENCY_ALERT">Emergency Alert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Scheduled Publish Time (Optional)</label>
              <input 
                type="datetime-local" 
                value={publishAt}
                onChange={(e) => setPublishAt(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message Content (HTML Supported)</label>
            <textarea 
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 font-mono text-sm" 
              placeholder="<h1>Main Heading</h1><p>Announcement text...</p>"
            />
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="pinned"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" 
            />
            <label htmlFor="pinned" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pin to top of announcement board
            </label>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/announcements')} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={createAnnouncement.isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              {createAnnouncement.isPending ? 'Publishing...' : 'Publish Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncementPage;
