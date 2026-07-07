import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  let score = 0;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const getStrengthColor = () => {
    if (score === 0) return 'bg-gray-200';
    if (score <= 2) return 'bg-red-500';
    if (score <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (score === 0) return '';
    if (score <= 2) return 'Weak';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="mt-3">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className={`h-full ${getStrengthColor()}`}
          initial={{ width: '0%' }}
          animate={{ width: `${(score / 5) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="mt-1 flex justify-end">
        <span className="text-xs font-medium text-gray-500">{getStrengthText()}</span>
      </div>
    </div>
  );
};
