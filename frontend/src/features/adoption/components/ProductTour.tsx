import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdoptionState, useUpdateAdoptionProgress } from '../hooks/useProductTour';

interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface ProductTourProps {
  tourId: string;
  steps: TourStep[];
  autoStart?: boolean;
}

export const ProductTour: React.FC<ProductTourProps> = ({ tourId, steps, autoStart = false }) => {
  const { data: adoption, isLoading } = useAdoptionState();
  const { mutate: updateProgress } = useUpdateAdoptionProgress();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isLoading && adoption) {
      const isCompleted = adoption.tours?.[tourId];
      if (!isCompleted && autoStart && adoption.preferences?.toursEnabled !== false) {
        setIsActive(true);
      }
    }
  }, [adoption, isLoading, tourId, autoStart]);

  useEffect(() => {
    if (isActive && steps[currentStepIndex]) {
      const targetElement = document.querySelector(steps[currentStepIndex].target);
      if (targetElement) {
        setTargetRect(targetElement.getBoundingClientRect());
        // Simple scroll to element
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setTargetRect(null); // Element not found on screen yet
      }
    }
  }, [isActive, currentStepIndex, steps]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    updateProgress({ tourId, isCompleted: true });
  };

  const handleSkip = () => {
    setIsActive(false);
    updateProgress({ tourId, isCompleted: true }); // Mark complete even if skipped to avoid annoying user
  };

  if (!isActive) return null;

  const currentStep = steps[currentStepIndex];

  // Very basic positioning logic
  const getStyle = (): React.CSSProperties => {
    if (!targetRect) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
    const { top, left, width, height } = targetRect;
    const placement = currentStep.placement || 'bottom';
    
    if (placement === 'bottom') return { top: top + height + 16, left: left + (width / 2), transform: 'translateX(-50%)' };
    if (placement === 'top') return { top: top - 16, left: left + (width / 2), transform: 'translate(-50%, -100%)' };
    if (placement === 'right') return { top: top + (height / 2), left: left + width + 16, transform: 'translateY(-50%)' };
    if (placement === 'left') return { top: top + (height / 2), left: left - 16, transform: 'translate(-100%, -50%)' };
    
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Semi-transparent overlay with a hole for the target could be implemented with an SVG mask or box-shadow trick. 
            For simplicity, using a subtle global overlay that doesn't block interaction everywhere, just darkens slightly. */}
        <div className="absolute inset-0 bg-black/20 pointer-events-auto" onClick={handleSkip} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
          className="absolute z-50 pointer-events-auto w-80 bg-card border border-border shadow-2xl rounded-2xl p-5"
          style={getStyle()}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-foreground">{currentStep.title}</h4>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{currentStep.content}</p>
          <div className="flex justify-between items-center">
            <button onClick={handleSkip} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Skip Tour
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90">
              {currentStepIndex < steps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
