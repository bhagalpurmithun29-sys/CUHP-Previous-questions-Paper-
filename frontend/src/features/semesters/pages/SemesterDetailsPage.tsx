import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSemester } from '../hooks/useSemester';

export const SemesterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: semester, isLoading } = useSemester(id!);

  if (isLoading) return <div className="p-12 text-center text-gray-500">Loading semester details...</div>;
  if (!semester) return <div className="p-12 text-center text-red-500 font-semibold">Semester not found or has been deleted.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-start mb-6">
        <div>
           <Link to="/admin/semesters" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
             ← Back to Semester List
           </Link>
           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
             {semester.semesterName || `Semester ${semester.semesterNumber}`}
             {semester.isCurrentSemester && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded uppercase font-bold tracking-wider">Current</span>}
           </h1>
           <div className="flex items-center gap-3 mt-2">
              <span className="text-lg font-mono text-gray-600 bg-gray-100 px-2 rounded">{semester.courseId?.courseCode}</span>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${semester.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {semester.status}
              </span>
           </div>
        </div>
        <Link to={`/admin/semesters/${semester._id}/edit`} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
          Edit Semester
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold border-b border-gray-100 pb-2 mb-4">Academic Details</h2>
            
            <div className="grid grid-cols-2 gap-y-6 text-sm">
               <div>
                 <span className="block text-gray-500 mb-1">Academic Year</span>
                 <span className="font-medium text-gray-900">{semester.academicYear || 'N/A'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Academic Session</span>
                 <span className="font-medium text-gray-900">{semester.academicSession || 'N/A'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Semester Type</span>
                 <span className="font-medium text-gray-900">{semester.semesterType} • {semester.isOdd ? 'Odd' : 'Even'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Credits</span>
                 <span className="font-medium text-gray-900">{semester.credits || 'N/A'}</span>
               </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold border-b border-gray-100 pb-2 mb-4">Important Dates</h2>
            
            <div className="grid grid-cols-2 gap-y-6 text-sm">
               <div>
                 <span className="block text-gray-500 mb-1">Start Date</span>
                 <span className="font-medium text-gray-900">{semester.startDate ? new Date(semester.startDate).toLocaleDateString() : 'TBD'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">End Date</span>
                 <span className="font-medium text-gray-900">{semester.endDate ? new Date(semester.endDate).toLocaleDateString() : 'TBD'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Registration Starts</span>
                 <span className="font-medium text-gray-900">{semester.registrationStart ? new Date(semester.registrationStart).toLocaleDateString() : 'TBD'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Registration Ends</span>
                 <span className="font-medium text-gray-900">{semester.registrationEnd ? new Date(semester.registrationEnd).toLocaleDateString() : 'TBD'}</span>
               </div>
               <div>
                 <span className="block text-gray-500 mb-1">Result Declaration</span>
                 <span className="font-medium text-gray-900">{semester.resultDeclarationDate ? new Date(semester.resultDeclarationDate).toLocaleDateString() : 'TBD'}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold uppercase text-blue-800 tracking-wider mb-4">Parent Course</h3>
            <div className="mb-2">
              <span className="block text-xs text-blue-600 mb-1">Course Name</span>
              <span className="font-bold text-blue-900">{semester.courseId?.courseName || 'Unknown'}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-blue-600 mb-1">Program Type</span>
              <span className="text-sm font-medium text-blue-900">{semester.courseId?.programType || 'N/A'}</span>
            </div>
            <div>
              <Link to={`/admin/courses/${semester.courseId?._id}`} className="text-xs text-blue-700 underline mt-2 inline-block">View Course Profile</Link>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">System Info</h3>
            <div className="mb-3">
              <span className="block text-xs text-gray-500">Created</span>
              <span className="text-sm text-gray-900">{new Date(semester.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">Last Updated</span>
              <span className="text-sm text-gray-900">{new Date(semester.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
