import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score, label: 'None', color: 'bg-gray-200 dark:bg-gray-700' };

    if (pass.length > 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[@$!%*?&#]/.test(pass)) score += 1;

    switch (score) {
      case 0:
      case 1:
        return { score, label: 'Weak', color: 'bg-red-500' };
      case 2:
      case 3:
        return { score, label: 'Fair', color: 'bg-yellow-500' };
      case 4:
        return { score, label: 'Good', color: 'bg-blue-500' };
      case 5:
        return { score, label: 'Strong', color: 'bg-green-500' };
      default:
        return { score: 0, label: 'None', color: 'bg-gray-200 dark:bg-gray-700' };
    }
  };

  const strength = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-transparent">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            initial={{ opacity: 0.5 }}
            animate={{ 
              opacity: level <= strength.score ? 1 : 0.3,
              backgroundColor: level <= strength.score ? undefined : '#e5e7eb'
            }}
            className={`h-full flex-1 ${level <= strength.score ? strength.color : 'dark:!bg-gray-700'}`}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-end">
        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Strength: {strength.label}
        </span>
      </div>
    </div>
  );
};
