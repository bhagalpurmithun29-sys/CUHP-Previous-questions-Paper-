import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSubjects, useDeleteSubject, useDuplicateSubject } from '../hooks/useSubject';
import { SubjectQuery } from '../types/subject.types';
import { SUBJECT_TYPES } from '../constants/subject.constants';

export const SubjectListPage: React.FC = () => {
  const [query, setQuery] = useState<SubjectQuery>({ page: 1, limit: 10 });
  const { data, isLoading } = useSubjects(query);
  const deleteMutation = useDeleteSubject();
  const duplicateMutation = useDuplicateSubject();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleDuplicate = (id: string) => {
    if (window.confirm('Duplicate this subject? A copy will be created.')) {
      duplicateMutation.mutate(id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 max-w-[1400px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Subjects</h1>
          <p className="text-gray-500 mt-1">Manage academic subjects, credits, and delivery modes.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors font-medium">
             Export CSV
           </button>
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors font-medium">
             Import CSV
           </button>
           <Link to="/admin/subjects/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors font-medium">
             + New Subject
           </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Advanced Filters and Search Bar Mock */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4 items-center">
           <input 
             type="text" 
             placeholder="Search code or name..." 
             className="px-3 py-2 border border-gray-300 rounded-lg w-full max-w-xs"
             onChange={(e) => setQuery({ ...query, search: e.target.value, page: 1 })}
           />
           <select 
             className="px-3 py-2 border border-gray-300 rounded-lg max-w-xs bg-white text-gray-700"
             onChange={(e) => setQuery({ ...query, subjectType: e.target.value as any, page: 1 })}
           >
              <option value="">All Types</option>
              {SUBJECT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
           </select>
           {/* Add selects for school, department, course filtering */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="p-4 w-[30%]">Subject</th>
                <th className="p-4 hidden lg:table-cell">Hierarchy</th>
                <th className="p-4 hidden md:table-cell">Structure</th>
                <th className="p-4 hidden sm:table-cell text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={5} className="p-12 text-center text-gray-500">Loading subjects...</td></tr>
              ) : data?.data.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-center text-gray-500">No subjects found matching your criteria.</td></tr>
              ) : (
                data?.data.map((subject) => (
                  <tr key={subject._id} className="hover:bg-blue-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="font-semibold text-gray-900 leading-tight">{subject.subjectName}</div>
                      <div className="text-sm font-mono text-blue-600 mt-1">{subject.subjectCode}</div>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-600">
                      <div className="font-medium text-gray-800">{subject.courseId?.courseCode || 'N/A'}</div>
                      <div className="text-xs text-gray-400">Sem {subject.semesterId?.semesterNumber || 'N/A'} • {subject.departmentId?.departmentName || 'N/A'}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm">
                      <div className="text-gray-800"><span className="font-medium">{subject.credits}</span> Credits ({subject.totalHours} hrs)</div>
                      <div className="text-xs text-gray-500 mt-0.5">{subject.subjectType}</div>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-center">
                      <span className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${subject.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {subject.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDuplicate(subject._id)} title="Duplicate" className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                          Copy
                        </button>
                        <Link to={`/admin/subjects/${subject._id}`} className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors">View</Link>
                        <Link to={`/admin/subjects/${subject._id}/edit`} className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors">Edit</Link>
                        <button onClick={() => handleDelete(subject._id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">Del</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-white">
          <span className="text-sm text-gray-500 font-medium">Showing {data?.data.length || 0} of {data?.total || 0} results</span>
          <div className="flex gap-2">
            <button 
              disabled={query.page === 1} 
              onClick={() => setQuery(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
              className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 disabled:opacity-40 hover:bg-gray-50 bg-white"
            >
              Previous
            </button>
            <button 
              disabled={!data || data.page >= data.totalPages} 
              onClick={() => setQuery(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
              className="px-4 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 disabled:opacity-40 hover:bg-gray-50 bg-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
