import React, { useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../auth/hooks/useAuth';
import { MFASetupWizard } from '../components/MFASetupWizard';
import { TrustedDevices } from '../components/TrustedDevices';
import { useMFADisable } from '../hooks/useMFA';
import { motion, AnimatePresence } from 'framer-motion';

export const MFAPage: React.FC = () => {
  const { user } = useAuth();
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [disableToken, setDisableToken] = useState('');
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  
  const { mutate: disableMfa, isPending: isDisabling } = useMFADisable();

  const handleDisable = () => {
    disableMfa(disableToken, {
      onSuccess: () => {
        setShowDisableConfirm(false);
        setDisableToken('');
      }
    });
  };

  const isEnabled = user?.mfaEnabled || false;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <ShieldCheckIcon className="w-8 h-8 text-primary" />
          Two-Factor Authentication (2FA)
        </h1>
        <p className="text-muted-foreground mt-2">
          Add an extra layer of security to your account by requiring a verification code in addition to your password.
        </p>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-border bg-muted/10 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Authenticator App
              {isEnabled && <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-bold uppercase">Active</span>}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Use an app like Google Authenticator or Microsoft Authenticator to generate verification codes.
            </p>
          </div>
          {!isEnabled && !isSettingUp && (
            <button 
              onClick={() => setIsSettingUp(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Enable 2FA
            </button>
          )}
          {isEnabled && (
            <button 
              onClick={() => setShowDisableConfirm(true)}
              className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-colors"
            >
              Disable 2FA
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {isSettingUp && !isEnabled && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 border-t border-border"
            >
              <MFASetupWizard onCancel={() => setIsSettingUp(false)} onSuccess={() => setIsSettingUp(false)} />
            </motion.div>
          )}
          
          {showDisableConfirm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 border-t border-border bg-destructive/5"
            >
              <h4 className="font-semibold text-destructive mb-2">Disable Two-Factor Authentication</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Disabling 2FA will remove this extra security layer and invalidate your current backup codes. Please enter a verification code to confirm.
              </p>
              <div className="flex gap-3 max-w-sm">
                <input 
                  type="text"
                  placeholder="6-digit code"
                  value={disableToken}
                  onChange={(e) => setDisableToken(e.target.value.replace(/\D/g, '').slice(0,6))}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-900 dark:text-white"
                />
                <button 
                  onClick={handleDisable}
                  disabled={isDisabling || disableToken.length !== 6}
                  className="px-4 py-2 bg-destructive text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {isDisabling ? 'Disabling...' : 'Confirm'}
                </button>
                <button 
                  onClick={() => setShowDisableConfirm(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isEnabled && <TrustedDevices />}
    </div>
  );
};

export default MFAPage;
