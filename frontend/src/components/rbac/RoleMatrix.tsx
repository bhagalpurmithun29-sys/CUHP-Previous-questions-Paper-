import React from 'react';

export const RoleMatrix: React.FC = () => {
  const permissions = [
    'VIEW_PAPERS',
    'DOWNLOAD_PAPERS',
    'BOOKMARK_PAPERS',
    'REPORT_ISSUES',
    'REVIEW_PAPERS',
    'RESOLVE_REPORTS',
    'UPLOAD_OFFICIAL',
    'MANAGE_USERS',
    'SYSTEM_CONFIG'
  ];

  const roles = [
    { name: 'SUPER_ADMIN', perms: permissions },
    { name: 'ADMIN', perms: permissions.filter(p => p !== 'SYSTEM_CONFIG') },
    { name: 'FACULTY', perms: ['VIEW_PAPERS', 'DOWNLOAD_PAPERS', 'BOOKMARK_PAPERS', 'REPORT_ISSUES', 'REVIEW_PAPERS', 'RESOLVE_REPORTS', 'UPLOAD_OFFICIAL'] },
    { name: 'MODERATOR', perms: ['VIEW_PAPERS', 'DOWNLOAD_PAPERS', 'BOOKMARK_PAPERS', 'REPORT_ISSUES', 'REVIEW_PAPERS', 'RESOLVE_REPORTS'] },
    { name: 'STUDENT', perms: ['VIEW_PAPERS', 'DOWNLOAD_PAPERS', 'BOOKMARK_PAPERS', 'REPORT_ISSUES'] }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Permission Matrix</h3>
        <p className="text-xs text-slate-500 mt-1">Checklist overview of role capabilities.</p>
      </div>
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider sticky left-0 bg-white shadow-[1px_0_0_0_#e2e8f0]">
              Permission
            </th>
            {roles.map(r => (
              <th key={r.name} className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                {r.name.replace('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {permissions.map((perm, idx) => (
            <tr key={perm} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
              <td className="px-6 py-3 text-sm font-medium text-slate-900 sticky left-0 shadow-[1px_0_0_0_#e2e8f0] bg-inherit">
                {perm.replace(/_/g, ' ')}
              </td>
              {roles.map(r => (
                <td key={r.name} className="px-6 py-3 text-center">
                  {r.perms.includes(perm) ? (
                    <svg className="w-5 h-5 text-emerald-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
