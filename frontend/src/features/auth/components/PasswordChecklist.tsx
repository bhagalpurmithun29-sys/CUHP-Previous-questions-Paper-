import React from 'react';
import { motion } from 'framer-motion';

interface PasswordChecklistProps {
  password?: string;
}

export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({ password = '' }) => {
  const requirements = [
    { label: 'At least 12 characters', valid: password.length >= 12 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /[0-9]/.test(password) },
    { label: 'One special character', valid: /[@$!%*?&]/.test(password) },
  ];

  return (
    <div className="text-xs">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
        {requirements.map((req, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: req.valid ? '#10B981' : 'transparent', // success color
                borderColor: req.valid ? '#10B981' : '#9CA3AF',
                scale: req.valid ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-colors"
            >
              {req.valid ? (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
            </motion.div>
            <span className={`transition-colors duration-300 \${req.valid ? 'text-success font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
