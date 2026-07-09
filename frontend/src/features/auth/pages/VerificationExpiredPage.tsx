import React from 'react';
import { VerificationCard } from '../components/VerificationCard';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';
import { FiClock } from 'react-icons/fi';

export const VerificationExpiredPage: React.FC = () => {
  return (
    <VerificationCard
      icon={<FiClock className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />}
      iconBgColor="bg-yellow-100 dark:bg-yellow-900/30"
      title={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EXPIRED_TITLE}
      message={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EXPIRED_MESSAGE}
      primaryAction={{
        label: 'Request New Link',
        to: '/resend-verification',
        variant: 'primary'
      }}
      secondaryAction={{
        label: EMAIL_VERIFICATION_CONSTANTS.MESSAGES.BACK_TO_LOGIN,
        to: '/login'
      }}
    />
  );
};
