import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, ExclamationCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { loginSchema, LoginFormValues } from '../schemas/index';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { VerificationCodeInput } from '../../security/components/VerificationCodeInput';
import { RecoveryFlow } from '../../security/components/RecoveryFlow';
import axios from 'axios';
import { useLogin } from '../hooks/useLogin';

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mfaState, setMfaState] = useState<{ required: boolean; token: string; useRecovery: boolean }>({ required: false, token: '', useRecovery: false });
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [isVerifyingMfa, setIsVerifyingMfa] = useState(false);
  const navigate = useNavigate();

  const { mutate: loginUser, isPending: isLoggingIn, error } = useLogin();

  const isPending = isLoggingIn || isVerifyingMfa;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data, {
      onSuccess: (resData) => {
        if (resData.mfaRequired && resData.mfaToken) {
          setMfaState({ required: true, token: resData.mfaToken, useRecovery: false });
        }
      }
    });
  };

  const handleMfaVerify = async (code: string) => {
    setIsVerifyingMfa(true);
    setMfaError(null);
    try {
      const res = await axios.post('/api/v1/auth/login/mfa', {
        mfaToken: mfaState.token,
        code,
        isRecovery: false
      });
      localStorage.setItem('token', res.data.data.accessToken);
      // Navigate or invalidate queries
      navigate('/dashboard');
    } catch (err: any) {
      setMfaError(err.response?.data?.message || 'Invalid verification code');
    } finally {
      setIsVerifyingMfa(false);
    }
  };

  const handleRecoverySuccess = (data: any) => {
    localStorage.setItem('token', data.data.accessToken);
    navigate('/dashboard');
  };

  const apiErrorMessage = error ? (error as any).response?.data?.message || 'Invalid email or password' : null;

  if (mfaState.required) {
    if (mfaState.useRecovery) {
      return (
        <RecoveryFlow 
          onSuccess={handleRecoverySuccess} 
          onCancel={() => setMfaState(s => ({ ...s, useRecovery: false }))} 
        />
      );
    }

    return (
      <div className="w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <LockClosedIcon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>

        <AnimatePresence>
          {mfaError && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="flex items-center p-3 mb-4 text-sm text-destructive border border-destructive/20 rounded-xl bg-destructive/10"
            >
              <ExclamationCircleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{mfaError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="py-4">
          <VerificationCodeInput onComplete={handleMfaVerify} isLoading={isVerifyingMfa} />
        </div>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setMfaState(s => ({ ...s, useRecovery: true }))}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Use a recovery code
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full" noValidate aria-label="Login Form">
      <AnimatePresence>
        {apiErrorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center p-3 mb-4 text-sm text-destructive border border-destructive/20 rounded-xl bg-destructive/10"
          >
            <ExclamationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-2" />
            <span className="font-medium">{apiErrorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        <input
          id="email"
          type="email"
          autoComplete="email"
          disabled={isPending}
          {...register('email')}
          className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
            ${errors.email ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
          `}
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3 pointer-events-none
            ${errors.email ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
          `}
        >
          University Email
        </label>
        <EnvelopeIcon className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-destructive' : 'text-gray-400 group-focus-within:text-primary'}`} />
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative group pt-1">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          disabled={isPending}
          {...register('password')}
          className={`block w-full px-4 py-3.5 pr-12 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
            ${errors.password ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
          `}
          placeholder=" "
        />
        <label
          htmlFor="password"
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3 pointer-events-none
            ${errors.password ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
          `}
        >
          Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors"
        >
          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
        <AnimatePresence>
          {errors.password && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
              {errors.password.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <input
            id="remember-me"
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:checked:bg-primary transition-colors cursor-pointer"
          />
          <label htmlFor="remember-me" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Remember me
          </label>
        </div>
        <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          Forgot password?
        </Link>
      </div>

      <motion.button
        whileHover={!isPending ? { scale: 1.01 } : {}}
        whileTap={!isPending ? { scale: 0.98 } : {}}
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 mt-6"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Authenticating...
          </span>
        ) : (
          <>
            Login to Account
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
};
