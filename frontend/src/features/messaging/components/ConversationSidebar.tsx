import React, { useState } from 'react';
import { OnlineStatus } from './OnlineStatus';

export const ConversationSidebar: React.FC<{ conversations: any[], activeId: string, setActive: (id: string) => void }> = ({ conversations, activeId, setActive }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search conversations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
          <svg className="w-5 h-5 absolute left-3 top-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.map(conv => (
          <div 
            key={conv._id} 
            onClick={() => setActive(conv._id)}
            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors flex gap-3 items-center \${activeId === conv._id ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                {conv.type === 'GROUP' ? 'G' : conv.participants[0]?.firstName?.[0]}
              </div>
              <div className="absolute bottom-0 right-0">
                <OnlineStatus isOnline={true} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {conv.type === 'GROUP' ? conv.name : `\${conv.participants[0]?.firstName} \${conv.participants[0]?.lastName}`}
                </h4>
                <span className="text-xs text-gray-500">
                  {new Date(conv.lastMessageAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {conv.lastMessagePreview || 'No messages yet.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
