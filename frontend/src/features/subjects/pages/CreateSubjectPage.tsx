import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SubjectForm } from '../components/SubjectForm';
import { useCreateSubject } from '../hooks/useSubject';

export const CreateSubjectPage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateSubject();
  
  // Mock relational data
  const mockSchools = [{ _id: 'school1', schoolName: 'School of Tech' }];
  const mockDepartments = [{ _id: 'dept1', departmentName: 'Comp Science' }];
  const mockCourses = [{ _id: 'course1', courseName: 'B.Tech CS' }];
  const mockSemesters = [{ _id: 'sem1', semesterName: 'Semester 1', semesterNumber: 1 }];

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync(data);
      navigate('/admin/subjects');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-blue-600 hover:text-blue-800 mb-3 inline-block">
          ← Back to Subjects
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Subject</h1>
      </div>

      <SubjectForm 
        onSubmit={handleSubmit} 
        isLoading={createMutation.isPending} 
        schools={mockSchools} 
        departments={mockDepartments}
        courses={mockCourses}
        semesters={mockSemesters}
      />
    </motion.div>
  );
};
