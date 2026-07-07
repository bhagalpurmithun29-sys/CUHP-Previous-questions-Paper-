import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DepartmentForm } from '../components/DepartmentForm';
import { useUpdateDepartment, useDepartment } from '../hooks/useDepartment';
import { CreateDepartmentDto } from '../types/department.types';
import { DEPARTMENT_CONSTANTS } from '../constants/department.constants';

export const EditDepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: department, isLoading: isFetching } = useDepartment(id!);
  const updateMutation = useUpdateDepartment();

  const handleSubmit = (data: CreateDepartmentDto) => {
    updateMutation.mutate(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate(DEPARTMENT_CONSTANTS.ROUTES.LIST);
        },
      }
    );
  };

  if (isFetching) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-r-transparent"></div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-900">Department Not Found</h2>
        <p className="mt-2 text-gray-500">The department you're trying to edit does not exist or has been deleted.</p>
        <button
          onClick={() => navigate(DEPARTMENT_CONSTANTS.ROUTES.LIST)}
          className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Department</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update information for {department.departmentName}.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <DepartmentForm
          initialData={department}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />
      </motion.div>
    </div>
  );
};

export default EditDepartmentPage;
