import React from 'react';
import { motion } from 'framer-motion';
import type { PasswordRequirement } from '../types/reset-password.types';

const REQUIREMENTS: PasswordRequirement[] = [
  { id: 'length', label: 'At least 12 characters', regex: /.{12,}/ },
  { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'One number', regex: /[0-9]/ },
  { id: 'special', label: 'One special character', regex: /[^A-Za-z0-9]/ },
];

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Password Requirements</p>
      <ul className="space-y-1.5">
        {REQUIREMENTS.map((req) => {
          const isMet = req.regex.test(password);
          return (
            <motion.li
              key={req.id}
              className={`flex items-center text-sm ${isMet ? 'text-green-600' : 'text-gray-500'}`}
              initial={false}
              animate={{ color: isMet ? '#16a34a' : '#6b7280' }}
            >
              <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border">
                {isMet ? (
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              {req.label}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
