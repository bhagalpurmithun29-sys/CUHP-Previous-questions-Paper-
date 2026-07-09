import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { FORGOT_PASSWORD_CONSTANTS } from '../constants/forgotPassword.constants';
import type { ForgotPasswordFormValues } from '../schemas/forgotPassword.schema';

export const ForgotPasswordPage: React.FC = () => {
  const { submit, loading, success, reset } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    submit(data);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-gradient-to-tl from-primary-light/20 to-transparent blur-3xl"
        />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Glassmorphism Card */}
        <div className="overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 p-8 sm:p-10 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl dark:ring-white/10">
          <AnimatePresence mode="wait">
            {!success ? (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {FORGOT_PASSWORD_CONSTANTS.MESSAGES.TITLE}
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUBTITLE}
                  </p>
                </div>
                
                <ForgotPasswordForm onSubmit={onSubmit} isLoading={loading} />
                
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
                className="text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-6"
                >
                  <svg
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 px-2">
                  {FORGOT_PASSWORD_CONSTANTS.MESSAGES.SUCCESS_GENERIC}
                </p>
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="flex w-full justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all active:scale-[0.98]"
                  >
                    {FORGOT_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
                  </Link>
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Didn't receive an email? Try again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom Back To Login link when form is active */}
        <AnimatePresence>
          {!success && (
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
                &larr; {FORGOT_PASSWORD_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
