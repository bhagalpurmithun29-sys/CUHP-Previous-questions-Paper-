import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { SemesterSelector } from './SemesterSelector';
import { PrerequisiteSelector } from './PrerequisiteSelector';

const subjectSchema = z.object({
  semesterId: z.string().min(1, "Semester selection is required"),
  subjectName: z.string().min(2, "Name must be at least 2 characters").max(150),
  subjectCode: z.string().min(2, "Code must be at least 2 characters").max(30).toUpperCase(),
  subjectType: z.enum(['CORE', 'ELECTIVE', 'PRACTICAL', 'PROJECT', 'SEMINAR', 'WORKSHOP', 'INTERNSHIP']).default('CORE'),
  credits: z.number().min(0, "Credits must be at least 0"),
  lectureHours: z.number().min(0).optional(),
  tutorialHours: z.number().min(0).optional(),
  practicalHours: z.number().min(0).optional(),
  totalHours: z.number().min(0).optional(),
  prerequisiteSubjects: z.array(z.string()).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE')
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  initialData?: any;
  onSubmit: (data: SubjectFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({ initialData, onSubmit, isSubmitting, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue, watch } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      semesterId: '',
      subjectName: '',
      subjectCode: '',
      subjectType: 'CORE',
      credits: 0,
      lectureHours: 0,
      tutorialHours: 0,
      practicalHours: 0,
      totalHours: 0,
      prerequisiteSubjects: [],
      status: 'ACTIVE'
    }
  });

  const [lec, tut, prac] = watch(['lectureHours', 'tutorialHours', 'practicalHours']);

  useEffect(() => {
    const total = (Number(lec) || 0) + (Number(tut) || 0) + (Number(prac) || 0);
    setValue('totalHours', total);
  }, [lec, tut, prac, setValue]);

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        semesterId: initialData.semesterId?._id || initialData.semesterId || '',
        prerequisiteSubjects: initialData.prerequisiteSubjects?.map((p: any) => p._id || p) || []
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-4">
          <Label htmlFor="semesterId">Parent Semester <span className="text-red-500">*</span></Label>
          <Controller
            name="semesterId"
            control={control}
            render={({ field }) => (
              <SemesterSelector value={field.value} onValueChange={field.onChange} />
            )}
          />
          {errors.semesterId && <p className="text-sm text-red-500">{errors.semesterId.message}</p>}
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
          <Label htmlFor="subjectName">Subject Name <span className="text-red-500">*</span></Label>
          <Input id="subjectName" {...register('subjectName')} placeholder="e.g. Advanced Data Structures" />
          {errors.subjectName && <p className="text-sm text-red-500">{errors.subjectName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subjectCode">Subject Code <span className="text-red-500">*</span></Label>
          <Input id="subjectCode" {...register('subjectCode')} placeholder="e.g. CS501" className="uppercase" />
          {errors.subjectCode && <p className="text-sm text-red-500">{errors.subjectCode.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Subject Type</Label>
          <Select defaultValue={initialData?.subjectType || "CORE"} onValueChange={(v) => setValue('subjectType', v as any)}>
            <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CORE">Core (Theory)</SelectItem>
              <SelectItem value="ELECTIVE">Elective</SelectItem>
              <SelectItem value="PRACTICAL">Practical / Lab</SelectItem>
              <SelectItem value="PROJECT">Project</SelectItem>
              <SelectItem value="SEMINAR">Seminar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Total Credits <span className="text-red-500">*</span></Label>
          <Input id="credits" type="number" step="0.5" {...register('credits', { valueAsNumber: true })} />
          {errors.credits && <p className="text-sm text-red-500">{errors.credits.message}</p>}
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

        <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
          <Label>Prerequisite Subjects</Label>
          <Controller
            name="prerequisiteSubjects"
            control={control}
            render={({ field }) => (
              <PrerequisiteSelector value={field.value || []} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-4 bg-muted/30 p-4 rounded-md border mt-2">
          <h4 className="text-sm font-semibold mb-2">Hours Distribution (L-T-P)</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Lecture (L)</Label>
              <Input type="number" {...register('lectureHours', { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Tutorial (T)</Label>
              <Input type="number" {...register('tutorialHours', { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Practical (P)</Label>
              <Input type="number" {...register('practicalHours', { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label>Total Hours</Label>
              <Input type="number" disabled {...register('totalHours', { valueAsNumber: true })} className="bg-muted font-bold" />
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? 'Update Subject' : 'Create Subject'}
        </Button>
      </div>
    </form>
  );
};
