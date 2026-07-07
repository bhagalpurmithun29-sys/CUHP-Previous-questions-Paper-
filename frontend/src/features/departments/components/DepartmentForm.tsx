import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateDepartmentDto, DepartmentStatus, Department } from '../types/department.types';
import { useSchools } from '../../schools/hooks/useSchool'; // Assumes useSchools exists

const departmentSchema = z.object({
  departmentName: z.string().min(3, 'Department name must be at least 3 characters').max(150),
  departmentCode: z.string().min(2).max(20).toUpperCase(),
  shortName: z.string().max(50).optional(),
  description: z.string().max(1000).optional(),
  schoolId: z.string().min(1, 'School is required'),
  hodName: z.string().max(100).optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  officeLocation: z.string().max(200).optional(),
  status: z.nativeEnum(DepartmentStatus),
  displayOrder: z.number().int().min(0),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
  initialData?: Department;
  onSubmit: (data: CreateDepartmentDto) => void;
  isLoading: boolean;
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const { data: schoolsData, isLoading: schoolsLoading } = useSchools({ limit: 100 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      departmentName: initialData?.departmentName || '',
      departmentCode: initialData?.departmentCode || '',
      shortName: initialData?.shortName || '',
      description: initialData?.description || '',
      schoolId: typeof initialData?.schoolId === 'string' ? initialData.schoolId : (initialData?.schoolId?._id || ''),
      hodName: initialData?.hodName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      website: initialData?.website || '',
      officeLocation: initialData?.officeLocation || '',
      status: initialData?.status || DepartmentStatus.ACTIVE,
      displayOrder: initialData?.displayOrder || 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Department Name *</label>
          <input
            {...register('departmentName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
          {errors.departmentName && <p className="text-xs text-red-600">{errors.departmentName.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Department Code *</label>
          <input
            {...register('departmentCode')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 uppercase"
            disabled={isLoading}
            placeholder="e.g. CS"
          />
          {errors.departmentCode && <p className="text-xs text-red-600">{errors.departmentCode.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">School *</label>
          <select
            {...register('schoolId')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading || schoolsLoading}
          >
            <option value="">Select a School</option>
            {schoolsData?.schools.map(school => (
              <option key={school._id} value={school._id}>
                {school.schoolName} ({school.schoolCode})
              </option>
            ))}
          </select>
          {errors.schoolId && <p className="text-xs text-red-600">{errors.schoolId.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Short Name</label>
          <input
            {...register('shortName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">HOD Name</label>
          <input
            {...register('hodName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            {...register('email')}
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            {...register('phone')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Office Location</label>
          <input
            {...register('officeLocation')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
              disabled={isLoading}
            >
              {Object.values(DepartmentStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Display Order</label>
            <input
              {...register('displayOrder', { valueAsNumber: true })}
              type="number"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isLoading}
          className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading && (
            <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {initialData ? 'Update Department' : 'Create Department'}
        </button>
      </div>
    </form>
  );
};
