import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSubject } from '../hooks/useSubject';

export const SubjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: subject, isLoading } = useSubject(id!);

  if (isLoading) return <div className="p-20 text-center text-gray-500">Loading subject details...</div>;
  if (!subject) return <div className="p-20 text-center text-red-500 font-semibold text-lg">Subject not found or has been deleted.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <Link to="/admin/subjects" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-2 inline-block">
             ← Back to Subject List
           </Link>
           <h1 className="text-4xl font-black text-gray-900 tracking-tight">{subject.subjectName}</h1>
           <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xl font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-0.5 rounded border border-indigo-100">{subject.subjectCode}</span>
              <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${subject.status === 'ACTIVE' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                {subject.status}
              </span>
              <span className="inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {subject.subjectType}
              </span>
           </div>
        </div>
        <div className="flex gap-3">
          <Link to={`/admin/subjects/${subject._id}/edit`} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm transition-colors font-medium">
            Edit Subject
          </Link>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm transition-colors font-medium">
            View Question Papers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
              Overview
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">{subject.description || 'No description provided for this subject.'}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
               <div className="text-center p-2">
                 <span className="block text-3xl font-black text-indigo-600 mb-1">{subject.credits}</span>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Credits</span>
               </div>
               <div className="text-center p-2 border-l border-gray-200">
                 <span className="block text-3xl font-black text-gray-900 mb-1">{subject.lectureHours}</span>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Lec Hrs</span>
               </div>
               <div className="text-center p-2 border-l border-gray-200">
                 <span className="block text-3xl font-black text-gray-900 mb-1">{subject.tutorialHours + subject.practicalHours}</span>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tut/Prac Hrs</span>
               </div>
               <div className="text-center p-2 border-l border-gray-200">
                 <span className="block text-3xl font-black text-gray-900 mb-1">{subject.totalHours}</span>
                 <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Hrs</span>
               </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full inline-block"></span>
              Delivery & Prerequisites
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Modes</h4>
                 <div className="flex flex-wrap gap-2">
                    {subject.deliveryMode?.map((mode, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm border border-gray-200">
                        {mode}
                      </span>
                    ))}
                 </div>
               </div>
               <div>
                 <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Language of Instruction</h4>
                 <span className="text-lg font-medium text-gray-900">{subject.language || 'English'}</span>
               </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100/50">
            <h3 className="text-sm font-bold uppercase text-indigo-800 tracking-wider mb-5">Academic Hierarchy</h3>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-200 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-indigo-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-indigo-100 bg-white/60 backdrop-blur-sm shadow-sm">
                  <span className="block text-[10px] font-bold text-indigo-500 uppercase">School</span>
                  <span className="font-semibold text-gray-900 text-sm">{subject.schoolId?.schoolCode || 'School'}</span>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-indigo-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-indigo-100 bg-white/60 backdrop-blur-sm shadow-sm">
                  <span className="block text-[10px] font-bold text-indigo-500 uppercase">Department</span>
                  <span className="font-semibold text-gray-900 text-sm">{subject.departmentId?.departmentCode || 'Dept'}</span>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-indigo-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-indigo-100 bg-white/60 backdrop-blur-sm shadow-sm">
                  <span className="block text-[10px] font-bold text-indigo-500 uppercase">Course</span>
                  <span className="font-semibold text-gray-900 text-sm">{subject.courseId?.courseCode || 'Course'}</span>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-indigo-500 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] p-3 rounded-lg border border-indigo-100 bg-white/60 backdrop-blur-sm shadow-sm">
                  <span className="block text-[10px] font-bold text-indigo-500 uppercase">Semester</span>
                  <span className="font-semibold text-gray-900 text-sm">Sem {subject.semesterId?.semesterNumber || '0'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">System Info</h3>
            <div className="mb-4">
              <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Created At</span>
              <span className="text-sm font-medium text-gray-900">{new Date(subject.createdAt).toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Last Updated</span>
              <span className="text-sm font-medium text-gray-900">{new Date(subject.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
