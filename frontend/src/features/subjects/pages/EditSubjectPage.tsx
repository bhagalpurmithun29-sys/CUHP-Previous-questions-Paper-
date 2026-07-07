import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SubjectForm } from '../components/SubjectForm';
import { useSubject, useUpdateSubject } from '../hooks/useSubject';

export const EditSubjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: subject, isLoading: isFetching } = useSubject(id!);
  const updateMutation = useUpdateSubject();
  
  // Mock relational data
  const mockSchools = [{ _id: subject?.schoolId?._id || 'school1', schoolName: subject?.schoolId?.schoolName || 'School' }];
  const mockDepartments = [{ _id: subject?.departmentId?._id || 'dept1', departmentName: subject?.departmentId?.departmentName || 'Dept' }];
  const mockCourses = [{ _id: subject?.courseId?._id || 'course1', courseName: subject?.courseId?.courseName || 'Course' }];
  const mockSemesters = [{ _id: subject?.semesterId?._id || 'sem1', semesterName: subject?.semesterId?.semesterName, semesterNumber: subject?.semesterId?.semesterNumber }];

  const handleSubmit = async (data: any) => {
    try {
      await updateMutation.mutateAsync({ id: id!, data });
      navigate('/admin/subjects');
    } catch (error) {
      console.error(error);
    }
  };

  if (isFetching) return <div className="p-12 text-center text-gray-500">Loading subject data...</div>;
  if (!subject) return <div className="p-12 text-center text-red-500">Subject not found</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-blue-600 hover:text-blue-800 mb-3 inline-block">
          ← Back to Subjects
        </button>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Subject: {subject.subjectCode}</h1>
      </div>

      <SubjectForm 
        initialData={subject}
        onSubmit={handleSubmit} 
        isLoading={updateMutation.isPending} 
        schools={mockSchools} 
        departments={mockDepartments}
        courses={mockCourses}
        semesters={mockSemesters}
      />
    </motion.div>
  );
};
