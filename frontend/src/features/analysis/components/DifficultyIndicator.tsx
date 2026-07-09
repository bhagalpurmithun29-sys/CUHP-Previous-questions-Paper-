import React from 'react';

export const DifficultyIndicator: React.FC<{ difficulty: 'EASY' | 'MEDIUM' | 'HARD' }> = ({ difficulty }) => {
  const getColors = () => {
    switch(difficulty) {
      case 'EASY': return 'bg-success/10 text-success border-success/20';
      case 'MEDIUM': return 'bg-warning/10 text-warning border-warning/20';
      case 'HARD': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-xl font-display font-semibold">Overall Difficulty</h3>
        <p className="text-sm text-muted-foreground mt-1">Estimated based on AI topic analysis</p>
      </div>
      <div className={`px-6 py-2 rounded-full border font-bold tracking-widest \${getColors()}`}>
        {difficulty}
      </div>
    </div>
  );
};
