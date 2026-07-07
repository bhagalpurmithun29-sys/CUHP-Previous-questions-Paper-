import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ResendVerificationSchema } from '../schemas/resend-verification.schema';
import { useResendVerification } from '../hooks/useResendVerification';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';
import type { ResendVerificationFormData } from '../types/email-verification.types';

export const ResendVerificationPage: React.FC = () => {
  const { resendVerification, isLoading, isSuccess, reset } = useResendVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendVerificationFormData>({
    resolver: zodResolver(ResendVerificationSchema),
  });

  const onSubmit = (data: ResendVerificationFormData) => {
    resendVerification(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 shadow-sm sm:rounded-2xl sm:border sm:border-gray-100">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_TITLE}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_DESC}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    disabled={isLoading}
                    {...register('email')}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50 transition-colors"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
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
                    EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_BUTTON
                  )}
                </button>

                <div className="text-center text-sm">
                  <Link to="/login" className="font-medium text-gray-600 hover:text-black transition-colors">
                    Back to Login
                  </Link>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
              className="text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-6">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
              <p className="text-sm text-gray-600 mb-8">
                {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUCCESS}
              </p>
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  Back to Login
                </Link>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Try another email
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
