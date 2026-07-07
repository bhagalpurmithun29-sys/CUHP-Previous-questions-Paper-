import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { useResetPassword } from '../hooks/useResetPassword';
import { RESET_PASSWORD_CONSTANTS } from '../constants/reset-password.constants';
import type { ResetPasswordFormData } from '../types/reset-password.types';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  const { resetPassword, isLoading, isSuccess } = useResetPassword();

  useEffect(() => {
    // In a real application, you might want to call an API to validate the token format or existence
    // Here we just do a simple client-side check to ensure a token is present in the URL
    if (token && token.trim().length > 10) {
      setIsTokenValid(true);
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) return;
    resetPassword({ token, newPassword: data.password });
  };

  if (isTokenValid === null) {
    return null; // or a loading spinner
  }

  if (isTokenValid === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 shadow-sm sm:rounded-2xl sm:border sm:border-gray-100 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-6">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Link</h2>
          <p className="text-sm text-gray-600 mb-8">
            {RESET_PASSWORD_CONSTANTS.MESSAGES.ERROR_MISSING_TOKEN}
          </p>
          <Link
            to="/forgot-password"
            className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

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
                  {RESET_PASSWORD_CONSTANTS.MESSAGES.TITLE}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  {RESET_PASSWORD_CONSTANTS.MESSAGES.SUBTITLE}
                </p>
              </div>
              <ResetPasswordForm onSubmit={onSubmit} isLoading={isLoading} />
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_TITLE}
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                {RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_DESC}
              </p>
              <Link
                to="/login"
                className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
              >
                {RESET_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
