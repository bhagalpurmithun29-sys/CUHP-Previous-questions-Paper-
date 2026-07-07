import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import { VerificationLoader } from '../components/VerificationLoader';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { verifyEmail, isLoading } = useVerifyEmail();

  useEffect(() => {
    if (!token || token.trim().length < 10) {
      navigate('/verification-failed', { 
        state: { message: 'Invalid or missing verification token.' },
        replace: true 
      });
      return;
    }

    verifyEmail(
      { token },
      {
        onSuccess: () => {
          navigate('/verification-success', { replace: true });
        },
        onError: (error: any) => {
          const status = error?.response?.status;
          
          if (status === 410 || status === 401) { // Assuming 410 or 401 for expired
            navigate('/verification-expired', { replace: true });
            return;
          }

          const message = error?.response?.data?.message || 'Verification failed. Please try again.';
          navigate('/verification-failed', { 
            state: { message },
            replace: true 
          });
        },
      }
    );
  }, [token, verifyEmail, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <VerificationLoader />
    </div>
  );
};
