import React from 'react';
import { useGetRecommendations } from '../hooks/useStudyPlanner';

export const StudyInsights: React.FC = () => {
  const { data: recommendations, isLoading } = useGetRecommendations();

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">AI Recommended Resources</h3>
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-muted rounded-lg w-full"></div>
          <div className="h-16 bg-muted rounded-lg w-full"></div>
        </div>
      ) : recommendations?.length > 0 ? (
        <div className="space-y-3">
          {recommendations.map((paper: any) => (
            <a 
              key={paper._id} 
              href={`/viewer/\${paper.paperId}`}
              className="block p-3 rounded-xl border bg-background hover:border-primary transition-colors"
            >
              <h4 className="font-medium text-sm line-clamp-1">{paper.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {paper.examYear} • {paper.examType}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Keep studying! Recommendations will appear here based on your progress and subject.</p>
      )}
    </div>
  );
};
