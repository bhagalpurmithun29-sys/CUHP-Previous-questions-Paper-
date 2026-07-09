import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '../hooks/useAccount';

export const AcademicInformation: React.FC<{ profile: any }> = ({ profile }) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      department: profile.department || '',
      course: profile.course || '',
      semester: profile.semester || '',
      enrollmentYear: profile.enrollmentYear || '',
      graduationYear: profile.graduationYear || ''
    }
  });

  const onSubmit = (data: any) => {
    updateProfile({ academicData: data });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Academic Profile</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Department</label>
            <input 
              {...register('department')} 
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Course</label>
            <input 
              {...register('course')} 
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Semester</label>
            <input 
              type="number"
              {...register('semester')} 
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Enrollment Year</label>
            <input 
              type="number"
              {...register('enrollmentYear')} 
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Graduation Year</label>
            <input 
              type="number"
              {...register('graduationYear')} 
              placeholder="Expected"
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={isPending} className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
