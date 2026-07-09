import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingState, useUpdateProgress, useCompleteOnboarding } from '../hooks/useOnboarding';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { ProfileStep } from '../components/ProfileStep';
import { AcademicStep } from '../components/AcademicStep';
import { PreferencesStep } from '../components/PreferencesStep';
import { AvatarStep } from '../components/AvatarStep';
import { FeatureTour } from '../components/FeatureTour';
import { CompletionScreen } from '../components/CompletionScreen';
import { motion, AnimatePresence } from 'framer-motion';

export const OnboardingWizard: React.FC = () => {
  const { data: state, isLoading: isStateLoading } = useOnboardingState();
  const { mutate: updateProgress } = useUpdateProgress();
  const { mutate: completeOnboarding, isPending: isCompleting } = useCompleteOnboarding();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (state && !isStateLoading) {
      if (state.isCompleted) {
        navigate('/dashboard');
      } else {
        setCurrentStep(state.currentStep || 0);
      }
    }
  }, [state, isStateLoading, navigate]);

  const steps = [
    { id: 'profile', component: ProfileStep },
    { id: 'academic', component: AcademicStep },
    { id: 'preferences', component: PreferencesStep },
    { id: 'avatar', component: AvatarStep },
    { id: 'tour', component: FeatureTour },
    { id: 'completion', component: CompletionScreen }
  ];

  const handleNext = (data: any = {}) => {
    const nextStep = currentStep + 1;
    
    // Optimistically update local state for fast UI
    setCurrentStep(nextStep);

    // If it's not the last step (completion), save progress to backend
    if (nextStep < steps.length - 1) {
      updateProgress({
        step: nextStep,
        ...data
      });
    }
  };

  const handleFinish = () => {
    completeOnboarding(undefined, {
      onSuccess: () => navigate('/dashboard')
    });
  };

  if (isStateLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  const Component = steps[currentStep].component as any;

  return (
    <div className="min-h-screen bg-muted/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border rounded-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="p-8 pb-4">
          {currentStep < steps.length - 2 && ( // Hide progress on Tour and Completion
            <ProgressIndicator currentStep={currentStep} totalSteps={steps.length - 2} />
          )}
        </div>
        
        <div className="p-8 pt-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === steps.length - 1 ? (
                <Component onFinish={handleFinish} isPending={isCompleting} />
              ) : currentStep === steps.length - 2 ? (
                <Component onComplete={handleNext} />
              ) : (
                <Component onNext={handleNext} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {currentStep < steps.length - 2 && (
        <button 
          onClick={() => navigate('/dashboard')}
          className="mt-6 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
        >
          Skip Onboarding & Go to Dashboard
        </button>
      )}
    </div>
  );
};

export default OnboardingWizard;
