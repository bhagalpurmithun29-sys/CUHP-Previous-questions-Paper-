import React from 'react';
import { useInitiateOAuth } from '../hooks/useSocialLogin';

interface ProviderButtonProps {
  provider: string;
  icon: React.ReactNode;
  label?: string;
  isLinking?: boolean;
  isLinked?: boolean;
  onUnlink?: () => void;
}

export const ProviderButton: React.FC<ProviderButtonProps> = ({ 
  provider, 
  icon, 
  label,
  isLinking,
  isLinked,
  onUnlink 
}) => {
  const { mutate: initiateOAuth, isPending } = useInitiateOAuth();

  const handleClick = () => {
    if (isLinked && onUnlink) {
      onUnlink();
    } else {
      initiateOAuth(provider);
    }
  };

  const baseClasses = "flex justify-center items-center gap-2 w-full px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let stateClasses = "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-200";

  if (isLinked) {
    stateClasses = "border-success/30 bg-success/10 text-success hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30";
  }

  return (
    <button 
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={`${baseClasses} ${stateClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isPending ? (
        <svg className="animate-spin h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        icon
      )}
      <span>{label || (isLinked ? 'Connected (Click to Disconnect)' : `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`)}</span>
    </button>
  );
};
