import React, { useState } from 'react';
import { AuditTimeline } from '../../components/audit/AuditTimeline';

export const AuditLogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LOGS' | 'TIMELINE'>('LOGS');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Audit Logs</h1>
            <p className="text-slate-500 mt-1">Immutable record of all system activities and data mutations.</p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
              <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export Records
            </button>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['LOGS', 'TIMELINE'].map(tab => (
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

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
          <input type="text" placeholder="Search by User ID, IP, or Event..." className="flex-1 min-w-[200px] border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-700">
            <option>All Actions</option>
            <option>Authentication</option>
            <option>System Configuration</option>
            <option>Moderation</option>
          </select>
          <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-700">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>

        {activeTab === 'LOGS' ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Event Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Target Entity</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {[
                  { time: '2026-07-08 14:30:12', user: 'admin@cuhp.ac.in', role: 'ADMIN', action: 'SETTINGS_UPDATED', entity: 'Setting (maintenance_mode)' },
                  { time: '2026-07-08 13:15:00', user: 'mod_john@cuhp.ac.in', role: 'MODERATOR', action: 'PAPER_APPROVED', entity: 'QuestionPaper (64b...29f)' },
                  { time: '2026-07-08 11:02:45', user: 'student123@cuhp.ac.in', role: 'STUDENT', action: 'LOGIN', entity: 'AuthSession' },
                ].map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{log.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{log.user}</div>
                      <div className="text-xs text-slate-500">{log.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded bg-slate-100 text-slate-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{log.entity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">View JSON</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <AuditTimeline />
        )}

      </div>
    </div>
  );
};
