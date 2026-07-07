import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
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
      case 0: return { label: 'Empty', color: 'bg-gray-200', width: '0%' };
      case 1:
      case 2: return { label: 'Weak', color: 'bg-red-500', width: '33%' };
      case 3:
      case 4: return { label: 'Moderate', color: 'bg-yellow-500', width: '66%' };
      case 5: return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
      default: return { label: 'Empty', color: 'bg-gray-200', width: '0%' };
    }
  };

  const { label, color, width } = getStrengthData();

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-500">Password Strength</span>
        <span className={`text-xs font-bold ${color.replace('bg-', 'text-')}`}>
          {password.length > 0 ? label : ''}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className={`h-1.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
