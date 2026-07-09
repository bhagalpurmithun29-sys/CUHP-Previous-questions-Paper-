import React, { useState } from 'react';

export const NotificationCenterUI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNREAD'>('ALL');

  // Placeholder data representing the Notification Schema
  const notifications = [
    {
      id: '1',
      type: 'PAPER_APPROVED',
      title: 'Your paper was approved!',
      message: 'DBMS Mid Term 2024 has passed moderation and is now public.',
      isRead: false,
      createdAt: '2 hours ago',
      icon: (
        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
    {
      id: '2',
      type: 'SYSTEM_ANNOUNCEMENT',
      title: 'Scheduled Maintenance',
      message: 'The Question Bank will be offline for 30 mins this Sunday at 2 AM.',
      isRead: true,
      createdAt: '1 day ago',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
    {
      id: '3',
      type: 'REPORT_RESOLVED',
      title: 'Report Resolved',
      message: 'The issue you reported on Operating Systems End Term has been fixed. Thank you!',
      isRead: false,
      createdAt: '2 days ago',
      icon: (
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      )
    }
  ];

  const displayList = activeTab === 'UNREAD' ? notifications.filter(n => !n.isRead) : notifications;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      {/* Bell Icon Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[80vh]">
          
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-semibold text-slate-800">Notifications</h3>
            <div className="flex gap-2 text-xs">
              <button 
                onClick={() => setActiveTab('ALL')}
                className={`px-2 py-1 rounded ${activeTab === 'ALL' ? 'bg-white shadow-sm font-medium text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('UNREAD')}
                className={`px-2 py-1 rounded flex items-center ${activeTab === 'UNREAD' ? 'bg-white shadow-sm font-medium text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Unread <span className="ml-1 bg-blue-100 text-blue-600 px-1.5 rounded-full text-[10px] font-bold">{unreadCount}</span>
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {displayList.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No notifications found.
              </div>
            ) : (
              displayList.map(n => (
                <div key={n.id} className={`p-3 rounded-lg flex gap-3 items-start transition-colors cursor-pointer hover:bg-slate-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                  <div className="mt-1 flex-shrink-0">
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.isRead ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                      {n.createdAt}
                    </p>
                  </div>
                  {!n.isRead && (
                    <button className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2" title="Mark as read"></button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs">
            <button className="font-medium text-slate-500 hover:text-slate-800 transition-colors">
              Mark all as read
            </button>
            <button className="font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center">
              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
