import React from 'react';
import { VerificationStatusCard } from '../components/VerificationStatusCard';
import { EMAIL_VERIFICATION_CONSTANTS } from '../constants/email-verification.constants';

export const VerificationSuccessPage: React.FC = () => {
  return (
    <VerificationStatusCard
      icon={
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      }
      iconBgColor="bg-green-100"
      iconTextColor="text-green-600"
      title={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SUCCESS_TITLE}
      description={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.SUCCESS_DESC}
      primaryActionLabel={EMAIL_VERIFICATION_CONSTANTS.MESSAGES.CONTINUE_LOGIN}
      primaryActionTo="/login"
    />
  );
};
