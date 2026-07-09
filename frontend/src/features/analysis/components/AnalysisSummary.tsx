import React from 'react';

export const AnalysisSummary: React.FC<{ summary: string, preparationTips: string[] }> = ({ summary, preparationTips }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm col-span-full">
      <h3 className="text-xl font-display font-semibold mb-4">AI Paper Summary</h3>
      <p className="text-muted-foreground leading-relaxed mb-6">{summary}</p>
      
      <h4 className="font-semibold mb-3">Preparation Tips</h4>
      <ul className="space-y-2">
        {preparationTips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
