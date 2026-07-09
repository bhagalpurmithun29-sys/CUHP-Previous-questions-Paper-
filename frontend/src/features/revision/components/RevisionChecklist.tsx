import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

export const RevisionChecklist: React.FC<{ checklist: any[] }> = ({ checklist }) => {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Revision Checklist</h3>
      
      <div className="space-y-3">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <button className="mt-0.5 text-primary">
              {item.isDone ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-muted-foreground" />}
            </button>
            <span className={`\${item.isDone ? 'text-muted-foreground line-through' : ''}`}>
              {item.item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
