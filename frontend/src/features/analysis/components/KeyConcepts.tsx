import React from 'react';

export const KeyConcepts: React.FC<{ concepts: string[] }> = ({ concepts }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Key Concepts Covered</h3>
      <div className="flex flex-wrap gap-2">
        {concepts.map((concept, idx) => (
          <span 
            key={idx} 
            className="px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium"
          >
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
};
