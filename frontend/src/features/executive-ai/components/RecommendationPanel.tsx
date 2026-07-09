import React from 'react';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';

export const RecommendationPanel: React.FC<{ insights: any }> = ({ insights }) => {
  if (!insights) return null;

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        Strategic Recommendations
      </h3>
      
      <div className="space-y-4">
        {insights.recommendations?.map((rec: any, idx: number) => (
          <div key={idx} className="p-4 border rounded-xl bg-background flex items-start gap-4">
            <div className={`mt-1 \${rec.priority === 'HIGH' ? 'text-destructive' : rec.priority === 'MEDIUM' ? 'text-warning' : 'text-success'}`}>
              {rec.priority === 'HIGH' ? <AlertTriangle className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded \${rec.priority === 'HIGH' ? 'bg-destructive/10 text-destructive' : rec.priority === 'MEDIUM' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                  {rec.priority} PRIORITY
                </span>
              </div>
              <h4 className="font-bold text-sm mb-1">{rec.action}</h4>
              <p className="text-xs text-muted-foreground">{rec.impact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
