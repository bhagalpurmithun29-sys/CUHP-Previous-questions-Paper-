import React from 'react';
import { useForm } from 'react-hook-form';

interface ProfileData {
  firstName: string;
  lastName: string;
  bio: string;
}

export const ProfileStep: React.FC<{ onNext: (data: any) => void; initialData?: any }> = ({ onNext, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    defaultValues: initialData || {}
  });

  const onSubmit = (data: ProfileData) => {
    onNext({ profileData: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Let's get to know you</h2>
        <p className="text-muted-foreground">Please provide your basic details so we can personalize your experience.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input 
            {...register('firstName', { required: 'First name is required' })}
            className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John"
          />
          {errors.firstName && <span className="text-destructive text-sm mt-1">{errors.firstName.message}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input 
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Doe"
          />
          {errors.lastName && <span className="text-destructive text-sm mt-1">{errors.lastName.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio (Optional)</label>
        <textarea 
          {...register('bio')}
          rows={4}
          className="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell us a little bit about yourself, your academic goals, or interests."
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-border mt-8">
        <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
          Continue
        </button>
      </div>
    </form>
  );
};
