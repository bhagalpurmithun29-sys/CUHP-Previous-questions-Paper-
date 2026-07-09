import { duplicateDetectionService } from '../processing/duplicate.service';
import { logger } from '../../utils/logger';

// In-memory queue simulation for Duplicate Detection Architecture
export class DuplicateWorkerService {
  private queue: string[] = [];
  private isProcessing = false;
  private readonly MAX_RETRIES = 3;

  public async addJob(paperId: string): Promise<void> {
    this.queue.push(paperId);
    logger.info(`Added Paper ${paperId} to Duplicate Detection Queue`);
    
    if (!this.isProcessing) {
      this.processNext();
    }
  }

  private async processNext(): Promise<void> {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const paperId = this.queue.shift();

    if (!paperId) {
      this.isProcessing = false;
      return;
    }

    try {
      logger.info(`Processing Duplicate Detection for ${paperId}`);
      await duplicateDetectionService.detectDuplicates(paperId);
    } catch (error: any) {
      logger.error(`Duplicate Detection failed for ${paperId}: ${error.message}`);
      // Basic DLQ or retry handling would go here
    } finally {
      setImmediate(() => this.processNext());
    }
  }
}

export const duplicateWorkerService = new DuplicateWorkerService();
