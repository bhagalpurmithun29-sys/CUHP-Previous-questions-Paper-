import React, { useState } from 'react';

export const ReportQueuePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('OPEN');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">QA & Moderation Queue</h1>
            <p className="text-slate-500 mt-1">Manage, assign, and resolve student-reported issues.</p>
          </div>
          
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
            {['OPEN', 'ASSIGNED', 'RESOLVED'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
        </header>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
          <input type="text" placeholder="Search by paper title or ID..." className="flex-1 min-w-[200px] border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Assignees</option>
            <option>Unassigned</option>
            <option>Me</option>
          </select>
        </div>

        {/* Queue List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Target Paper</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assignee</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {/* Dummy row 1 */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">Wrong Subject Tag</span>
                    <span className="text-xs text-slate-500 truncate max-w-xs">This paper says MCA but it looks like BCA...</span>
                    <span className="text-xs text-slate-400 mt-1">Rep. by John Doe • 2h ago</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    <a href="#" className="text-sm text-blue-600 hover:underline">DBMS Mid Term 2024</a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-6 py-4">
                   <span className="text-sm text-slate-500 italic">Unassigned</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Review</button>
                </td>
              </tr>
              {/* Dummy row 2 */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">Corrupted PDF</span>
                    <span className="text-xs text-slate-500 truncate max-w-xs">Page 3 is entirely blacked out.</span>
                    <span className="text-xs text-slate-400 mt-1">Rep. by Jane Smith • 5h ago</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Operating Systems End Term</a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Medium
                  </span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center">
                     <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mr-2">M</div>
                     <span className="text-sm text-slate-700">Moderator 1</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Continue</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
