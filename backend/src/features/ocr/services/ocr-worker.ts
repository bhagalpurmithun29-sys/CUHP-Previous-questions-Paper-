import { OcrResult } from '../../../models/ocrResult.model';
import { QuestionPaper } from '../../../models/paper.model';

export class OcrWorker {
  async processPendingJobs() {
    const pendingJobs = await OcrResult.find({ status: 'PENDING' }).limit(5);
    
    for (const job of pendingJobs) {
      try {
        job.status = 'PROCESSING';
        await job.save();
        
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        job.rawText = `UNIVERSITY OF CUHP\nEND SEMESTER EXAMINATION 2026\nSubject: Computer Science\nTime: 3 Hours\nMax Marks: 100\n\n1. Explain the architecture of a modern web application. (20 Marks)\n2. Write short notes on OCR technology. (10 Marks)`;
        job.cleanedText = job.rawText;
        
        job.qualityScore = {
          ocrConfidence: Math.floor(Math.random() * 20) + 80, 
          metadataConfidence: 90,
          extractionCompleteness: 95,
          overallQuality: 92
        };
        
        job.status = job.qualityScore.ocrConfidence < 85 ? 'NEEDS_REVIEW' : 'COMPLETED';
        job.processingTimeMs = Date.now() - startTime;
        
        await job.save();
        
        if (job.status === 'COMPLETED') {
           await QuestionPaper.findByIdAndUpdate(job.paperId, { ocrTextPlaceholder: job.cleanedText });
        }
        
      } catch (error: any) {
        job.status = 'FAILED';
        job.errorMessage = error.message || 'Unknown error occurred during OCR';
        await job.save();
      }
    }
  }
}
