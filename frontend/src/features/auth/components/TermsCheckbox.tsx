import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { RegisterFormValues } from '../schemas/register.schema';

interface TermsCheckboxProps {
  register: UseFormRegister<RegisterFormValues>;
  error?: FieldError;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ register, error }) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeToTerms"
            type="checkbox"
            {...register('agreeToTerms')}
            className={\`w-4 h-4 border rounded focus:ring-3 focus:ring-blue-300 bg-gray-50 
              \${error ? 'border-red-500 text-red-600 focus:ring-red-200' : 'border-gray-300 text-blue-600'}\`}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="font-medium text-gray-900">
            I agree to the <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </label>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error.message}</p>
      )}
    </div>
  );
};
