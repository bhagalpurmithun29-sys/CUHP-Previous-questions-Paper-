import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ISemester, SemesterType, SemesterStatus } from '../types/semester.types';
import { SEMESTER_TYPES, SEMESTER_STATUSES, COMMON_ACADEMIC_SESSIONS } from '../constants/semester.constants';

const dateSchema = z.string().or(z.date()).transform((val) => val ? new Date(val).toISOString().split('T')[0] : '').optional();

const semesterSchema = z.object({
  semesterNumber: z.number().min(1, 'Semester number is required'),
  semesterName: z.string().optional(),
  shortName: z.string().optional(),
  courseId: z.string().min(1, 'Course is required'),
  academicSession: z.string().optional(),
  academicYear: z.string().optional(),
  semesterType: z.nativeEnum(SemesterType).optional(),
  isOdd: z.boolean().optional(),
  displayOrder: z.number().optional(),
  credits: z.number().min(0).optional(),
  duration: z.number().min(0).optional(),
  startDate: dateSchema,
  endDate: dateSchema,
  registrationStart: dateSchema,
  registrationEnd: dateSchema,
  resultDeclarationDate: dateSchema,
  status: z.nativeEnum(SemesterStatus),
  isCurrentSemester: z.boolean().optional(),
}).refine((data) => {
  if (data.startDate && data.endDate && data.startDate !== '' && data.endDate !== '') {
    return new Date(data.startDate) < new Date(data.endDate);
  }
  return true;
}, { message: "Start date must be before end date", path: ["endDate"] })
  .refine((data) => {
  if (data.registrationStart && data.registrationEnd && data.registrationStart !== '' && data.registrationEnd !== '') {
    return new Date(data.registrationStart) < new Date(data.registrationEnd);
  }
  return true;
}, { message: "Registration start must be before registration end", path: ["registrationEnd"] });

type SemesterFormData = z.infer<typeof semesterSchema>;

interface SemesterFormProps {
  initialData?: Partial<ISemester>;
  onSubmit: (data: SemesterFormData) => void;
  isLoading?: boolean;
  courses?: any[]; // Replace with ICourse[]
}

export const SemesterForm: React.FC<SemesterFormProps> = ({ initialData, onSubmit, isLoading, courses = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SemesterFormData>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      ...initialData,
      semesterNumber: initialData?.semesterNumber || 1,
      status: initialData?.status || SemesterStatus.UPCOMING,
      semesterType: initialData?.semesterType || SemesterType.ODD,
      isCurrentSemester: initialData?.isCurrentSemester || false,
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
      registrationStart: initialData?.registrationStart ? new Date(initialData.registrationStart).toISOString().split('T')[0] : '',
      registrationEnd: initialData?.registrationEnd ? new Date(initialData.registrationEnd).toISOString().split('T')[0] : '',
      resultDeclarationDate: initialData?.resultDeclarationDate ? new Date(initialData.resultDeclarationDate).toISOString().split('T')[0] : '',
    } as SemesterFormData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
          <select {...register('courseId')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            <option value="">Select Course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.courseName}</option>)}
          </select>
          {errors.courseId && <p className="text-red-500 text-xs mt-1">{errors.courseId.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester Number *</label>
          <input type="number" {...register('semesterNumber', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.semesterNumber && <p className="text-red-500 text-xs mt-1">{errors.semesterNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester Name</label>
          <input {...register('semesterName')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" placeholder="e.g. First Semester" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Name</label>
          <input {...register('shortName')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" placeholder="e.g. Sem 1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Session</label>
          <input {...register('academicSession')} list="session-options" className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          <datalist id="session-options">
             {COMMON_ACADEMIC_SESSIONS.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
          <input {...register('academicYear')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2023-2024" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester Type</label>
          <select {...register('semesterType')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            {SEMESTER_TYPES.map(pt => <option key={pt.value} value={pt.value}>{pt.label}</option>)}
          </select>
        </div>
        
        <div className="flex items-center mt-6">
          <input type="checkbox" {...register('isOdd')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label className="ml-2 block text-sm text-gray-900">Is Odd Semester?</label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" {...register('startDate')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" {...register('endDate')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Start</label>
          <input type="date" {...register('registrationStart')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration End</label>
          <input type="date" {...register('registrationEnd')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          {errors.registrationEnd && <p className="text-red-500 text-xs mt-1">{errors.registrationEnd.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
          <input type="number" {...register('credits', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select {...register('status')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
            {SEMESTER_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
          </select>
        </div>
        
        <div className="flex items-center mt-6">
          <input type="checkbox" {...register('isCurrentSemester')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label className="ml-2 block text-sm text-gray-900">Set as Current Semester (Deactivates others for this course)</label>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end gap-3">
        <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? 'Saving...' : 'Save Semester'}
        </button>
      </div>
    </form>
  );
};
