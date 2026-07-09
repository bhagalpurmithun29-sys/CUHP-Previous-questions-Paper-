import { pdfProcessorService } from '../processing/pdf.processor';
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/AppError';
import fs from 'fs/promises';

// Note: In production this should be a robust queue like BullMQ, RabbitMQ, or AWS SQS.
// This is an in-memory queue simulation architected to be easily swapped.
export interface QueueJob {
  id: string;
  paperId: string;
  pdfPath: string; // File path on the temporary disk
  attempts: number;
}

export class PDFWorkerService {
  private queue: QueueJob[] = [];
  private isProcessing = false;
  private readonly MAX_RETRIES = 3;

  /**
   * Adds a document to the processing queue.
   */
  public async addJob(paperId: string, pdfPath: string): Promise<string> {
    const jobId = `job_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    this.queue.push({ id: jobId, paperId, pdfPath, attempts: 0 });
    logger.info(`Added job ${jobId} to PDF Processing Queue for Paper: ${paperId}`);
    
    // Asynchronously kick off processing if idle
    if (!this.isProcessing) {
      this.processNext();
    }
    
    return jobId;
  }

  private async processNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const job = this.queue.shift();

    if (!job) {
      this.isProcessing = false;
      return;
    }

    try {
      logger.info(`Processing Job ${job.id} (Attempt ${job.attempts + 1})`);
      
      // Load file into memory from temporary storage
      const pdfBuffer = await fs.readFile(job.pdfPath);

      // Execute processor pipeline
      await pdfProcessorService.processDocument(job.paperId, pdfBuffer);

      // Cleanup local temp file after success
      await fs.unlink(job.pdfPath).catch(e => logger.warn(`Failed to cleanup temp file: ${job.pdfPath}`));
      
      logger.info(`Successfully completed Job ${job.id}`);
      
    } catch (error: any) {
      logger.error(`Job ${job.id} failed: ${error.message}`);
      job.attempts += 1;

      if (job.attempts < this.MAX_RETRIES) {
        logger.info(`Re-queueing Job ${job.id} for retry...`);
        this.queue.push(job);
      } else {
        logger.error(`Job ${job.id} exceeded max retries. Moving to Dead Letter Queue (DLQ).`);
        this.moveToDeadLetterQueue(job, error);
      }
    } finally {
      // Process next immediately
      setImmediate(() => this.processNext());
    }
  }

  private moveToDeadLetterQueue(job: QueueJob, error: any) {
    // DLQ Implementation placeholder
    logger.info(`[DLQ] Saved Job ${job.id} - Reason: ${error.message}`);
  }
}

export const pdfWorkerService = new PDFWorkerService();
