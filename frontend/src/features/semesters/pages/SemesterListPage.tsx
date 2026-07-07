import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSemesters, useDeleteSemester, useActivateSemester } from '../hooks/useSemester';
import { SemesterQuery } from '../types/semester.types';

export const SemesterListPage: React.FC = () => {
  const [query, setQuery] = useState<SemesterQuery>({ page: 1, limit: 10 });
  const { data, isLoading } = useSemesters(query);
  const deleteMutation = useDeleteSemester();
  const activateMutation = useActivateSemester();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this semester?')) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleActivate = (id: string) => {
    if (window.confirm('Activate this semester? This will deactivate other active semesters for this course.')) {
      activateMutation.mutate(id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Semesters</h1>
          <p className="text-gray-500 mt-1">Manage academic semesters for all courses.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
             Export CSV
           </button>
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
             Import CSV
           </button>
           <Link to="/admin/semesters/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors font-medium">
             + New Semester
           </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters and Search Bar Mock */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4 items-center">
           <input 
             type="text" 
             placeholder="Search by name, year, session..." 
             className="px-3 py-2 border border-gray-300 rounded-lg w-full max-w-sm"
             onChange={(e) => setQuery({ ...query, search: e.target.value, page: 1 })}
           />
           {/* Course, Status, Type filters would go here */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="p-4">Semester</th>
                <th className="p-4 hidden md:table-cell">Course</th>
                <th className="p-4 hidden lg:table-cell">Academic Year</th>
                <th className="p-4 hidden sm:table-cell">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading semesters...</td></tr>
              ) : data?.data.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No semesters found.</td></tr>
              ) : (
                data?.data.map((semester) => (
                  <tr key={semester._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                         {semester.semesterName || `Semester ${semester.semesterNumber}`}
                         {semester.isCurrentSemester && <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Current</span>}
                      </div>
                      <div className="text-sm text-gray-500">{semester.semesterType} • {semester.isOdd ? 'Odd' : 'Even'}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-600">
                      <div className="font-medium">{semester.courseId?.courseCode || 'N/A'}</div>
                      <div className="text-xs">{semester.courseId?.courseName || 'N/A'}</div>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-600">
                      {semester.academicYear || 'N/A'} <br/>
                      <span className="text-xs text-gray-400">{semester.academicSession || ''}</span>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${semester.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : semester.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {semester.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!semester.isCurrentSemester && (
                           <button onClick={() => handleActivate(semester._id)} className="p-1 text-blue-600 hover:text-blue-800 text-xs font-medium mr-2">Activate</button>
                        )}
                        <Link to={`/admin/semesters/${semester._id}`} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">View</Link>
                        <Link to={`/admin/semesters/${semester._id}/edit`} className="p-1 text-gray-400 hover:text-green-600 transition-colors">Edit</Link>
                        <button onClick={() => handleDelete(semester._id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">Del</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-500">Showing {data?.data.length || 0} of {data?.total || 0} results</span>
          <div className="flex gap-2">
            <button 
              disabled={query.page === 1} 
              onClick={() => setQuery(prev => ({ ...prev, page: (prev.page || 1) - 1 }))}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 bg-white"
            >
              Prev
            </button>
            <button 
              disabled={!data || data.page >= data.totalPages} 
              onClick={() => setQuery(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 bg-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
