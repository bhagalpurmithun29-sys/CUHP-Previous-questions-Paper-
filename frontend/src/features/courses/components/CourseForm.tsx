import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ICourse, ProgramType, CourseStatus, DurationUnit } from '../types/course.types';
import { PROGRAM_TYPES, COURSE_STATUSES, DURATION_UNITS, COMMON_DEGREES } from '../constants/course.constants';
// Reusing generic components assuming they exist in the project design system
// import { Input, Select, Button, FormField } from '../../common/components';

const courseSchema = z.object({
  courseName: z.string().min(3, 'Course name must be at least 3 characters'),
  courseCode: z.string().min(2, 'Course code is required'),
  shortName: z.string().optional(),
  description: z.string().optional(),
  schoolId: z.string().min(1, 'School is required'),
  departmentId: z.string().min(1, 'Department is required'),
  programType: z.nativeEnum(ProgramType),
  degree: z.string().optional(),
  duration: z.number().min(0, 'Duration must be positive'),
  durationUnit: z.nativeEnum(DurationUnit),
  totalSemesters: z.number().min(1, 'Total semesters must be at least 1'),
  credits: z.number().min(0).optional(),
  medium: z.string().optional(),
  admissionYear: z.number().optional(),
  status: z.nativeEnum(CourseStatus),
  displayOrder: z.number().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  initialData?: Partial<ICourse>;
  onSubmit: (data: CourseFormData) => void;
  isLoading?: boolean;
  schools?: any[]; // Replace with ISchool[]
  departments?: any[]; // Replace with IDepartment[]
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit, isLoading, schools = [], departments = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      ...initialData,
      duration: initialData?.duration || 0,
      totalSemesters: initialData?.totalSemesters || 1,
      status: initialData?.status || CourseStatus.ACTIVE,
      programType: initialData?.programType || ProgramType.UG,
      durationUnit: initialData?.durationUnit || DurationUnit.YEARS,
    } as CourseFormData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
          <input {...register('courseName')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.courseName && <p className="text-red-500 text-xs mt-1">{errors.courseName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
          <input {...register('courseCode')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.courseCode && <p className="text-red-500 text-xs mt-1">{errors.courseCode.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">School *</label>
          <select {...register('schoolId')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            <option value="">Select School</option>
            {schools.map(s => <option key={s._id} value={s._id}>{s.schoolName}</option>)}
          </select>
          {errors.schoolId && <p className="text-red-500 text-xs mt-1">{errors.schoolId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
          <select {...register('departmentId')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            <option value="">Select Department</option>
            {departments.map(d => <option key={d._id} value={d._id}>{d.departmentName}</option>)}
          </select>
          {errors.departmentId && <p className="text-red-500 text-xs mt-1">{errors.departmentId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
          <select {...register('programType')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            {PROGRAM_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
          <input {...register('degree')} list="degree-options" className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          <datalist id="degree-options">
             {COMMON_DEGREES.map(deg => <option key={deg} value={deg} />)}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
          <input type="number" {...register('duration', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration Unit</label>
          <select {...register('durationUnit')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            {DURATION_UNITS.map(unit => <option key={unit.value} value={unit.value}>{unit.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Semesters *</label>
          <input type="number" {...register('totalSemesters', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.totalSemesters && <p className="text-red-500 text-xs mt-1">{errors.totalSemesters.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select {...register('status')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            {COURSE_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
          </select>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end gap-3">
        <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? 'Saving...' : 'Save Course'}
        </button>
      </div>
    </form>
  );
};
