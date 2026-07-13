import React from 'react';
import { ReadAcknowledgements } from './ReadAcknowledgements';

interface AnnouncementCardProps {
  announcement: any;
  onAcknowledge: (id: string) => void;
  isAdmin?: boolean;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, onAcknowledge, isAdmin }) => {
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EMERGENCY_ALERT': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200';
      case 'UNIVERSITY_NOTICE': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
      case 'COURSE_CIRCULAR': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-xl border bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow \${announcement.isPinned ? 'border-l-4 border-l-orange-500' : 'border-gray-200 dark:border-gray-800'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {announcement.isPinned && (
            <span className="text-orange-500" title="Pinned Announcement">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
            </span>
          )}
          <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border \${getTypeColor(announcement.type)}`}>
            {announcement.type.replace('_', ' ')}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {new Date(announcement.publishAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        
        {isAdmin && <ReadAcknowledgements readCount={announcement.readCount} />}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{announcement.title}</h3>
      
      <div 
        className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 mb-6"
        dangerouslySetInnerHTML={{ __html: announcement.content }} 
      />

      {announcement.attachments?.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {announcement.attachments.map((file: any, i: number) => (
            <a key={i} href={file.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-indigo-600 hover:text-indigo-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
              {file.name}
            </a>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="text-xs text-gray-500">
          Posted by <span className="font-semibold">{announcement.authorId?.firstName} {announcement.authorId?.lastName}</span>
        </div>
        
        {!isAdmin && (
          <button 
            onClick={() => onAcknowledge(announcement._id)}
            className="px-4 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 rounded-lg text-sm font-semibold transition-colors"
          >
            Acknowledge Receipt
          </button>
        )}
      </div>
    </div>
  );
};
