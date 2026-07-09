import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  password?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = '' }) => {
  let score = 0;
  if (password.length > 0) {
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[@$!%*?&]/.test(password)) score += 1;
  }

  const getStrengthData = () => {
    switch (score) {
      case 0: return { label: 'Empty', color: 'bg-gray-200 dark:bg-gray-700', width: '0%' };
      case 1:
      case 2: return { label: 'Weak', color: 'bg-destructive', width: '33%' };
      case 3:
      case 4: return { label: 'Moderate', color: 'bg-warning', width: '66%' };
      case 5: return { label: 'Strong', color: 'bg-success', width: '100%' };
      default: return { label: 'Empty', color: 'bg-gray-200 dark:bg-gray-700', width: '0%' };
    }
  };

  const { label, color, width } = getStrengthData();
  const textColor = password.length > 0 ? color.replace('bg-', 'text-') : 'text-gray-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Password Strength</span>
        <motion.span 
          key={label}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs font-bold \${textColor}`}
        >
          {password.length > 0 ? label : ''}
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className={`h-1.5 rounded-full \${color}`}
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
