import React from 'react';
import { useGetRevisionRecommendations } from '../hooks/useRevision';
import { FileText, AlertCircle } from 'lucide-react';

export const RecommendedRevisionPapers: React.FC<{ subjectId: string }> = ({ subjectId }) => {
  const { data, isLoading } = useGetRevisionRecommendations(subjectId);

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Recommended Practice</h3>
      
      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm flex gap-3 text-blue-700 dark:text-blue-300">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>Disclaimer:</strong> These recommendations are based on historical repository data and AI analysis. They do not guarantee future exam content.
        </p>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-12 bg-muted rounded-lg w-full"></div>
          <div className="h-12 bg-muted rounded-lg w-full"></div>
        </div>
      ) : data?.recommendedPapers?.length > 0 ? (
        <div className="space-y-3">
          {data.recommendedPapers.map((paper: any) => (
            <a 
              key={paper._id} 
              href={`/viewer/\${paper.paperId}`}
              className="flex items-center gap-3 p-3 rounded-xl border bg-background hover:border-primary transition-colors"
            >
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-1">{paper.title}</h4>
                <p className="text-xs text-muted-foreground">
                  Contains your weak topics • {paper.examYear}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No specific papers recommended right now. Keep updating your confidence scores.</p>
      )}
    </div>
  );
};
