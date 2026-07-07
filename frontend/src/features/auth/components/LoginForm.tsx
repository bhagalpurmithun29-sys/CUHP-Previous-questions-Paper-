import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { loginSchema, LoginFormValues } from '../schemas/index';
// Assuming useLogin hook was generated matching the useRegister pattern
import { useLogin } from '../hooks/useLogin'; 

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginUser, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data);
  };

  // Extract error message from API if available
  const apiErrorMessage = error ? (error as any).response?.data?.message || 'Invalid email or password' : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full" noValidate aria-label="Login Form">
      
      <AnimatePresence>
        {apiErrorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center p-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
          >
            <ExclamationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-2" />
            <span className="font-medium">{apiErrorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          University Email
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isPending}
            {...register('email')}
            className={\`block w-full pl-10 pr-3 py-2.5 sm:text-sm rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200
              \${errors.email 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400'
              }\`}
            placeholder="student@cuhimachal.ac.in"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-red-600 mt-1"
              id="email-error"
              role="alert"
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            disabled={isPending}
            {...register('password')}
            className={\`block w-full pl-10 pr-10 py-2.5 sm:text-sm rounded-lg border focus:ring-2 focus:outline-none transition-all duration-200
              \${errors.password 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400'
              }\`}
            placeholder="••••••••••••"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-600 rounded-r-lg"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 transition-colors" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5 transition-colors" aria-hidden="true" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-red-600 mt-1"
              id="password-error"
              role="alert"
            >
              {errors.password.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            disabled={isPending}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-colors"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
            Remember me
          </label>
        </div>
      </div>

      <motion.button
        whileHover={!isPending ? { scale: 1.01 } : {}}
        whileTap={!isPending ? { scale: 0.98 } : {}}
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isPending ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : (
          'Sign in'
        )}
      </motion.button>
    </form>
  );
};
