import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateSchoolDto, SchoolStatus, School } from '../types/school.types';

const schoolSchema = z.object({
  schoolName: z.string().min(3, 'School name must be at least 3 characters').max(100),
  shortName: z.string().max(20).optional(),
  schoolCode: z.string().min(2).max(10).toUpperCase(),
  description: z.string().max(1000).optional(),
  deanName: z.string().max(100).optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  status: z.nativeEnum(SchoolStatus),
  displayOrder: z.number().int().min(0),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

interface SchoolFormProps {
  initialData?: School;
  onSubmit: (data: CreateSchoolDto) => void;
  isLoading: boolean;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolName: initialData?.schoolName || '',
      shortName: initialData?.shortName || '',
      schoolCode: initialData?.schoolCode || '',
      description: initialData?.description || '',
      deanName: initialData?.deanName || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      website: initialData?.website || '',
      status: initialData?.status || SchoolStatus.ACTIVE,
      displayOrder: initialData?.displayOrder || 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">School Name *</label>
          <input
            {...register('schoolName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
          {errors.schoolName && <p className="text-xs text-red-600">{errors.schoolName.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">School Code *</label>
          <input
            {...register('schoolCode')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50 uppercase"
            disabled={isLoading}
            placeholder="e.g. SCIS"
          />
          {errors.schoolCode && <p className="text-xs text-red-600">{errors.schoolCode.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Short Name</label>
          <input
            {...register('shortName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
          {errors.shortName && <p className="text-xs text-red-600">{errors.shortName.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Dean Name</label>
          <input
            {...register('deanName')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
          />
          {errors.deanName && <p className="text-xs text-red-600">{errors.deanName.message}</p>}
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
          {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Website</label>
          <input
            {...register('website')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
            disabled={isLoading}
            placeholder="https://..."
          />
          {errors.website && <p className="text-xs text-red-600">{errors.website.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-50"
              disabled={isLoading}
            >
              {Object.values(SchoolStatus).map((status) => (
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
        {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
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
          {initialData ? 'Update School' : 'Create School'}
        </button>
      </div>
    </form>
  );
};
