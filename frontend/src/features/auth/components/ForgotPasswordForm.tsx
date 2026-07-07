import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ForgotPasswordSchema } from '../schemas/forgot-password.schema';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgot-password.constants';
import type { ForgotPasswordFormData } from '../types/forgot-password.types';

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void;
  isLoading: boolean;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isLoading}
          {...register('email')}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
          placeholder="you@example.com"
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            id="email-error"
            className="text-sm text-red-600"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 transition-all active:scale-[0.98]"
      >
        {isLoading ? (
          <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBMIT_BUTTON
        )}
      </button>

      <div className="text-center text-sm">
        <Link
          to="/login"
          className="font-medium text-gray-600 hover:text-black transition-colors"
        >
          {FORGOT_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
        </Link>
      </div>
    </motion.form>
  );
};
