import React from 'react';
import { VerificationCard } from '../components/VerificationCard';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';
import { FiCheckCircle } from 'react-icons/fi';

export const VerificationSuccessPage: React.FC = () => {
  return (
    <VerificationCard
      icon={<FiCheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />}
      iconBgColor="bg-green-100 dark:bg-green-900/30"
      title={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SUCCESS_TITLE}
      message={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SUCCESS_MESSAGE}
      primaryAction={{
        label: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.CONTINUE_LOGIN,
        to: '/login',
        variant: 'primary'
      }}
    />
  );
};
