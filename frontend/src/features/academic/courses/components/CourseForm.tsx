import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { DepartmentSelector } from './DepartmentSelector';

const courseSchema = z.object({
  departmentId: z.string().min(1, "Department selection is required"),
  courseName: z.string().min(3, "Name must be at least 3 characters").max(150),
  courseCode: z.string().min(2, "Code must be at least 2 characters").max(20).toUpperCase(),
  degree: z.string().max(100).optional(),
  programType: z.enum(['REGULAR', 'DISTANCE', 'ONLINE', 'HYBRID']).default('REGULAR'),
  duration: z.number().min(0, "Duration must be positive"),
  durationUnit: z.enum(['YEARS', 'MONTHS', 'SEMESTERS']).default('YEARS'),
  totalSemesters: z.number().min(1, "At least 1 semester").max(20, "Maximum 20 semesters"),
  credits: z.number().min(0).optional(),
  description: z.string().max(1000).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  initialData?: any;
  onSubmit: (data: CourseFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit, isSubmitting, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      departmentId: '',
      courseName: '',
      courseCode: '',
      degree: '',
      programType: 'REGULAR',
      duration: 2,
      durationUnit: 'YEARS',
      totalSemesters: 4,
      credits: 0,
      description: '',
      status: 'ACTIVE'
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        departmentId: initialData.departmentId?._id || initialData.departmentId || ''
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
          <Label htmlFor="departmentId">Parent Department <span className="text-red-500">*</span></Label>
          <Controller
            name="departmentId"
            control={control}
            render={({ field }) => (
              <DepartmentSelector value={field.value} onValueChange={field.onChange} />
            )}
          />
          {errors.departmentId && <p className="text-sm text-red-500">{errors.departmentId.message}</p>}
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-2">
          <Label htmlFor="courseName">Course Name <span className="text-red-500">*</span></Label>
          <Input id="courseName" {...register('courseName')} placeholder="e.g. Master of Computer Applications" />
          {errors.courseName && <p className="text-sm text-red-500">{errors.courseName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="courseCode">Course Code <span className="text-red-500">*</span></Label>
          <Input id="courseCode" {...register('courseCode')} placeholder="e.g. MCA" className="uppercase" />
          {errors.courseCode && <p className="text-sm text-red-500">{errors.courseCode.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Degree Type</Label>
          <Input id="degree" {...register('degree')} placeholder="e.g. PG, UG, Diploma" />
        </div>

        <div className="space-y-2">
          <Label>Program Type</Label>
          <Select defaultValue={initialData?.programType || "REGULAR"} onValueChange={(v) => setValue('programType', v as any)}>
            <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="REGULAR">Regular</SelectItem>
              <SelectItem value="DISTANCE">Distance</SelectItem>
              <SelectItem value="ONLINE">Online</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Total Semesters <span className="text-red-500">*</span></Label>
          <Input id="totalSemesters" type="number" {...register('totalSemesters', { valueAsNumber: true })} />
          {errors.totalSemesters && <p className="text-sm text-red-500">{errors.totalSemesters.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Duration <span className="text-red-500">*</span></Label>
          <div className="flex gap-2">
            <Input id="duration" type="number" {...register('duration', { valueAsNumber: true })} className="w-1/2" />
            <Select defaultValue={initialData?.durationUnit || "YEARS"} onValueChange={(v) => setValue('durationUnit', v as any)}>
              <SelectTrigger className="w-1/2"><SelectValue placeholder="Unit" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="YEARS">Years</SelectItem>
                <SelectItem value="MONTHS">Months</SelectItem>
                <SelectItem value="SEMESTERS">Semesters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Total Credits</Label>
          <Input id="credits" type="number" {...register('credits', { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select defaultValue={initialData?.status || "ACTIVE"} onValueChange={(v) => setValue('status', v as any)}>
            <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register('description')} rows={3} placeholder="Brief description of the course..." />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? 'Update Course' : 'Create Course'}
        </Button>
      </div>
    </form>
  );
};
