import React from 'react';
import { IOcrResult } from '../hooks/useOcr';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const OcrStatusDashboard: React.FC<{ status: Partial<IOcrResult> | null }> = ({ status }) => {
  if (!status) {
    return (
      <div className="bg-card p-6 rounded-2xl border text-center text-muted-foreground">
        No OCR job found for this paper.
      </div>
    );
  }

  const getStatusConfig = () => {
    switch(status.status) {
      case 'COMPLETED': return { color: 'text-success bg-success/10 border-success/20', icon: CheckCircle, text: 'Completed' };
      case 'NEEDS_REVIEW': return { color: 'text-warning bg-warning/10 border-warning/20', icon: AlertTriangle, text: 'Needs Human Review' };
      case 'FAILED': return { color: 'text-destructive bg-destructive/10 border-destructive/20', icon: AlertTriangle, text: 'Failed' };
      case 'PROCESSING': return { color: 'text-primary bg-primary/10 border-primary/20', icon: Clock, text: 'Extracting Data...' };
      default: return { color: 'text-muted-foreground bg-muted', icon: FileText, text: 'Pending' };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="bg-card text-card-foreground p-6 rounded-2xl border shadow-sm">
      <h3 className="text-xl font-display font-semibold mb-4">Intelligent Document Processing</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl \${config.color}`}>
            <Icon className={`w-6 h-6 \${status.status === 'PROCESSING' ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h4 className="font-bold">{config.text}</h4>
            <p className="text-xs text-muted-foreground">Job ID: {status.jobId || 'N/A'}</p>
          </div>
        </div>
      </div>

      {status.qualityScore && (
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Overall Quality</span>
            <span className="font-bold">{status.qualityScore.overallQuality}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `\${status.qualityScore.overallQuality}%` }}></div>
          </div>
        </div>
      )}

      {status.errorMessage && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
          <strong>Error:</strong> {status.errorMessage}
        </div>
      )}
    </div>
  );
};
