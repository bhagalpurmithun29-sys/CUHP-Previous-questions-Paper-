import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface VerificationCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  message: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    to?: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    to: string;
  };
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  icon,
  iconBgColor,
  title,
  message,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-gradient-to-tl from-primary-light/20 to-transparent blur-3xl"
        />
      </div>

      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
          className="overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-900/70 p-8 sm:p-10 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl dark:ring-white/10 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full mb-6 ${iconBgColor}`}
          >
            {icon}
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{title}</h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 px-2 leading-relaxed">
            {message}
          </p>

          <div className="space-y-4">
            {primaryAction && (
              primaryAction.to ? (
                <Link
                  to={primaryAction.to}
                  className={`flex w-full justify-center rounded-lg border px-4 py-3 text-sm font-medium shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    primaryAction.variant === 'secondary' 
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-primary'
                      : 'border-transparent bg-primary text-white hover:bg-primary-dark focus:ring-primary'
                  }`}
                >
                  {primaryAction.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className={`flex w-full justify-center rounded-lg border px-4 py-3 text-sm font-medium shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    primaryAction.variant === 'secondary' 
                      ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-primary'
                      : 'border-transparent bg-primary text-white hover:bg-primary-dark focus:ring-primary'
                  }`}
                >
                  {primaryAction.label}
                </button>
              )
            )}
            
            {secondaryAction && (
              <Link
                to={secondaryAction.to}
                className="inline-block text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
