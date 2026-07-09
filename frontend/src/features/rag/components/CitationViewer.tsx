import React from 'react';
import { Citation } from '../hooks/useRag';
import { FileText, Link, ShieldCheck } from 'lucide-react';

export const CitationViewer: React.FC<{ citations: Citation[] }> = ({ citations }) => {
  if (!citations || citations.length === 0) return null;

  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="text-sm font-semibold flex items-center gap-2 mb-3 text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-success" />
        Grounded References
      </h4>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {citations.map((cite) => (
          <div key={cite.citationId} className="flex-shrink-0 w-72 bg-card p-3 rounded-lg border text-sm snap-start">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-xs bg-muted px-2 py-0.5 rounded text-primary">
                [{cite.citationId}]
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded \${cite.confidenceScore > 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                {cite.confidenceScore}% Match
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h5 className="font-medium truncate" title={`\${cite.subject} - \${cite.academicYear}`}>
                {cite.subject}
              </h5>
            </div>
            <p className="text-xs text-muted-foreground mb-2 truncate">{cite.academicYear} • {cite.chunkType}</p>
            <p className="text-xs italic line-clamp-3 bg-muted/30 p-2 rounded">
              "{cite.snippet}"
            </p>
            <a 
              href={`/viewer/\${cite.paperId}`} 
              target="_blank" 
              rel="noreferrer"
              className="mt-2 text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Link className="w-3 h-3" /> View Source Document
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
