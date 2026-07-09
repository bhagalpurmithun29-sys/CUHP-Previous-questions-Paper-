import React, { useState } from 'react';
import { useGenerateQuestions } from '../hooks/useFacultyAI';
import { Loader2, Wand2 } from 'lucide-react';

export const QuestionDesigner: React.FC<{ onGenerated: (qs: any) => void }> = ({ onGenerated }) => {
  const { mutate: generate, isPending } = useGenerateQuestions();
  
  const [formData, setFormData] = useState({
    subject: '',
    examType: 'END_SEM',
    questionType: 'LONG_ANSWER',
    topic: '',
    difficulty: 'MEDIUM',
    count: 3
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generate(formData, {
      onSuccess: (data) => onGenerated(data.questions)
    });
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-primary" />
        AI Question Designer
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Subject</label>
            <input 
              required type="text" 
              className="w-full bg-background border rounded-lg px-3 py-2 text-sm"
              value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Topic / Unit</label>
            <input 
              required type="text" 
              className="w-full bg-background border rounded-lg px-3 py-2 text-sm"
              value={formData.topic} onChange={e => setFormData({...formData, topic: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Exam Type</label>
            <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm" value={formData.examType} onChange={e => setFormData({...formData, examType: e.target.value as any})}>
              <option value="INTERNAL">Internal Assessment</option>
              <option value="MID_SEM">Mid Semester</option>
              <option value="END_SEM">End Semester</option>
              <option value="QUIZ">Quiz</option>
              <option value="ASSIGNMENT">Assignment</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Question Type</label>
            <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm" value={formData.questionType} onChange={e => setFormData({...formData, questionType: e.target.value as any})}>
              <option value="SHORT_ANSWER">Short Answer</option>
              <option value="LONG_ANSWER">Long Answer</option>
              <option value="CASE_STUDY">Case Study</option>
              <option value="PROGRAMMING">Programming</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Difficulty</label>
            <select className="w-full bg-background border rounded-lg px-3 py-2 text-sm" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value as any})}>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Count</label>
            <input type="number" min="1" max="10" className="w-full bg-background border rounded-lg px-3 py-2 text-sm" value={formData.count} onChange={e => setFormData({...formData, count: Number(e.target.value)})} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          Generate Draft Questions
        </button>
      </form>
    </div>
  );
};
