import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  useGetOcrStatus, 
  useGetOcrResult, 
  useProcessOcr, 
  useReprocessOcr 
} from '../hooks/useOcr';
import { OcrStatusDashboard } from '../components/OcrStatusDashboard';
import { ModeratorReviewScreen } from '../components/ModeratorReviewScreen';
import { ScanText, RefreshCw, Play } from 'lucide-react';

const OcrManagerPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  
  const { data: status, isLoading: isStatusLoading } = useGetOcrStatus(paperId || '');
  const { data: result } = useGetOcrResult(paperId || '');
  
  const { mutate: process, isPending: isProcessing } = useProcessOcr();
  const { mutate: reprocess, isPending: isReprocessing } = useReprocessOcr();

  if (isStatusLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
            <ScanText className="w-8 h-8 text-primary" />
            AI Document Processing
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Intelligent OCR and Metadata Extraction Pipeline</p>
        </div>

        <div className="flex gap-2">
          {!status ? (
            <button 
              onClick={() => paperId && process(paperId)}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isProcessing ? 'Starting...' : 'Start Extraction'}
            </button>
          ) : (
            <button 
              onClick={() => paperId && reprocess(paperId)}
              disabled={isReprocessing || status.status === 'PROCESSING'}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 \${isReprocessing ? 'animate-spin' : ''}`} />
              Reprocess Document
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <OcrStatusDashboard status={status} />
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <ModeratorReviewScreen result={result} />
          ) : (
            <div className="bg-card p-12 rounded-2xl border text-center flex flex-col items-center justify-center h-full">
              <ScanText className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Extracted Data Yet</h3>
              <p className="text-muted-foreground">Start the extraction pipeline or wait for the background job to complete.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OcrManagerPage;
