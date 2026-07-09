import React from 'react';
import { useAnalyzePaper, useGenerateRubric } from '../hooks/useFacultyAI';
import { Check, X, FileBarChart, ListChecks } from 'lucide-react';

export const ReviewPanel: React.FC<{ questions: any[], subject: string, onUpdate: (qs: any[]) => void }> = ({ questions, subject, onUpdate }) => {
  const { mutate: analyze, data: analysis, isPending: isAnalyzing } = useAnalyzePaper();
  const { mutate: generateRubric, data: rubric, isPending: isRubricLoading } = useGenerateRubric();

  if (questions.length === 0) return null;

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-semibold">Generated Assessment</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => analyze({ questions, subject })} 
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-lg hover:opacity-90"
          >
            <FileBarChart className="w-4 h-4" /> Analyze Balance
          </button>
          <button 
            onClick={() => generateRubric(questions)} 
            disabled={isRubricLoading}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-lg hover:opacity-90"
          >
            <ListChecks className="w-4 h-4" /> Create Rubric
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
        {questions.map((q, i) => (
          <div key={i} className="p-4 border rounded-xl bg-background">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold">Q{i + 1}.</span>
              <div className="flex gap-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-bold">{q.marks} Marks</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-bold">{q.difficulty}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-bold">{q.bloomsTaxonomy}</span>
              </div>
            </div>
            <p className="text-sm mb-2">{q.text}</p>
            <p className="text-xs text-muted-foreground italic bg-muted/20 p-2 rounded">
              Ans: {q.suggestedAnswer}
            </p>
          </div>
        ))}
      </div>

      {analysis && (
        <div className="mb-6 p-4 bg-muted/10 border rounded-xl text-sm">
          <h4 className="font-bold mb-2">AI Analysis Report</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-xs mb-1">Difficulty Distribution</p>
              <pre className="text-xs">{JSON.stringify(analysis.difficultyDistribution, null, 2)}</pre>
            </div>
            <div>
              <p className="text-muted-foreground text-xs mb-1">Bloom's Taxonomy</p>
              <pre className="text-xs">{JSON.stringify(analysis.bloomsDistribution, null, 2)}</pre>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <strong>Suggestions: </strong> 
            {analysis.syllabusCoverage?.suggestions?.join(', ') || 'Looks well balanced.'}
          </div>
        </div>
      )}

      {rubric && (
        <div className="mb-6 p-4 bg-muted/10 border rounded-xl text-sm">
          <h4 className="font-bold mb-2">Marking Rubric</h4>
          {rubric.rubrics?.map((r: any, idx: number) => (
            <div key={idx} className="mb-3 border-b pb-2 last:border-0">
              <p className="font-medium text-xs mb-1">Q{idx + 1} ({r.totalMarks} Marks)</p>
              <ul className="list-disc pl-4 text-xs text-muted-foreground">
                {r.criteria.map((c: any, i: number) => (
                  <li key={i}>{c.description} - <strong>{c.marksAllocated}M</strong></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 pt-4 border-t">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-success text-success-foreground rounded-lg font-medium hover:opacity-90">
          <Check className="w-4 h-4" /> Accept & Save to Bank
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20">
          <X className="w-4 h-4" /> Reject Draft
        </button>
      </div>
    </div>
  );
};
