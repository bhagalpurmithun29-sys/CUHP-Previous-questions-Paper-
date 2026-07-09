import React, { useState } from 'react';
import { useSaveConsent } from '../hooks/useLegal';
import { FiX } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';

export const CookiePreferencesDialog: React.FC<{ onClose: () => void, onSave: () => void }> = ({ onClose, onSave }) => {
  const mutation = useSaveConsent();
  const [preferences, setPreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false
  });

  const handleSave = () => {
    let guestId = localStorage.getItem('cuhp_guest_id');
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem('cuhp_guest_id', guestId);
    }

    const consents = [
      { policyType: 'ESSENTIAL_COOKIES', accepted: preferences.essential },
      { policyType: 'ANALYTICS_COOKIES', accepted: preferences.analytics },
      { policyType: 'MARKETING_COOKIES', accepted: preferences.marketing },
    ];

    mutation.mutate({ guestId, consents }, {
      onSuccess: () => {
        localStorage.setItem('cuhp_cookie_consent', JSON.stringify(consents));
        onSave();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cookie Preferences</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Strictly Necessary Cookies</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">These cookies are essential for the website to function properly. They cannot be disabled.</p>
            </div>
            <div className="shrink-0 pt-1 text-sm font-bold text-primary">Always Active</div>
          </div>
          
          <div className="flex items-start justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Analytics Cookies</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Allow us to analyze site usage so we can measure and improve performance.</p>
            </div>
            <div className="shrink-0 pt-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={preferences.analytics} onChange={e => setPreferences(p => ({...p, analytics: e.target.checked}))} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-start justify-between gap-4 border-t border-gray-100 dark:border-gray-800 pt-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Marketing Cookies</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Used by advertisers to display ads that are relevant to your interests.</p>
            </div>
            <div className="shrink-0 pt-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={preferences.marketing} onChange={e => setPreferences(p => ({...p, marketing: e.target.checked}))} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={mutation.isPending}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50"
          >
            {mutation.isPending ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};
