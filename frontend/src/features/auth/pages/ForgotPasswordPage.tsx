import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgot-password.constants';
import type { ForgotPasswordFormData } from '../types/forgot-password.types';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword, isLoading, isSuccess, reset } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data);
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
                  {FORGOT_PASSWORD_CONSTANTS.MESSAGES.TITLE}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  {FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBTITLE}
                </p>
              </div>
              <ForgotPasswordForm onSubmit={onSubmit} isLoading={isLoading} />
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
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
              <p className="text-sm text-gray-600 mb-8">
                {FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_GENERIC}
              </p>
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all active:scale-[0.98]"
                >
                  {FORGOT_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
                </Link>
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Didn't receive an email? Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
