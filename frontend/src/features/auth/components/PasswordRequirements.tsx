import React from 'react';
import { motion } from 'framer-motion';

interface PasswordRequirement {
  id: string;
  label: string;
  isValid: boolean;
}

interface PasswordRequirementsProps {
  password?: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password = '' }) => {
  const requirements: PasswordRequirement[] = [
    { id: 'length', label: 'At least 12 characters', isValid: password.length >= 12 },
    { id: 'uppercase', label: 'One uppercase letter', isValid: /[A-Z]/.test(password) },
    { id: 'lowercase', label: 'One lowercase letter', isValid: /[a-z]/.test(password) },
    { id: 'number', label: 'One number', isValid: /\d/.test(password) },
    { id: 'special', label: 'One special character (@$!%*?&#)', isValid: /[@$!%*?&#]/.test(password) },
  ];

  return (
    <div className="mt-4 space-y-2 rounded-lg bg-gray-50/50 p-4 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Password Requirements:</p>
      <ul className="space-y-1.5 text-xs">
        {requirements.map((req) => (
          <motion.li
            key={req.id}
            initial={false}
            animate={{ color: req.isValid ? '#16a34a' : '#6b7280' }}
            className="flex items-center gap-2 transition-colors duration-200"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-gray-900 border shadow-sm border-gray-200 dark:border-gray-700">
              {req.isValid ? (
                <svg className="h-3 w-3 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              )}
            </span>
            <span className={req.isValid ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-500 dark:text-gray-400'}>
              {req.label}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
