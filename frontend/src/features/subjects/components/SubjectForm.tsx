import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ISubject, SubjectType, DeliveryMode, SubjectStatus } from '../types/subject.types';
import { SUBJECT_TYPES, DELIVERY_MODES, SUBJECT_STATUSES } from '../constants/subject.constants';

const subjectSchema = z.object({
  subjectName: z.string().min(2, 'Name is required').max(150),
  subjectCode: z.string().min(2, 'Code is required').max(30),
  shortName: z.string().optional(),
  description: z.string().optional(),
  schoolId: z.string().min(1, 'School is required'),
  departmentId: z.string().min(1, 'Department is required'),
  courseId: z.string().min(1, 'Course is required'),
  semesterId: z.string().min(1, 'Semester is required'),
  credits: z.number().min(0),
  lectureHours: z.number().min(0).optional(),
  tutorialHours: z.number().min(0).optional(),
  practicalHours: z.number().min(0).optional(),
  totalHours: z.number().min(0),
  subjectType: z.nativeEnum(SubjectType),
  deliveryMode: z.array(z.nativeEnum(DeliveryMode)).min(1, 'Select at least one delivery mode'),
  language: z.string().optional(),
  prerequisiteSubjects: z.array(z.string()).optional(),
  status: z.nativeEnum(SubjectStatus),
  displayOrder: z.number().optional(),
  syllabusPdf: z.string().optional(),
  referenceBooks: z.array(z.string()).optional(),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  initialData?: Partial<ISubject>;
  onSubmit: (data: SubjectFormData) => void;
  isLoading?: boolean;
  schools?: any[];
  departments?: any[];
  courses?: any[];
  semesters?: any[];
  subjects?: any[]; // for prerequisites
}

export const SubjectForm: React.FC<SubjectFormProps> = ({ 
  initialData, onSubmit, isLoading, 
  schools = [], departments = [], courses = [], semesters = [], subjects = []
}) => {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      ...initialData,
      schoolId: initialData?.schoolId?._id || initialData?.schoolId || '',
      departmentId: initialData?.departmentId?._id || initialData?.departmentId || '',
      courseId: initialData?.courseId?._id || initialData?.courseId || '',
      semesterId: initialData?.semesterId?._id || initialData?.semesterId || '',
      credits: initialData?.credits || 0,
      lectureHours: initialData?.lectureHours || 0,
      tutorialHours: initialData?.tutorialHours || 0,
      practicalHours: initialData?.practicalHours || 0,
      totalHours: initialData?.totalHours || 0,
      subjectType: initialData?.subjectType || SubjectType.CORE,
      deliveryMode: initialData?.deliveryMode || [DeliveryMode.THEORY],
      language: initialData?.language || 'English',
      status: initialData?.status || SubjectStatus.ACTIVE,
      prerequisiteSubjects: initialData?.prerequisiteSubjects?.map((p: any) => p._id || p) || [],
      referenceBooks: initialData?.referenceBooks || [],
    } as any,
  });

  const lec = watch('lectureHours') || 0;
  const tut = watch('tutorialHours') || 0;
  const prac = watch('practicalHours') || 0;

  // Auto calculate total hours based on lec, tut, prac
  useEffect(() => {
    setValue('totalHours', (lec || 0) + (tut || 0) + (prac || 0));
  }, [lec, tut, prac, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
      
      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name *</label>
            <input {...register('subjectName')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
            {errors.subjectName && <p className="text-red-500 text-xs mt-1">{errors.subjectName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code *</label>
            <input {...register('subjectCode')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 uppercase" />
            {errors.subjectCode && <p className="text-red-500 text-xs mt-1">{errors.subjectCode.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Name</label>
            <input {...register('shortName')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea {...register('description')} rows={3} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
        </div>
      </div>

      {/* Academic Hierarchy */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Hierarchy Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
            <select {...register('courseId')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
              <option value="">Select Course</option>
              {courses.map(c => <option key={c._id} value={c._id}>{c.courseName}</option>)}
            </select>
            {errors.courseId && <p className="text-red-500 text-xs mt-1">{errors.courseId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
            <select {...register('semesterId')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
              <option value="">Select Semester</option>
              {semesters.map(s => <option key={s._id} value={s._id}>{s.semesterName || `Semester ${s.semesterNumber}`}</option>)}
            </select>
            {errors.semesterId && <p className="text-red-500 text-xs mt-1">{errors.semesterId.message}</p>}
          </div>
        </div>
      </div>

      {/* Course Structure & Hours */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Structure & Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject Type *</label>
            <select {...register('subjectType')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
              {SUBJECT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Mode(s) *</label>
            <Controller
              name="deliveryMode"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {DELIVERY_MODES.map(mode => (
                    <label key={mode.value} className="inline-flex items-center text-sm border p-1.5 rounded cursor-pointer hover:bg-gray-50">
                      <input 
                        type="checkbox" 
                        value={mode.value} 
                        checked={field.value?.includes(mode.value as any) || false}
                        onChange={(e) => {
                          const current = field.value || [];
                          const updated = e.target.checked 
                            ? [...current, mode.value]
                            : current.filter(v => v !== mode.value);
                          field.onChange(updated);
                        }}
                        className="mr-2"
                      />
                      {mode.label}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.deliveryMode && <p className="text-red-500 text-xs mt-1">{errors.deliveryMode.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Credits</label>
            <input type="number" {...register('credits', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
            {errors.credits && <p className="text-red-500 text-xs mt-1">{errors.credits.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Lec Hours</label>
            <input type="number" {...register('lectureHours', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Tut Hours</label>
            <input type="number" {...register('tutorialHours', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Prac Hours</label>
            <input type="number" {...register('practicalHours', { valueAsNumber: true })} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Total Hrs</label>
            <input type="number" {...register('totalHours', { valueAsNumber: true })} readOnly className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 font-bold" />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select {...register('status')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500">
              {SUBJECT_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input {...register('language')} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500" placeholder="e.g. English" />
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
        <button type="button" className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50">
          {isLoading ? 'Saving...' : 'Save Subject'}
        </button>
      </div>
    </form>
  );
};
