import React, { useState } from 'react';
import { useAIFeedback } from '../hooks/useAIFeedback';
import { QualityScorecard } from '../components/QualityScorecard';
import { ImprovementSuggestions } from '../components/ImprovementSuggestions';
import { EvaluationQueue } from '../components/EvaluationQueue';
import { ReviewerWorkspace } from '../components/ReviewerWorkspace';

export const AIFeedbackDashboardPage: React.FC = () => {
  const { queue, qualityMetrics, reports, isLoadingQueue } = useAIFeedback();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  if (isLoadingQueue) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1500px] mx-auto h-full flex flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">AI Feedback & Human Eval</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Continuous Learning Platform & Quality Validation</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-[calc(100vh-160px)]">
          {/* Left Column: Analytics & Suggestions */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
            <QualityScorecard metrics={qualityMetrics} />
            <ImprovementSuggestions suggestions={reports?.suggestions || []} />
          </div>

          {/* Middle Column: Queue */}
          <div className="lg:col-span-3 overflow-hidden">
            <EvaluationQueue 
              queue={queue || []} 
              onSelect={setSelectedItem} 
              selectedId={selectedItem?.id} 
            />
          </div>

          {/* Right Column: Reviewer Workspace */}
          <div className="lg:col-span-5 overflow-hidden">
            <ReviewerWorkspace 
              item={selectedItem} 
              onComplete={() => setSelectedItem(null)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeedbackDashboardPage;
