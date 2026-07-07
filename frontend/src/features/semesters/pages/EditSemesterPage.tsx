import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SemesterForm } from '../components/SemesterForm';
import { useSemester, useUpdateSemester } from '../hooks/useSemester';
// import { useCourses } from '../../courses/hooks/useCourse';

export const EditSemesterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: semester, isLoading: isFetching } = useSemester(id!);
  const updateMutation = useUpdateSemester();
  
  // Mock data for courses
  const mockCourses = [{ _id: semester?.courseId?._id || 'course1', courseName: semester?.courseId?.courseName || 'Course' }];

  const handleSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync({ id: id!, data });
      // Toast notification for success
      navigate('/admin/semesters');
    } catch (error) {
      // Toast notification for error
      console.error(error);
    }
  };

  if (isFetching) return <div className="p-8 text-center text-gray-500">Loading semester data...</div>;
  if (!semester) return <div className="p-8 text-center text-red-500">Semester not found</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Semesters
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Semester {semester.semesterNumber}</h1>
        <p className="text-gray-500 mt-1">Update details for {semester.courseId?.courseName}.</p>
      </div>

      <SemesterForm 
        initialData={{...semester, courseId: semester.courseId?._id}}
        onSubmit={handleSubmit} 
        isLoading={updateMutation.isPending} 
        courses={mockCourses} 
      />
    </motion.div>
  );
};
