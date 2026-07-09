import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { VerificationCard } from '../components/VerificationCard';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/emailVerification.constants';
import { FiXCircle } from 'react-icons/fi';

export const VerificationFailedPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason');

  const getReasonMessage = () => {
    if (reason === 'missing_token') return EMAIL_VERIFICATION_CONSTANTS.MESSAGES.MISSING_TOKEN;
    if (reason) return reason;
    return EMAIL_VERIFICATION_CONSTANTS.MESSAGES.FAILED_MESSAGE;
  };

  return (
    <VerificationCard
      icon={<FiXCircle className="h-10 w-10 text-red-600 dark:text-red-400" />}
      iconBgColor="bg-red-100 dark:bg-red-900/30"
      title={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.FAILED_TITLE}
      message={getReasonMessage()}
      primaryAction={{
        label: 'Retry Verification',
        to: '/login', // Typically we redirect them to login, where they can see they aren't verified and request a new one
        variant: 'primary'
      }}
      secondaryAction={{
        label: 'Contact Support',
        to: '/support'
      }}
    />
  );
};
