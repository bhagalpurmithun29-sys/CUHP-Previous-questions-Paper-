import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProfile } from '../hooks/useAccount';

export const ProfileInformation: React.FC<{ profile: any }> = ({ profile }) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      bio: profile.bio || '',
      contactNumber: profile.contactNumber || ''
    }
  });

  const onSubmit = (data: any) => {
    updateProfile({ profileData: data });
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">First Name</label>
            <input 
              {...register('firstName')} 
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Last Name</label>
            <input 
              {...register('lastName')} 
              className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Bio</label>
          <textarea 
            {...register('bio')} 
            rows={3} 
            className="w-full px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Contact Number</label>
          <input 
            {...register('contactNumber')} 
            className="w-full max-w-sm px-3 py-2 bg-muted/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" 
          />
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
