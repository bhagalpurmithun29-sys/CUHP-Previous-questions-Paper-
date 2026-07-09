import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { CourseSelector } from './CourseSelector';
import { Switch } from '@/components/ui/switch';

const semesterSchema = z.object({
  courseId: z.string().min(1, "Course selection is required"),
  semesterNumber: z.number().min(1, "Semester number must be at least 1").max(20),
  semesterName: z.string().max(100).optional(),
  shortName: z.string().max(20).optional(),
  academicSession: z.string().max(50).optional(),
  academicYear: z.string().max(20).optional(),
  semesterType: z.enum(['REGULAR', 'SUMMER', 'WINTER', 'SUPPLEMENTARY']).default('REGULAR'),
  credits: z.number().min(0).optional(),
  isCurrentSemester: z.boolean().default(false),
  status: z.enum(['UPCOMING', 'CURRENT', 'COMPLETED', 'ARCHIVED']).default('UPCOMING'),
  startDate: z.string().optional(),
  endDate: z.string().optional()
});

type SemesterFormValues = z.infer<typeof semesterSchema>;

interface SemesterFormProps {
  initialData?: any;
  onSubmit: (data: SemesterFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const SemesterForm: React.FC<SemesterFormProps> = ({ initialData, onSubmit, isSubmitting, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<SemesterFormValues>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      courseId: '',
      semesterNumber: 1,
      semesterName: '',
      shortName: '',
      academicSession: '',
      academicYear: new Date().getFullYear().toString(),
      semesterType: 'REGULAR',
      credits: 0,
      isCurrentSemester: false,
      status: 'UPCOMING',
      startDate: '',
      endDate: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        courseId: initialData.courseId?._id || initialData.courseId || '',
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : '',
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
          <Label htmlFor="courseId">Parent Course <span className="text-red-500">*</span></Label>
          <Controller
            name="courseId"
            control={control}
            render={({ field }) => (
              <CourseSelector value={field.value} onValueChange={field.onChange} />
            )}
          />
          {errors.courseId && <p className="text-sm text-red-500">{errors.courseId.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="semesterNumber">Semester Number <span className="text-red-500">*</span></Label>
          <Input id="semesterNumber" type="number" {...register('semesterNumber', { valueAsNumber: true })} />
          {errors.semesterNumber && <p className="text-sm text-red-500">{errors.semesterNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="semesterName">Custom Name</Label>
          <Input id="semesterName" {...register('semesterName')} placeholder="e.g. Semester 1 - Foundation" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="academicYear">Academic Year</Label>
          <Input id="academicYear" {...register('academicYear')} placeholder="e.g. 2026-2027" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="academicSession">Academic Session</Label>
          <Input id="academicSession" {...register('academicSession')} placeholder="e.g. Autumn, Spring" />
        </div>

        <div className="space-y-2">
          <Label>Semester Type</Label>
          <Select defaultValue={initialData?.semesterType || "REGULAR"} onValueChange={(v) => setValue('semesterType', v as any)}>
            <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="REGULAR">Regular</SelectItem>
              <SelectItem value="SUMMER">Summer</SelectItem>
              <SelectItem value="WINTER">Winter</SelectItem>
              <SelectItem value="SUPPLEMENTARY">Supplementary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Total Credits</Label>
          <Input id="credits" type="number" {...register('credits', { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select defaultValue={initialData?.status || "UPCOMING"} onValueChange={(v) => setValue('status', v as any)}>
            <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="CURRENT">Current</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input type="date" {...register('startDate')} />
        </div>
        
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input type="date" {...register('endDate')} />
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <Controller
            name="isCurrentSemester"
            control={control}
            render={({ field }) => (
              <Switch id="isCurrentSemester" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
          <Label htmlFor="isCurrentSemester" className="cursor-pointer">Mark as Current Semester for this Course</Label>
        </div>

      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? 'Update Semester' : 'Create Semester'}
        </Button>
      </div>
    </form>
  );
};
