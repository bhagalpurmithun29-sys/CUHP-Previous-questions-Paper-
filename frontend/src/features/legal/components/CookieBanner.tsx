import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CookiePreferencesDialog } from './CookiePreferencesDialog';
import { useSaveConsent } from '../hooks/useLegal';
import { v4 as uuidv4 } from 'uuid';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const mutation = useSaveConsent();

  useEffect(() => {
    // Check local storage for existing consent decision
    const existingConsent = localStorage.getItem('cuhp_cookie_consent');
    if (!existingConsent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    let guestId = localStorage.getItem('cuhp_guest_id');
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem('cuhp_guest_id', guestId);
    }

    const consents = [
      { policyType: 'ESSENTIAL_COOKIES', accepted: true },
      { policyType: 'ANALYTICS_COOKIES', accepted: true },
      { policyType: 'MARKETING_COOKIES', accepted: true },
    ];

    mutation.mutate({ guestId, consents }, {
      onSuccess: () => {
        localStorage.setItem('cuhp_cookie_consent', JSON.stringify(consents));
        setShowBanner(false);
      }
    });
  };

  const handleRejectNonEssential = () => {
    let guestId = localStorage.getItem('cuhp_guest_id');
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem('cuhp_guest_id', guestId);
    }

    const consents = [
      { policyType: 'ESSENTIAL_COOKIES', accepted: true }, // Essential is always true
      { policyType: 'ANALYTICS_COOKIES', accepted: false },
      { policyType: 'MARKETING_COOKIES', accepted: false },
    ];

    mutation.mutate({ guestId, consents }, {
      onSuccess: () => {
        localStorage.setItem('cuhp_cookie_consent', JSON.stringify(consents));
        setShowBanner(false);
      }
    });
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          >
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">We value your privacy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
                <button 
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Manage Preferences
                </button>
                <button 
                  onClick={handleRejectNonEssential}
                  disabled={mutation.isPending}
                  className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button 
                  onClick={handleAcceptAll}
                  disabled={mutation.isPending}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors shadow-md"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPreferences && (
        <CookiePreferencesDialog 
          onClose={() => setShowPreferences(false)} 
          onSave={() => {
            setShowPreferences(false);
            setShowBanner(false);
          }} 
        />
      )}
    </>
  );
};
