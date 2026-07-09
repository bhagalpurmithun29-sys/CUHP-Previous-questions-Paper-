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
import { SchoolSelector } from './SchoolSelector';

const departmentSchema = z.object({
  schoolId: z.string().min(1, "School selection is required"),
  departmentName: z.string().min(3, "Name must be at least 3 characters").max(100),
  departmentCode: z.string().min(2, "Code must be at least 2 characters").max(10).toUpperCase(),
  description: z.string().max(1000).optional(),
  hodName: z.string().max(100).optional(),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
  initialData?: any;
  onSubmit: (data: DepartmentFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialData, onSubmit, isSubmitting, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      schoolId: '',
      departmentName: '',
      departmentCode: '',
      description: '',
      hodName: '',
      email: '',
      phone: '',
      website: '',
      status: 'ACTIVE'
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        schoolId: initialData.schoolId?._id || initialData.schoolId || ''
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="schoolId">Parent School <span className="text-red-500">*</span></Label>
          <Controller
            name="schoolId"
            control={control}
            render={({ field }) => (
              <SchoolSelector value={field.value} onValueChange={field.onChange} />
            )}
          />
          {errors.schoolId && <p className="text-sm text-red-500">{errors.schoolId.message}</p>}
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="departmentName">Department Name <span className="text-red-500">*</span></Label>
          <Input id="departmentName" {...register('departmentName')} placeholder="e.g. Department of Computer Science" />
          {errors.departmentName && <p className="text-sm text-red-500">{errors.departmentName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="departmentCode">Department Code <span className="text-red-500">*</span></Label>
          <Input id="departmentCode" {...register('departmentCode')} placeholder="e.g. CS" className="uppercase" />
          {errors.departmentCode && <p className="text-sm text-red-500">{errors.departmentCode.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select defaultValue={initialData?.status || "ACTIVE"} onValueChange={(v) => setValue('status', v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register('description')} rows={3} placeholder="Brief description of the department..." />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hodName">HOD Name</Label>
          <Input id="hodName" {...register('hodName')} placeholder="e.g. Dr. Jane Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="hod.cs@cuhp.ac.in" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Contact Phone</Label>
          <Input id="phone" {...register('phone')} placeholder="+91 XXXXX XXXXX" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" {...register('website')} placeholder="https://..." />
          {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
        </div>

      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? 'Update Department' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
};
