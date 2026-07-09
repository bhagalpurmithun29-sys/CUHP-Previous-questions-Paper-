import React from 'react';

export const ProfileActivity: React.FC = () => {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {[
          { text: 'Downloaded CS201 Question Paper', date: '2 hours ago', icon: <DocumentArrowDownIcon className="w-5 h-5" /> },
          { text: 'Completed Onboarding Wizard', date: '1 day ago', icon: <CheckCircleIcon className="w-5 h-5 text-success" /> },
          { text: 'Logged in from Mac OS (Chrome)', date: '1 day ago', icon: <DeviceDesktopIcon className="w-5 h-5" /> }
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
            <div className="mt-0.5 text-muted-foreground">{item.icon}</div>
            <div>
              <p className="text-sm font-medium">{item.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple placeholder icons to avoid extra imports for mock data
const DocumentArrowDownIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CheckCircleIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DeviceDesktopIcon = ({ className }: { className: string }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
