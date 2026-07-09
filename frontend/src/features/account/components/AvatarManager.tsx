import React from 'react';
import { useUploadAvatar, useRemoveAvatar } from '../hooks/useAccount';
import { UserIcon } from '@heroicons/react/24/outline';

export const AvatarManager: React.FC<{ profile: any }> = ({ profile }) => {
  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const { mutate: removeAvatar, isPending: isRemoving } = useRemoveAvatar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Typically upload to a storage provider here, then save URL.
      // For now, using object URL as placeholder.
      const url = URL.createObjectURL(e.target.files[0]);
      uploadAvatar(url);
    }
  };

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-muted flex items-center justify-center bg-muted/50 flex-shrink-0">
        {profile.profileImage ? (
          <img src={profile.profileImage} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <UserIcon className="w-12 h-12 text-muted-foreground" />
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Profile Picture</h3>
        <p className="text-sm text-muted-foreground mb-4">PNG, JPG up to 5MB.</p>
        <div className="flex gap-3">
          <label className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg cursor-pointer hover:bg-primary/90 text-sm">
            {isUploading ? 'Uploading...' : 'Upload New'}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading || isRemoving} />
          </label>
          {profile.profileImage && (
            <button 
              onClick={() => removeAvatar()} 
              disabled={isUploading || isRemoving}
              className="px-4 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-muted text-sm"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
