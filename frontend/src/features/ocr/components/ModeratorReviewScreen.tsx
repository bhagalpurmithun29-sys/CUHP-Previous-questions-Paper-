import React, { useState } from 'react';
import { IOcrResult, useUpdateOcrReview } from '../hooks/useOcr';
import { Save, AlertTriangle } from 'lucide-react';

export const ModeratorReviewScreen: React.FC<{ result: IOcrResult }> = ({ result }) => {
  const [metadata, setMetadata] = useState(result.metadata);
  const [sections, setSections] = useState(result.sections);
  
  const { mutate: updateReview, isPending } = useUpdateOcrReview();

  const handleSave = () => {
    updateReview({ 
      paperId: result.paperId, 
      updates: { metadata, sections } 
    });
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-semibold flex items-center gap-2">
          {result.status === 'NEEDS_REVIEW' && <AlertTriangle className="w-5 h-5 text-warning" />}
          Moderator Review
        </h3>
        <button 
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isPending ? 'Saving...' : 'Approve & Save'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-bold mb-4 pb-2 border-b">Extracted Metadata</h4>
          <div className="space-y-4">
            {Object.keys(metadata).map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-muted-foreground mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input 
                  type="text" 
                  value={(metadata as any)[key] || ''}
                  onChange={(e) => setMetadata({ ...metadata, [key]: e.target.value })}
                  className="w-full bg-background border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 pb-2 border-b">Document Structure Preview</h4>
          <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
            {sections.map((section, idx) => (
              <div key={idx} className="p-4 bg-muted/30 rounded-lg border">
                <h5 className="font-bold text-primary">{section.sectionName}</h5>
                {section.instructions && <p className="text-xs text-muted-foreground italic mt-1">{section.instructions}</p>}
                
                <div className="mt-3 space-y-2">
                  {section.questions.map((q, qIdx) => (
                    <div key={qIdx} className="text-sm bg-background p-2 rounded border">
                      <strong>Q{q.questionNumber}:</strong> {q.text}
                      {q.marks && <span className="float-right text-muted-foreground">({q.marks} marks)</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
