import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ResetPasswordSchema, type ResetPasswordFormValues } from '../schemas/resetPassword.schema';
import { RESET_PASSWORD_CONSTANTS } from '../constants/resetPassword.constants';
import { PasswordRequirements } from './PasswordRequirements';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormValues) => void;
  isLoading: boolean;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password');

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full max-w-sm mx-auto"
      noValidate
    >
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          New Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            disabled={isLoading}
            {...register('password')}
            className={`block w-full rounded-lg border py-3 pl-10 pr-10 text-sm placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${
              errors.password
                ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:text-red-100'
                : 'border-gray-300 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:text-white dark:focus:border-primary-light dark:focus:ring-primary-light'
            } disabled:opacity-50`}
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        </div>
        
        <PasswordStrengthMeter password={passwordValue} />
        
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="password-error"
              className="text-sm text-red-600 dark:text-red-400 mt-1"
              role="alert"
            >
              {errors.password.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
            disabled={isLoading}
            {...register('confirmPassword')}
            className={`block w-full rounded-lg border py-3 pl-10 pr-10 text-sm placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${
              errors.confirmPassword
                ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:text-red-100'
                : 'border-gray-300 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-600 dark:text-white dark:focus:border-primary-light dark:focus:ring-primary-light'
            } disabled:opacity-50`}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="confirm-password-error"
              className="text-sm text-red-600 dark:text-red-400 mt-1"
              role="alert"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <PasswordRequirements password={passwordValue} />

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="mt-6 flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          RESET_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON
        )}
      </motion.button>
    </motion.form>
  );
};
