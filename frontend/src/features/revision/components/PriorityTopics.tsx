import React from 'react';
import { ITopicProgress } from '../hooks/useRevision';
import { ConfidenceIndicator } from './ConfidenceIndicator';

export const PriorityTopics: React.FC<{ 
  topics: ITopicProgress[], 
  onUpdateConfidence: (topic: string, val: number, isCompleted: boolean) => void 
}> = ({ topics, onUpdateConfidence }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm lg:col-span-2">
      <h3 className="text-xl font-display font-semibold mb-4">High Priority Topics</h3>
      <p className="text-sm text-muted-foreground mb-4">Focus your revision here. These topics are frequently asked and currently have low confidence.</p>
      
      <div className="space-y-4">
        {topics.map(topic => (
          <div key={topic.topic} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border bg-background gap-4">
            <div className="flex-1">
              <h4 className="font-medium">{topic.topic}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded font-bold">
                  Priority: {topic.priorityScore}
                </span>
                {topic.isCompleted && (
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded font-bold">
                    Completed
                  </span>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <ConfidenceIndicator 
                confidence={topic.confidenceScore} 
                onChange={(val) => onUpdateConfidence(topic.topic, val, val >= 80)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
