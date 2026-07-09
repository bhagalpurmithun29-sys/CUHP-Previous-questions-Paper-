import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface RecoveryFlowProps {
  onSuccess: (data: any) => void; // Called when 2FA is bypassed
  onCancel: () => void;
}

export const RecoveryFlow: React.FC<RecoveryFlowProps> = ({ onSuccess, onCancel }) => {
  const [error, setError] = useState<string | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

  const handleRecover = async (code: string) => {
    setIsRecovering(true);
    setError(null);
    try {
      // Assuming a dedicated public recovery endpoint for login
      // POST /auth/login/mfa/recover (needs to be implemented in login flow)
      // For this isolated component, we will mock the API call based on prompt structure
      const response = await axios.post('/api/v1/auth/mfa/recover-login', { code });
      onSuccess(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid recovery code.');
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-warning/20 text-warning rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldExclamationIcon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold">Use a Recovery Code</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Lost your device? Enter one of your 8-character recovery codes to sign in.
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex items-center p-3 mb-4 text-sm text-destructive border border-destructive/20 rounded-xl bg-destructive/10"
          >
            <ExclamationCircleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="py-4">
        {/* We can reuse VerificationCodeInput but modified for 8 chars, or just a simple text input for recovery codes */}
        <input 
          type="text"
          placeholder="XXXX-XXXX"
          className="w-full text-center text-xl font-mono tracking-widest px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary focus:outline-none"
          onChange={(e) => {
            const val = e.target.value.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
            e.target.value = val;
            if (val.replace('-', '').length === 8) {
              handleRecover(val);
            }
          }}
          disabled={isRecovering}
        />
      </div>

      <div className="mt-6 text-center">
        <button onClick={onCancel} className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Back to standard login
        </button>
      </div>
    </div>
  );
};
