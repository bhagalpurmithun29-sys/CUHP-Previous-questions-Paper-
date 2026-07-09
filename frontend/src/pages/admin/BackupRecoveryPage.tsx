import React, { useState } from 'react';

export const BackupRecoveryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BACKUPS' | 'SCHEDULE' | 'RESTORE'>('BACKUPS');
  const [isCreating, setIsCreating] = useState(false);

  const mockBackups = [
    { id: 'b1', filename: 'cuhp_backup_full_2026-07-08T00-00-00.archive', type: 'FULL', size: '1.2 GB', status: 'COMPLETED', date: 'Jul 8, 2026 12:00 AM' },
    { id: 'b2', filename: 'cuhp_backup_full_2026-07-01T00-00-00.archive', type: 'FULL', size: '1.1 GB', status: 'COMPLETED', date: 'Jul 1, 2026 12:00 AM' },
    { id: 'b3', filename: 'cuhp_backup_incremental_2026-07-07T00-00-00.archive', type: 'INCREMENTAL', size: '45 MB', status: 'FAILED', date: 'Jul 7, 2026 12:00 AM' },
  ];

  const handleCreateBackup = () => {
    setIsCreating(true);
    setTimeout(() => setIsCreating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Disaster Recovery & Backups</h1>
            <p className="text-slate-500 mt-1">Manage database snapshots, scheduled backups, and system restores.</p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleCreateBackup}
              disabled={isCreating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isCreating ? 'Creating Snapshot...' : 'Create Backup Now'}
            </button>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['BACKUPS', 'SCHEDULE', 'RESTORE'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </header>

        {activeTab === 'BACKUPS' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">Available Snapshots</h3>
              <span className="text-xs text-slate-500">Auto-retention set to 30 days.</span>
            </div>
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">File / Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mockBackups.map((backup) => (
                  <tr key={backup.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 font-mono">{backup.filename}</div>
                      <div className="text-xs text-slate-500">{backup.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 text-slate-700">
                        {backup.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        backup.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {backup.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                      <button className="text-red-600 hover:text-red-900 disabled:opacity-50" disabled={backup.status !== 'COMPLETED'}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'SCHEDULE' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-6">Automated Backup Schedule</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div>
                  <h4 className="font-medium text-slate-900">Daily Full Backups</h4>
                  <p className="text-sm text-slate-500 mt-1">Run a complete database dump every day at midnight.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-900">Retention Policy</h4>
                  <p className="text-sm text-slate-500 mt-1">Automatically delete backups older than this limit.</p>
                </div>
                <select className="border border-slate-300 rounded-md px-3 py-1.5 text-sm bg-white">
                  <option>7 Days</option>
                  <option selected>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'RESTORE' && (
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <h3 className="text-lg font-semibold text-red-800 border-b border-red-100 pb-4 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Disaster Recovery Wizard
            </h3>
            
            <p className="text-sm text-slate-600 mb-6">
              Restoring a backup will <strong>completely overwrite</strong> the current database state. The system will automatically be placed into Maintenance Mode during this process. All active sessions will be terminated.
            </p>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100 max-w-2xl">
              <label className="block text-sm font-medium text-red-900 mb-2">Select Target Snapshot</label>
              <select className="w-full border border-red-300 rounded-md px-3 py-2 text-sm bg-white mb-4">
                <option>cuhp_backup_full_2026-07-08T00-00-00.archive (1.2 GB)</option>
                <option>cuhp_backup_full_2026-07-01T00-00-00.archive (1.1 GB)</option>
              </select>
              
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                  Run Dry-Run Check
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                  Initiate System Restore
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
