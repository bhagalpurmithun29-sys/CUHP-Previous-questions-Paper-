import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateTicket } from '../hooks/useSupport';
import { useAuth } from '../../auth/hooks/useAuth';

export const CreateTicketForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { user } = useAuth();
  const mutation = useCreateTicket();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      contactEmail: user?.email || '',
      subject: '',
      category: 'General Inquiry',
      priority: 'Medium',
      description: ''
    }
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => onSuccess()
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
          <input 
            {...register('contactEmail', { required: 'Email is required' })} 
            type="email" 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-primary focus:border-primary"
            disabled={!!user}
          />
          {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail.message as string}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select 
            {...register('category')} 
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-primary focus:border-primary"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Technical Problem">Technical Problem</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
        <input 
          {...register('subject', { required: 'Subject is required' })} 
          type="text" 
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-primary focus:border-primary"
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message as string}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
        <textarea 
          {...register('description', { required: 'Description is required' })} 
          rows={6}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-primary focus:border-primary"
          placeholder="Please describe your issue in detail..."
        ></textarea>
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message as string}</p>}
      </div>

      <button 
        type="submit" 
        disabled={mutation.isPending}
        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {mutation.isPending ? 'Submitting...' : 'Submit Ticket'}
      </button>
    </form>
  );
};
