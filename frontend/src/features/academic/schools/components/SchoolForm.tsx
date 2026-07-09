import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const schoolSchema = z.object({
  schoolName: z.string().min(3, "Name must be at least 3 characters").max(100),
  schoolCode: z.string().min(2, "Code must be at least 2 characters").max(10).toUpperCase(),
  shortName: z.string().max(20).optional(),
  description: z.string().max(1000).optional(),
  deanName: z.string().max(100).optional(),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal('')),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
});

type SchoolFormValues = z.infer<typeof schoolSchema>;

interface SchoolFormProps {
  initialData?: any;
  onSubmit: (data: SchoolFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ initialData, onSubmit, isSubmitting, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      schoolName: '',
      schoolCode: '',
      shortName: '',
      description: '',
      deanName: '',
      email: '',
      phone: '',
      website: '',
      status: 'ACTIVE'
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="schoolName">School Name <span className="text-red-500">*</span></Label>
          <Input id="schoolName" {...register('schoolName')} placeholder="e.g. School of Earth Sciences" />
          {errors.schoolName && <p className="text-sm text-red-500">{errors.schoolName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolCode">School Code <span className="text-red-500">*</span></Label>
          <Input id="schoolCode" {...register('schoolCode')} placeholder="e.g. SES" className="uppercase" />
          {errors.schoolCode && <p className="text-sm text-red-500">{errors.schoolCode.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortName">Short Name</Label>
          <Input id="shortName" {...register('shortName')} placeholder="e.g. Earth Sciences" />
          {errors.shortName && <p className="text-sm text-red-500">{errors.shortName.message}</p>}
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register('description')} rows={3} placeholder="Brief description of the school..." />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deanName">Dean's Name</Label>
          <Input id="deanName" {...register('deanName')} placeholder="e.g. Dr. John Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="dean.ses@cuhp.ac.in" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Contact Phone</Label>
          <Input id="phone" {...register('phone')} placeholder="+91 XXXXX XXXXX" />
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
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {initialData ? 'Update School' : 'Create School'}
        </Button>
      </div>
    </form>
  );
};
