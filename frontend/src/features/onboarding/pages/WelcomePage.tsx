import React from 'react';
import { WelcomeHero } from '../components/WelcomeHero';
import { useStartOnboarding, useOnboardingState } from '../hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';

export const WelcomePage: React.FC = () => {
  const { data: state, isLoading: isStateLoading } = useOnboardingState();
  const { mutate: startOnboarding, isPending } = useStartOnboarding();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (state?.isCompleted) {
      navigate('/dashboard');
    }
  }, [state, navigate]);

  const handleStart = () => {
    startOnboarding(undefined, {
      onSuccess: () => {
        navigate('/onboarding/wizard');
      }
    });
  };

  if (isStateLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
      <WelcomeHero onStart={handleStart} isLoading={isPending} />
    </div>
  );
};

export default WelcomePage;
