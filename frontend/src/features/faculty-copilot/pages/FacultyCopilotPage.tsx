import React, { useEffect } from 'react';
import { useFacultyCopilot } from '../hooks/useFacultyCopilot';
import { CopilotChat } from '../components/CopilotChat';
import { CurriculumInsights } from '../components/CurriculumInsights';
import { AssessmentReview } from '../components/AssessmentReview';
import { BloomAdvisor } from '../components/BloomAdvisor';
import { DifficultyAdvisor } from '../components/DifficultyAdvisor';
import { TopicCoverage } from '../components/TopicCoverage';
import { PaperComparison } from '../components/PaperComparison';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { CitationPanel } from '../components/CitationPanel';
import { motion } from 'framer-motion';

export const FacultyCopilotPage: React.FC = () => {
  const { messages, isTyping, sendChatMessage, recommendations, analyzeCurriculum } = useFacultyCopilot();

  const [curriculumData, setCurriculumData] = React.useState<any>(null);

  useEffect(() => {
    // Initial fetch of curriculum context
    analyzeCurriculum.mutate({ subjectId: '123', departmentId: '123' }, {
      onSuccess: (data) => setCurriculumData(data)
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Faculty AI Copilot</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Curriculum Intelligence & Assessment Guidance Assistant</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-160px)]">
          {/* Left Column: Analytics & Review */}
          <div className="lg:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
            {curriculumData && (
              <>
                <CurriculumInsights 
                  coverageScore={curriculumData.coverage.coverageScore} 
                  strongTopics={curriculumData.coverage.strongTopics} 
                  weakTopics={curriculumData.coverage.weakTopics} 
                />
                <AssessmentReview feedback={curriculumData.balance.feedback} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  <BloomAdvisor distribution={curriculumData.balance.bloomDistribution} />
                  <DifficultyAdvisor distribution={curriculumData.balance.difficultyIndex} />
                </div>
                <TopicCoverage />
              </>
            )}
            <PaperComparison />
          </div>

          {/* Middle Column: Conversational AI */}
          <div className="lg:col-span-5 flex flex-col h-full shadow-lg rounded-xl">
            <CopilotChat 
              messages={messages}
              isTyping={isTyping}
              onSendMessage={sendChatMessage}
            />
          </div>

          {/* Right Column: Recommendations & Evidence */}
          <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pl-2 pb-10">
            <RecommendationPanel recommendations={recommendations} />
            <CitationPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCopilotPage;
