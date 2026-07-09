import React from 'react';

export const ConfidenceIndicator: React.FC<{ 
  confidence: number; 
  onChange: (val: number) => void;
}> = ({ confidence, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>Confidence</span>
        <span>{confidence}%</span>
      </div>
      <input 
        type="range" 
        min="0" max="100" step="10"
        value={confidence}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Weak</span>
        <span>Strong</span>
      </div>
    </div>
  );
};
