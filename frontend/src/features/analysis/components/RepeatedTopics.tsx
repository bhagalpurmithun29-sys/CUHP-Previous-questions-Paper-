import React from 'react';
import { RepeatedTopic } from '../hooks/usePaperAnalysis';

export const RepeatedTopics: React.FC<{ data: RepeatedTopic[] }> = ({ data }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Frequently Asked Topics</h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <span className="font-medium">{item.topic}</span>
            <span className="px-2 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary">
              {item.frequency}x Repeated
            </span>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-muted-foreground text-sm">No significant repetitions detected.</p>
        )}
      </div>
    </div>
  );
};
