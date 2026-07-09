import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { registerSchema, RegisterFormValues } from '../schemas/register.schema';
import { useRegister } from '../hooks/useRegister';
import { PasswordStrength } from './PasswordStrength';
import { PasswordChecklist } from './PasswordChecklist';
import { TermsCheckbox } from './TermsCheckbox';
import { motion, AnimatePresence } from 'framer-motion';

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: registerUser, isPending } = useRegister();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const passwordValue = watch('password', '');

  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="relative group">
          <input
            id="firstName"
            disabled={isPending}
            {...register('firstName')}
            className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
              \${errors.firstName ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
            `}
            placeholder=" "
          />
          <label
            htmlFor="firstName"
            className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none
              \${errors.firstName ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
            `}
          >
            First Name
          </label>
          <AnimatePresence>
            {errors.firstName && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
                {errors.firstName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Last Name */}
        <div className="relative group">
          <input
            id="lastName"
            disabled={isPending}
            {...register('lastName')}
            className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
              \${errors.lastName ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
            `}
            placeholder=" "
          />
          <label
            htmlFor="lastName"
            className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none
              \${errors.lastName ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
            `}
          >
            Last Name
          </label>
          <AnimatePresence>
            {errors.lastName && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
                {errors.lastName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Email */}
      <div className="relative group pt-1">
        <input
          id="email"
          type="email"
          disabled={isPending}
          {...register('email')}
          className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
            \${errors.email ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
          `}
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none
            \${errors.email ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
          `}
        >
          University Email
        </label>
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Academic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="relative group md:col-span-2">
          <select
            id="department"
            disabled={isPending}
            {...register('department')}
            className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
              \${errors.department ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
            `}
          >
            <option value="" className="text-gray-500">Select Department</option>
            <option value="60d5ec49f1b2c8a001123456" className="dark:bg-gray-900">Dept of Computer Science & Informatics</option>
          </select>
          <label
            htmlFor="department"
            className={`absolute text-sm transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 start-3 pointer-events-none
              \${errors.department ? 'text-destructive' : 'text-gray-500'}
            `}
          >
            Department
          </label>
          <AnimatePresence>
            {errors.department && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
                {errors.department.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="relative group">
          <select
            id="semester"
            disabled={isPending}
            {...register('semester')}
            className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
              \${errors.semester ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
            `}
          >
            <option value="" className="text-gray-500">Select</option>
            {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={String(num)} className="dark:bg-gray-900">{num}</option>)}
          </select>
          <label
            htmlFor="semester"
            className={`absolute text-sm transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 start-3 pointer-events-none
              \${errors.semester ? 'text-destructive' : 'text-gray-500'}
            `}
          >
            Semester
          </label>
          <AnimatePresence>
            {errors.semester && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
                {errors.semester.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative group pt-1">
        <select
          id="course"
          disabled={isPending}
          {...register('course')}
          className={`block w-full px-4 py-3.5 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
            \${errors.course ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
          `}
        >
          <option value="" className="text-gray-500">Select Course</option>
          <option value="60d5ec49f1b2c8a001123457" className="dark:bg-gray-900">MCA</option>
          <option value="60d5ec49f1b2c8a001123458" className="dark:bg-gray-900">MSc IT</option>
        </select>
        <label
          htmlFor="course"
          className={`absolute text-sm transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 start-3 pointer-events-none
            \${errors.course ? 'text-destructive' : 'text-gray-500'}
          `}
        >
          Course
        </label>
        <AnimatePresence>
          {errors.course && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
              {errors.course.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Password */}
      <div className="relative group pt-1">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          disabled={isPending}
          {...register('password')}
          className={`block w-full px-4 py-3.5 pr-12 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
            \${errors.password ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
          `}
          placeholder=" "
        />
        <label
          htmlFor="password"
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none
            \${errors.password ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
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
      
      {/* Live Strength Meter and Checklist */}
      <div className="mt-4 p-4 bg-muted/20 rounded-xl border border-gray-100 dark:border-gray-800">
        <PasswordStrength password={passwordValue} />
        <div className="mt-3">
          <PasswordChecklist password={passwordValue} />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="relative group pt-1">
        <input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          disabled={isPending}
          {...register('confirmPassword')}
          className={`block w-full px-4 py-3.5 pr-12 text-sm bg-transparent rounded-xl border-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors
            \${errors.confirmPassword ? 'border-destructive text-destructive' : 'border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary text-gray-900 dark:text-white'}
          `}
          placeholder=" "
        />
        <label
          htmlFor="confirmPassword"
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-3 pointer-events-none
            \${errors.confirmPassword ? 'text-destructive' : 'text-gray-500 peer-focus:text-primary'}
          `}
        >
          Confirm Password
        </label>
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors"
        >
          {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
        <AnimatePresence>
          {errors.confirmPassword && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-destructive mt-1 absolute -bottom-5 left-1">
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Terms */}
      <div className="pt-2">
        <TermsCheckbox register={register} error={errors.agreeToTerms} />
      </div>

      {/* Submit */}
      <motion.button
        whileHover={!isPending ? { scale: 1.01 } : {}}
        whileTap={!isPending ? { scale: 0.98 } : {}}
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 mt-6"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : (
          <>
            Create Account
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
};
