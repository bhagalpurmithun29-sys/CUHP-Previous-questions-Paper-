import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CourseForm } from '../components/CourseForm';
import { useCreateCourse } from '../hooks/useCourse';
// import { useSchools } from '../../schools/hooks/useSchools';
// import { useDepartments } from '../../departments/hooks/useDepartment';

export const CreateCoursePage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateCourse();
  
  // Mock data for schools and departments since we are only generating course module
  const mockSchools = [{ _id: 'school1', schoolName: 'School of Technology' }];
  const mockDepartments = [{ _id: 'dept1', departmentName: 'Computer Science' }];

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
      // Toast notification for success
      navigate('/admin/courses');
    } catch (error) {
      // Toast notification for error
      console.error(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Courses
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Course</h1>
        <p className="text-gray-500 mt-1">Add a new academic course to the system.</p>
      </div>

      <CourseForm 
        onSubmit={handleSubmit} 
        isLoading={createMutation.isPending} 
        schools={mockSchools} 
        departments={mockDepartments} 
      />
    </motion.div>
  );
};
