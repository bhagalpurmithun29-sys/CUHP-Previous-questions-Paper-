import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{Math.round(progress)}% Completed</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out" 
          style={{ width: `\${progress}%` }} 
        />
      </div>
    </div>
  );
};
