import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPaperAnalysis, useTriggerReanalysis } from '../hooks/usePaperAnalysis';
import { TopicBreakdownChart } from '../components/TopicBreakdown';
import { ExamPattern } from '../components/ExamPattern';
import { DifficultyIndicator } from '../components/DifficultyIndicator';
import { TrendChart } from '../components/TrendChart';
import { RepeatedTopics } from '../components/RepeatedTopics';
import { KeyConcepts } from '../components/KeyConcepts';
import { AnalysisSummary } from '../components/AnalysisSummary';
import { Sparkles, RefreshCw, AlertTriangle } from 'lucide-react';

const PaperAnalysisPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const { data: analysis, isLoading, isError, error } = useGetPaperAnalysis(paperId || '');
  const { mutate: reanalyze, isPending: isReanalyzing } = useTriggerReanalysis();

  useEffect(() => {
    // If the paper has never been analyzed, we could trigger it automatically here.
    // Assuming backend does this or we provide a button.
  }, [paperId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground animate-pulse">AI is analyzing question paper...</p>
      </div>
    );
  }

  if (isError || !analysis) {
    return (
      <div className="p-8 text-center bg-destructive/10 text-destructive rounded-2xl max-w-2xl mx-auto mt-12">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Analysis Unavailable</h2>
        <p className="mb-6">{error?.message || "We couldn't load the analysis for this paper."}</p>
        <button 
          onClick={() => paperId && reanalyze(paperId)}
          className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90"
          disabled={isReanalyzing}
        >
          {isReanalyzing ? 'Starting Analysis...' : 'Start AI Analysis'}
        </button>
      </div>
    );
  }

  if (analysis.status === 'PENDING' || analysis.status === 'PROCESSING') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center">
        <Sparkles className="w-16 h-16 text-primary animate-pulse mb-6" />
        <h2 className="text-2xl font-display font-bold mb-3">AI is Extracting Insights</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Our specialized academic models are processing the document to extract topic coverage, difficulty, and exam patterns. This usually takes 15-30 seconds.
        </p>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
          <div className="h-full bg-primary animate-[indeterminate_2s_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            AI Paper Intelligence
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Deep academic insights extracted from the question paper.</p>
        </div>
        
        <button 
          onClick={() => paperId && reanalyze(paperId)}
          disabled={isReanalyzing}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 \${isReanalyzing ? 'animate-spin' : ''}`} />
          {isReanalyzing ? 'Reanalyzing...' : 'Reanalyze'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalysisSummary summary={analysis.summary} preparationTips={analysis.preparationTips} />
        </div>
        <DifficultyIndicator difficulty={analysis.overallDifficulty} />
        
        <div className="lg:col-span-1">
          <TopicBreakdownChart data={analysis.topicBreakdown} />
        </div>
        
        <div className="lg:col-span-2">
          <ExamPattern data={analysis.examPattern} />
        </div>
        
        <div className="lg:col-span-2">
          <RepeatedTopics data={analysis.repeatedTopics} />
        </div>
        
        <div className="lg:col-span-1">
          <KeyConcepts concepts={analysis.keyConcepts} />
        </div>
        
        <TrendChart />
      </div>
    </div>
  );
};

export default PaperAnalysisPage;
