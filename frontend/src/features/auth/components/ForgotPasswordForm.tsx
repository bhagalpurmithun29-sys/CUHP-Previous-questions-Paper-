import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ForgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas/forgotPassword.schema';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgotPassword.constants';

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormValues) => void;
  isLoading: boolean;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onTouched',
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-sm mx-auto"
      noValidate
    >
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isLoading}
            {...register('email')}
            className={`block w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${
              errors.email
                ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:text-red-100'
                : 'border-gray-300 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:text-white dark:focus:border-primary-light dark:focus:ring-primary-light'
            } disabled:opacity-50`}
            placeholder="student@cuhp.ac.in"
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            id="email-error"
            className="text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON
        )}
      </motion.button>
    </motion.form>
  );
};
