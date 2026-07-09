import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import { useResetPassword } from '../hooks/useResetPassword';
import { RESET_PASSWORD_CONSTANTS } from '../constants/resetPassword.constants';
import type { ResetPasswordFormValues } from '../schemas/resetPassword.schema';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const { resetPassword, loading, success } = useResetPassword();
  const [invalidToken, setInvalidToken] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!token) {
      setInvalidToken(true);
    }
  }, [token]);

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/login', { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [success, navigate]);

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (token) {
      resetPassword({ token, password: data.password });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-gradient-to-tl from-primary-light/20 to-transparent blur-3xl"
        />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 p-8 sm:p-10 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl dark:ring-white/10">
          <AnimatePresence mode="wait">
            {invalidToken ? (
              <motion.div
                key="invalid-token"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                  <FiAlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Invalid Link</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                  {RESET_PASSWORD_CONSTANTS.MESSAGES.MISSING_TOKEN}
                </p>
                <Link
                  to="/forgot-password"
                  className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-primary-dark transition-all"
                >
                  Request New Link
                </Link>
              </motion.div>
            ) : !success ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-6 h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center dark:bg-primary/20">
                    <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {RESET_PASSWORD_CONSTANTS.MESSAGES.TITLE}
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {RESET_PASSWORD_CONSTANTS.MESSAGES.SUBTITLE}
                  </p>
                </div>
                
                <ResetPasswordForm onSubmit={onSubmit} isLoading={loading} />
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6"
                >
                  <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_TITLE}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 px-2">
                  {RESET_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_MESSAGE}
                </p>
                
                <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1 md:flex md:justify-between">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Redirecting to login in {countdown} seconds...
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/login"
                  className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-primary-dark transition-all"
                >
                  Go to Login Now
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          {!success && !invalidToken && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-center"
            >
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                &larr; {RESET_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
