import React, { useState } from 'react';
import { RoleMatrix } from '../../components/rbac/RoleMatrix';

export const RoleManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ROLES' | 'PERMISSIONS' | 'MATRIX'>('ROLES');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Access Control (RBAC)</h1>
            <p className="text-slate-500 mt-1">Manage users, roles, and granular system permissions.</p>
          </div>
          
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
            {['ROLES', 'PERMISSIONS', 'MATRIX'].map(tab => (
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
        </header>

        {activeTab === 'ROLES' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
               <h3 className="font-semibold text-slate-800">System Roles</h3>
               <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                 + Create Role
               </button>
             </div>
             <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Users Assigned</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {['ADMIN', 'MODERATOR', 'STUDENT'].map(role => (
                    <tr key={role} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">{role}</span>
                        {role === 'ADMIN' && <span className="ml-2 text-[10px] bg-red-100 text-red-700 px-1.5 rounded-full font-bold uppercase tracking-wider">System</span>}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        Default role configuration for {role.toLowerCase()} operations.
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {role === 'STUDENT' ? '8,420' : (role === 'ADMIN' ? '2' : '15')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-800 disabled:opacity-50" disabled={['ADMIN', 'STUDENT'].includes(role)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'PERMISSIONS' && (
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
               <h3 className="font-semibold text-slate-800">Granular Permissions</h3>
               <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                 + Create Permission
               </button>
             </div>
             <div className="p-8 text-center text-slate-500">
                Data table mapping for 20+ granular string permissions (e.g., READ_PAPER, MANAGE_USERS).
             </div>
           </div>
        )}

        {activeTab === 'MATRIX' && <RoleMatrix />}

      </div>
    </div>
  );
};
