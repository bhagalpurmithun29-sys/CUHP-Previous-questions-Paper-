import React from 'react';
import { VerificationStatusCard } from '../components/VerificationStatusCard';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';
import { useLocation } from 'react-router-dom';

export const VerificationFailedPage: React.FC = () => {
  const location = useLocation();
  const errorMessage = location.state?.message || EMAIL_VERIFICATION_CONSTANTS.MESSAGES.FAILED_DESC;

  return (
    <VerificationStatusCard
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      }
      iconBgColor="bg-red-100"
      iconTextColor="text-red-600"
      title={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.FAILED_TITLE}
      description={errorMessage}
      primaryActionLabel={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.REQUEST_NEW_LINK}
      primaryActionTo="/resend-verification"
      secondaryActionLabel={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.TRY_AGAIN}
      secondaryActionTo="/login"
    />
  );
};
