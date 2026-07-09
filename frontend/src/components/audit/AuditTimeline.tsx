import React from 'react';

export const AuditTimeline: React.FC = () => {
  const events = [
    {
      id: 1,
      action: 'SETTINGS_UPDATED',
      desc: 'Super Admin updated max_upload_size from 20MB to 50MB.',
      date: 'Today, 2:30 PM',
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      )
    },
    {
      id: 2,
      action: 'PAPER_APPROVED',
      desc: 'Moderator John Doe approved Data Structures Mid Term PDF.',
      date: 'Today, 1:15 PM',
      icon: (
        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )
    },
    {
      id: 3,
      action: 'FAILED_LOGIN',
      desc: 'Failed login attempt from IP 192.168.1.45 (Invalid Credentials)',
      date: 'Yesterday, 11:02 AM',
      icon: (
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-800 mb-6">Recent System Activity</h3>
      
      <div className="relative border-l border-slate-200 ml-3 space-y-8">
        {events.map(event => (
          <div key={event.id} className="relative pl-6">
            <span className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 ring-4 ring-white border border-slate-200">
              {event.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">{event.action.replace(/_/g, ' ')}</span>
              <span className="text-sm text-slate-600 mt-1">{event.desc}</span>
              <span className="text-xs text-slate-400 mt-1">{event.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-8 w-full py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
        Load More Activity
      </button>
    </div>
  );
};
