import React from 'react';

export const ReadinessScore: React.FC<{ score: number }> = ({ score }) => {
  const getColor = () => {
    if (score >= 80) return 'text-success border-success/20 bg-success/10';
    if (score >= 50) return 'text-warning border-warning/20 bg-warning/10';
    return 'text-destructive border-destructive/20 bg-destructive/10';
  };

  const getMessage = () => {
    if (score >= 80) return 'Exam Ready! Excellent preparation.';
    if (score >= 50) return 'On track, but needs more focus.';
    return 'Critical focus required.';
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm text-center flex flex-col items-center justify-center">
      <h3 className="text-xl font-display font-semibold mb-2">Readiness Score</h3>
      <p className="text-sm text-muted-foreground mb-6">Calculated using AI based on historical weightage & confidence</p>
      
      <div className={`w-32 h-32 rounded-full border-[8px] flex items-center justify-center \${getColor()}`}>
        <span className="text-4xl font-bold">{score}</span>
      </div>
      
      <p className="mt-4 font-medium">{getMessage()}</p>
    </div>
  );
};
