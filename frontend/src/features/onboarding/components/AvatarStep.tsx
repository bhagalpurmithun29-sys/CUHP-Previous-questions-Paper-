import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

export const AvatarStep: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Create object URL for preview (in production upload to storage provider like Cloudinary first)
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatar(url);
    }
  };

  const onSubmit = () => {
    onNext({ avatarData: { profileImage: avatar } });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Upload an Avatar</h2>
        <p className="text-muted-foreground">Add a face to your name to personalize your profile.</p>
      </div>

      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted flex items-center justify-center bg-muted/50">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow-lg hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-border mt-8 gap-3">
        <button type="button" onClick={() => onNext({ skipped: true })} className="px-6 py-3 bg-muted/50 text-foreground font-semibold rounded-xl hover:bg-muted">
          Skip
        </button>
        <button onClick={onSubmit} className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl">
          Continue
        </button>
      </div>
    </div>
  );
};
