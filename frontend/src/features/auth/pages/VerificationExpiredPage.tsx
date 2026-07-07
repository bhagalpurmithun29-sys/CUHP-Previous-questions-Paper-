import React from 'react';
import { VerificationStatusCard } from '../components/VerificationStatusCard';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';

export const VerificationExpiredPage: React.FC = () => {
  return (
    <VerificationStatusCard
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      iconBgColor="bg-yellow-100"
      iconTextColor="text-yellow-600"
      title={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EXPIRED_TITLE}
      description={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.EXPIRED_DESC}
      primaryActionLabel={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.REQUEST_NEW_LINK}
      primaryActionTo="/resend-verification"
    />
  );
};
