import React from 'react';
import { PaperCard } from './PaperCard';

interface PaperGridProps {
  papers: any[];
  viewMode: 'grid' | 'list' | 'compact';
}

export const PaperGrid: React.FC<PaperGridProps> = ({ papers, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {papers.map(paper => (
          <PaperCard key={paper._id} paper={paper} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {papers.map(paper => (
        <PaperCard key={paper._id} paper={paper} viewMode="grid" />
      ))}
    </div>
  );
};
