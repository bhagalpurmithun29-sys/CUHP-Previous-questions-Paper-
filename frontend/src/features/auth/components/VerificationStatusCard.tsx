import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface VerificationStatusCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionTo?: string;
  primaryActionOnClick?: () => void;
  secondaryActionLabel?: string;
  secondaryActionTo?: string;
}

export const VerificationStatusCard: React.FC<VerificationStatusCardProps> = ({
  icon,
  iconBgColor,
  iconTextColor,
  title,
  description,
  primaryActionLabel,
  primaryActionTo,
  primaryActionOnClick,
  secondaryActionLabel,
  secondaryActionTo,
}) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
        className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 shadow-sm sm:rounded-2xl sm:border sm:border-gray-100 text-center"
      >
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${iconBgColor} mb-6`}>
          <div className={`h-8 w-8 ${iconTextColor}`}>
            {icon}
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="space-y-4">
          {primaryActionTo ? (
            <Link
              to={primaryActionTo}
              className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors active:scale-[0.98]"
            >
              {primaryActionLabel}
            </Link>
          ) : (
            <button
              onClick={primaryActionOnClick}
              className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors active:scale-[0.98]"
            >
              {primaryActionLabel}
            </button>
          )}

          {secondaryActionLabel && secondaryActionTo && (
            <Link
              to={secondaryActionTo}
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors active:scale-[0.98]"
            >
              {secondaryActionLabel}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};
