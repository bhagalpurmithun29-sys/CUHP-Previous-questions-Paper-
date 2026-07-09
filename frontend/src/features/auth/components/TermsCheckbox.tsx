import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { RegisterFormValues } from '../schemas/register.schema';
import { motion, AnimatePresence } from 'framer-motion';

interface TermsCheckboxProps {
  register: UseFormRegister<RegisterFormValues>;
  error?: FieldError;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ register, error }) => {
  return (
    <div className="flex flex-col relative">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeToTerms"
            type="checkbox"
            {...register('agreeToTerms')}
            className={`w-4 h-4 rounded transition-colors cursor-pointer focus:ring-2 focus:ring-offset-2 dark:bg-gray-900 
              \${error 
                ? 'border-destructive text-destructive focus:ring-destructive/50' 
                : 'border-gray-300 dark:border-gray-700 text-primary focus:ring-primary'
              }`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="text-gray-600 dark:text-gray-400 cursor-pointer select-none">
            I agree to the <a href="/terms" className="font-semibold text-primary hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" className="font-semibold text-primary hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </label>
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-1 text-xs text-destructive">
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
