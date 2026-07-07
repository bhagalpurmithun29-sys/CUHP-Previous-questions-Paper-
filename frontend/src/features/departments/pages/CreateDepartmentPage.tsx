import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DepartmentForm } from '../components/DepartmentForm';
import { useCreateDepartment } from '../hooks/useDepartment';
import { CreateDepartmentDto } from '../types/department.types';
import { DEPARTMENT_CONSTANTS } from '../constants/department.constants';

export const CreateDepartmentPage: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateDepartment();

  const handleSubmit = (data: CreateDepartmentDto) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        navigate(DEPARTMENT_CONSTANTS.ROUTES.LIST);
      },
    });
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create New Department</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add a new department to a school.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <DepartmentForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      </motion.div>
    </div>
  );
};

export default CreateDepartmentPage;
