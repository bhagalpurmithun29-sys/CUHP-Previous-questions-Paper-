import React from 'react';
import { TopicBreakdown } from '../hooks/usePaperAnalysis';

export const TopicBreakdownChart: React.FC<{ data: TopicBreakdown[] }> = ({ data }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Topic Breakdown</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{item.topic}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `\${item.percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
