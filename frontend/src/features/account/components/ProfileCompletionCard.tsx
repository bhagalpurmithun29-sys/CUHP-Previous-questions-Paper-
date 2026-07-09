import React from 'react';
import { motion } from 'framer-motion';

export const ProfileCompletionCard: React.FC<{ profile: any }> = ({ profile }) => {
  let score = 0;
  if (profile.firstName) score += 20;
  if (profile.lastName) score += 20;
  if (profile.department) score += 20;
  if (profile.profileImage) score += 20;
  if (profile.bio) score += 20;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 relative z-10">Profile Completion</h3>
      <p className="text-sm text-muted-foreground mb-4 relative z-10 max-w-xs">
        Complete your profile to unlock all features and improve your network visibility.
      </p>

      <div className="mb-2 flex justify-between text-sm font-bold text-primary relative z-10">
        <span>{score}%</span>
      </div>
      <div className="h-2.5 w-full bg-primary/10 rounded-full overflow-hidden relative z-10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `\${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
};
