import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SemesterForm } from '../components/SemesterForm';
import { useCreateSemester } from '../hooks/useSemester';
// import { useCourses } from '../../courses/hooks/useCourse';

export const CreateSemesterPage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateSemester();
  
  // Mock data for courses since we are generating only semester module
  const mockCourses = [{ _id: 'course1', courseName: 'B.Tech Computer Science', courseCode: 'BTECH-CS' }];

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
      // Toast notification for success
      navigate('/admin/semesters');
    } catch (error) {
      // Toast notification for error
      console.error(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Semesters
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Semester</h1>
        <p className="text-gray-500 mt-1">Configure a new semester for an existing course.</p>
      </div>

      <SemesterForm 
        onSubmit={handleSubmit} 
        isLoading={createMutation.isPending} 
        courses={mockCourses} 
      />
    </motion.div>
  );
};
