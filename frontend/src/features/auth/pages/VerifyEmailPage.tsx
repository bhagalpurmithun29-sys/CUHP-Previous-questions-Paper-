import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import { VerificationLoader } from '../components/VerificationLoader';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { verify, loading, success, error } = useVerifyEmail();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      return;
    }
    
    // Only call verify once on mount
    verify(token, {
      onSettled: () => {
        setIsVerifying(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // deliberately leaving verify out of deps to avoid re-running

  // Handle Missing Token
  if (!token) {
    return <Navigate to="/verify-email/failed?reason=missing_token" replace />;
  }

  // Handle Loading
  if (isVerifying || loading) {
    return <VerificationLoader />;
  }

  // Handle Success
  if (success) {
    return <Navigate to="/verify-email/success" replace />;
  }

  // Handle Error
  if (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message || '';

    // Check if it's expired
    if (status === 410 || message.toLowerCase().includes('expire')) {
      return <Navigate to="/verify-email/expired" replace />;
    }

    // Default failure
    return <Navigate to={`/verify-email/failed?reason=${encodeURIComponent(message)}`} replace />;
  }

  return <VerificationLoader />;
};
