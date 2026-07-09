import React, { useState } from 'react';
import { QuestionDesigner } from '../components/QuestionDesigner';
import { ReviewPanel } from '../components/ReviewPanel';
import { GraduationCap } from 'lucide-react';

const FacultyAIPage: React.FC = () => {
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          Faculty AI Assistant
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Intelligent assessment generation, taxonomy mapping, and rubric creation engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <QuestionDesigner onGenerated={(qs) => setGeneratedQuestions([...generatedQuestions, ...qs])} />
        </div>

        <div className="lg:col-span-8">
          {generatedQuestions.length > 0 ? (
            <ReviewPanel 
              questions={generatedQuestions} 
              subject="Computer Science" // Usually passed from state
              onUpdate={setGeneratedQuestions}
            />
          ) : (
            <div className="bg-card p-12 rounded-2xl border text-center flex flex-col items-center justify-center h-full">
              <GraduationCap className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">Faculty Workspace Ready</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Use the designer on the left to generate RAG-grounded questions. You remain in complete control to review, analyze, and map learning outcomes before saving.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyAIPage;
