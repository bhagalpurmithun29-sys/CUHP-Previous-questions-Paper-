import React, { useState } from 'react';
import { useDeleteAccount } from '../hooks/useAccount';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export const DeleteAccount: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const navigate = useNavigate();

  const handleConfirm = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  };

  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-destructive mb-2">Delete Account</h3>
      <p className="text-sm text-destructive/80 mb-6">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-destructive text-destructive-foreground font-medium rounded-lg hover:bg-destructive/90">
          Delete your account
        </button>
      ) : (
        <div className="bg-card border border-destructive rounded-xl p-4 mt-4">
          <div className="flex gap-3 mb-4 text-destructive">
            <ExclamationTriangleIcon className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium text-sm">Are you absolutely sure? This will permanently delete your account and remove your data from our servers.</p>
          </div>
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsOpen(false)} disabled={isPending} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted">Cancel</button>
            <button onClick={handleConfirm} disabled={isPending} className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:bg-destructive/90 disabled:opacity-50">
              {isPending ? 'Deleting...' : 'Yes, delete my account'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
