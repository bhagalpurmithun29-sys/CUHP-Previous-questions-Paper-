import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { registerSchema, RegisterFormValues } from '../schemas/register.schema';
import { useRegister } from '../hooks/useRegister';
import { PasswordStrength } from './PasswordStrength';
import { PasswordChecklist } from './PasswordChecklist';
import { TermsCheckbox } from './TermsCheckbox';

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched', // Validate as user tabs through
  });

  const passwordValue = watch('password', '');

  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            {...register('firstName')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all`}
            placeholder="John"
            disabled={isPending}
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            {...register('lastName')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all`}
            placeholder="Doe"
            disabled={isPending}
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">University Email</label>
        <input
          {...register('email')}
          type="email"
          className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all`}
          placeholder="student@cuhimachal.ac.in"
          disabled={isPending}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Academic Info Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            {...register('department')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.department ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all bg-white`}
            disabled={isPending}
          >
            <option value="">Select Department</option>
            <option value="60d5ec49f1b2c8a001123456">Dept of Computer Science & Informatics</option>
            {/* Hardcoded for UI showcase, would be fetched from API in reality */}
          </select>
          {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select
            {...register('semester')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.semester ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all bg-white`}
            disabled={isPending}
          >
            <option value="">Select</option>
            {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={String(num)}>{num}</option>)}
          </select>
          {errors.semester && <p className="mt-1 text-xs text-red-500">{errors.semester.message}</p>}
        </div>
      </div>
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
            {...register('course')}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.course ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all bg-white`}
            disabled={isPending}
          >
            <option value="">Select Course</option>
            <option value="60d5ec49f1b2c8a001123457">MCA</option>
            <option value="60d5ec49f1b2c8a001123458">MSc IT</option>
          </select>
          {errors.course && <p className="mt-1 text-xs text-red-500">{errors.course.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all`}
            placeholder="••••••••••••"
            disabled={isPending}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        
        {/* Live Strength Meter and Checklist */}
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <PasswordStrength password={passwordValue} />
          <PasswordChecklist password={passwordValue} />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          {...register('confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-2 outline-none transition-all`}
          placeholder="••••••••••••"
          disabled={isPending}
        />
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <TermsCheckbox register={register} error={errors.agreeToTerms} />

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};
