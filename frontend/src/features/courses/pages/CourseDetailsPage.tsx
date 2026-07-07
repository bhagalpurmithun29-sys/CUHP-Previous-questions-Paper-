import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourse } from '../hooks/useCourse';

export const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useCourse(id!);

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading course details...</div>;
  if (!course) return <div className="p-12 text-center text-red-500 font-semibold">Course not found or has been deleted.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-start mb-6">
        <div>
           <Link to="/admin/courses" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
             ← Back to Course List
           </Link>
           <h1 className="text-3xl font-bold text-gray-900">{course.courseName}</h1>
           <div className="flex items-center gap-3 mt-2">
              <span className="text-lg font-mono text-gray-600 bg-gray-100 px-2 rounded">{course.courseCode}</span>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${course.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {course.status}
              </span>
           </div>
        </div>
        <Link to={`/admin/courses/${course._id}/edit`} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
          Edit Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold border-b border-gray-100 pb-2 mb-4">Course Overview</h2>
            <p className="text-gray-700 mb-6">{course.description || 'No description provided.'}</p>
            
            <div className="grid grid-cols-2 gap-y-4 text-sm">
               <div>
                 <span className="block text-gray-500 mb-1">Program Type</span>
                 <span className="font-medium text-gray-900">{course.programType || 'N/A'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Degree</span>
                 <span className="font-medium text-gray-900">{course.degree || 'N/A'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Duration</span>
                 <span className="font-medium text-gray-900">{course.duration} {course.durationUnit}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Total Semesters</span>
                 <span className="font-medium text-gray-900">{course.totalSemesters}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Credits</span>
                 <span className="font-medium text-gray-900">{course.credits || 'N/A'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Medium of Instruction</span>
                 <span className="font-medium text-gray-900">{course.medium || 'N/A'}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">Organizational Unit</h3>
            <div className="mb-4">
              <span className="block text-xs text-gray-500">School</span>
              <span className="font-medium text-gray-900">{course.schoolId?.schoolName || 'Unknown'}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Department</span>
              <span className="font-medium text-gray-900">{course.departmentId?.departmentName || 'Unknown'}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">System Info</h3>
            <div className="mb-3">
              <span className="block text-xs text-gray-500">Created</span>
              <span className="text-sm text-gray-900">{new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Last Updated</span>
              <span className="text-sm text-gray-900">{new Date(course.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
