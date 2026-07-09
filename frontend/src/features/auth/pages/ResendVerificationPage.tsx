import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useResendVerification } from '../hooks/useResendVerification';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';
import { ResendVerificationSchema, type ResendVerificationFormValues } from '../schemas/resendVerification.schema';
import { FiMail, FiCheckCircle } from 'react-icons/fi';

export const ResendVerificationPage: React.FC = () => {
  const { resend, loading, success, reset } = useResendVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendVerificationFormValues>({
    resolver: zodResolver(ResendVerificationSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: ResendVerificationFormValues) => {
    resend(data);
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
                    <FiMail className="w-6 h-6 text-primary dark:text-primary-light" />
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_TITLE}
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUBTITLE}
                  </p>
                </div>
                
                <motion.form
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
                        disabled={loading}
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
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="flex w-full justify-center rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  >
                    {loading ? (
                      <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUBMIT_BUTTON
                    )}
                  </motion.button>
                </motion.form>
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check your inbox</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 px-2">
                  {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.RESEND_SUCCESS}
                </p>
                <div className="space-y-4">
                  <Link
                    to="/login"
                    className="flex w-full justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all active:scale-[0.98]"
                  >
                    {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
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
                &larr; {EMAIL_VERIFICATION_CONSTANTS.MESSAGES.BACK_TO_LOGIN}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
