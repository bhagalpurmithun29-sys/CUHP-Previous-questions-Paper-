import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CourseForm } from '../components/CourseForm';
import { useCourse, useUpdateCourse } from '../hooks/useCourse';
// import { useSchools } from '../../schools/hooks/useSchools';
// import { useDepartments } from '../../departments/hooks/useDepartment';

export const EditCoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: course, isLoading: isFetching } = useCourse(id!);
  const updateMutation = useUpdateCourse();
  
  // Mock data for schools and departments since we are only generating course module
  const mockSchools = [{ _id: 'school1', schoolName: 'School of Technology' }];
  const mockDepartments = [{ _id: 'dept1', departmentName: 'Computer Science' }];

  const handleSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync({ id: id!, data });
      // Toast notification for success
      navigate('/admin/courses');
    } catch (error) {
      // Toast notification for error
      console.error(error);
    }
  };

  if (isFetching) return <div className="p-8 text-center text-gray-500">Loading course data...</div>;
  if (!course) return <div className="p-8 text-center text-red-500">Course not found</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to Courses
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Course: {course.courseCode}</h1>
        <p className="text-gray-500 mt-1">Update details for {course.courseName}.</p>
      </div>

      <CourseForm 
        initialData={course}
        onSubmit={handleSubmit} 
        isLoading={updateMutation.isPending} 
        schools={mockSchools} 
        departments={mockDepartments} 
      />
    </motion.div>
  );
};
