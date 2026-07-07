import React from 'react';
import { motion } from 'framer-motion';

interface PasswordChecklistProps {
  password: string;
}

export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({ password }) => {
  const requirements = [
    { label: 'At least 12 characters', valid: password.length >= 12 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
    { label: 'One number', valid: /[0-9]/.test(password) },
    { label: 'One special character (@$!%*?&)', valid: /[@$!%*?&]/.test(password) },
  ];

  return (
    <div className="mt-2 text-sm">
      <ul className="space-y-1">
        {requirements.map((req, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: req.valid ? '#10B981' : '#D1D5DB', // Emerald-500 vs Gray-300
                scale: req.valid ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 rounded-full flex items-center justify-center text-white"
            >
              {req.valid ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              )}
            </motion.div>
            <span className={`transition-colors duration-300 ${req.valid ? 'text-emerald-700 font-medium' : 'text-gray-500'}`}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
