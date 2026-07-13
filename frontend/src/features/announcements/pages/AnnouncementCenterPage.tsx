import React, { useState } from 'react';
import { useAnnouncements } from '../hooks/useAnnouncements';
import { AnnouncementFilters } from '../components/AnnouncementFilters';
import { AnnouncementList } from '../components/AnnouncementList';

export const AnnouncementCenterPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  
  const queryParams = filter === 'ALL' ? {} : { type: filter };
  
  // We mock the role check here for demonstration.
  // In a real app, use the auth hook `useAuth()`.
  const isAdmin = true; 

  const { announcements, isLoading, acknowledgeAnnouncement } = useAnnouncements(queryParams);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Announcements</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Official circulars, notices, and updates from the university.</p>
            </div>
            {isAdmin && (
              <a href="/admin/announcements/create" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                + New Announcement
              </a>
            )}
          </div>
          
          <AnnouncementFilters filter={filter} setFilter={setFilter} />
        </header>

        <AnnouncementList 
          announcements={announcements} 
          isLoading={isLoading} 
          onAcknowledge={(id) => acknowledgeAnnouncement.mutate(id)}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default AnnouncementCenterPage;
