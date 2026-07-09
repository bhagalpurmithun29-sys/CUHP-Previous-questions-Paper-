import React, { useState } from 'react';
import { FiDownload, FiUpload, FiPlus, FiFilter, FiSearch, FiMoreVertical, FiEdit2, FiTrash2, FiArchive } from 'react-icons/fi';
import { ImportWizard } from '../components/ImportWizard';

type EntityTab = 'schools' | 'departments' | 'courses' | 'semesters' | 'subjects';

export const AcademicDataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EntityTab>('courses');
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'schools', label: 'Schools' },
    { id: 'departments', label: 'Departments' },
    { id: 'courses', label: 'Courses' },
    { id: 'semesters', label: 'Semesters' },
    { id: 'subjects', label: 'Subjects' },
  ];

  // Mock data for UI demonstration
  const mockData = [
    { id: '1', code: 'CSE101', name: 'Intro to Computer Science', status: 'ACTIVE', updated: '2 days ago' },
    { id: '2', code: 'MTH202', name: 'Advanced Calculus', status: 'ACTIVE', updated: '1 week ago' },
    { id: '3', code: 'PHY105', name: 'Physics I', status: 'ARCHIVED', updated: '1 month ago' },
  ];

  const handleExport = () => {
    // In a real app, this would trigger an API call to download CSV/Excel
    console.log(`Exporting ${activeTab}...`);
    alert(`Exporting ${activeTab} to CSV...`);
  };

  const handleImport = async (file: File) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ successCount: 142, duplicates: 3 });
      }, 2000);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, import, and export academic entities in bulk.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FiDownload /> Export {activeTab}
          </button>
          <button 
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm text-primary"
          >
            <FiUpload /> Bulk Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <FiPlus /> New {activeTab.slice(0, -1)}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="flex items-center overflow-x-auto border-b border-gray-100 dark:border-gray-700 px-2 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as EntityTab)}
              className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 shadow-sm w-full sm:w-auto justify-center">
            <FiFilter /> Filters
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800/80 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Code</th>
                <th scope="col" className="px-6 py-3 font-semibold">Name</th>
                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                <th scope="col" className="px-6 py-3 font-semibold">Last Updated</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row) => (
                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {row.code}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {row.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                      row.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {row.updated}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="Edit">
                        <FiEdit2 />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors" title="Archive">
                        <FiArchive />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <span className="text-sm text-gray-500">Showing 1 to 3 of 42 entries</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 shadow-sm disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 text-sm bg-primary text-white rounded shadow-sm">1</button>
              <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded text-gray-700 hover:bg-gray-50 shadow-sm">2</button>
              <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded text-gray-500 hover:bg-gray-50 shadow-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      <ImportWizard
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        entityName={activeTab}
        onImport={handleImport}
      />
    </div>
  );
};
