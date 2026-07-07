import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourses, useDeleteCourse } from '../hooks/useCourse';
import { CourseQuery } from '../types/course.types';
// import { PageHeader, Table, Pagination, Badge, IconButton } from '../../common/components';
// Icons like Edit, Trash, Eye could be imported from lucide-react or similar

export const CourseListPage: React.FC = () => {
  const [query, setQuery] = useState<CourseQuery>({ page: 1, limit: 10 });
  const { data, isLoading } = useCourses(query);
  const deleteMutation = useDeleteCourse();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Courses</h1>
          <p className="text-gray-500 mt-1">Manage academic courses across all departments.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
             Export CSV
           </button>
           <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
             Import CSV
           </button>
           <Link to="/admin/courses/create" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors font-medium">
             + New Course
           </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters and Search Bar Mock */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
           <input 
             type="text" 
             placeholder="Search by name or code..." 
             className="px-3 py-2 border border-gray-300 rounded-lg w-full max-w-sm"
             onChange={(e) => setQuery({ ...query, search: e.target.value, page: 1 })}
           />
           {/* Add selects for school, department, program type filtering */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <th className="p-4">Course Name & Code</th>
                <th className="p-4 hidden md:table-cell">Department</th>
                <th className="p-4 hidden lg:table-cell">Program</th>
                <th className="p-4 hidden sm:table-cell">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading courses...</td></tr>
              ) : data?.data.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No courses found.</td></tr>
              ) : (
                data?.data.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{course.courseName}</div>
                      <div className="text-sm text-gray-500">{course.courseCode}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-600">
                      {course.departmentId?.departmentName || 'N/A'}
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-gray-600">
                      {course.programType} • {course.degree}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${course.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/admin/courses/${course._id}`} className="p-1 text-gray-400 hover:text-blue-600 transition-colors">View</Link>
                        <Link to={`/admin/courses/${course._id}/edit`} className="p-1 text-gray-400 hover:text-green-600 transition-colors">Edit</Link>
                        <button onClick={() => handleDelete(course._id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">Del</button>
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
