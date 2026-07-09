import React, { useState } from 'react';
import { 
  useGetRevisionDashboard, 
  useUpdateTopicProgress, 
  useGenerateLastMinutePlan 
} from '../hooks/useRevision';
import { ReadinessScore } from '../components/ReadinessScore';
import { PriorityTopics } from '../components/PriorityTopics';
import { RevisionChecklist } from '../components/RevisionChecklist';
import { RecommendedRevisionPapers } from '../components/RecommendedRevisionPapers';
import { BrainCircuit, Zap } from 'lucide-react';

const RevisionDashboardPage: React.FC = () => {
  // Hardcoded subject ID for demo, usually comes from URL params or selection
  const [subjectId, setSubjectId] = useState<string>('64f0b2f1c8a14b5d8f6c3a12'); 
  
  const { data: revision, isLoading } = useGetRevisionDashboard(subjectId);
  const { mutate: updateTopic } = useUpdateTopicProgress(subjectId);
  const { mutate: generateLastMinute, isPending: isGeneratingPlan } = useGenerateLastMinutePlan(subjectId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground animate-pulse">Calculating readiness score...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-primary" />
            Smart Revision Assistant
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">AI-guided revision tracking based on historical paper analysis.</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => generateLastMinute('LAST_MINUTE_3_DAY')}
            disabled={isGeneratingPlan}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            Last-Minute Mode
          </button>
        </div>
      </div>

      {revision ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ReadinessScore score={revision.readinessScore} />
          </div>
          
          <PriorityTopics 
            topics={revision.topics} 
            onUpdateConfidence={(topic, confidence, isCompleted) => 
              updateTopic({ topicName: topic, confidence, isCompleted })
            } 
          />

          <div className="lg:col-span-1">
            <RevisionChecklist checklist={revision.checklist} />
          </div>

          <div className="lg:col-span-2">
            <RecommendedRevisionPapers subjectId={subjectId} />
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Select a subject to initialize your revision tracker.</p>
        </div>
      )}
    </div>
  );
};

export default RevisionDashboardPage;
