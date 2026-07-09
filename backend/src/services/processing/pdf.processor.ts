import { pdfValidator } from './pdf.validator';
import { pdfMetadataExtractor, PDFMetadata } from './pdf.metadata';
import { pdfThumbnailGenerator, ThumbnailGenerationResult } from './pdf.thumbnails';
import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { IQuestionPaper } from '../../interfaces/paper.interface';
import { AppError } from '../../utils/AppError';
import { logger } from '../../utils/logger'; // Assumed to exist based on rules

export class PDFProcessorService {
  private repository = new QuestionPaperRepository();

  /**
   * Orchestrates the entire PDF Processing Pipeline
   */
  public async processDocument(paperId: string, pdfBuffer: Buffer): Promise<void> {
    try {
      logger.info(`Starting PDF Processing Pipeline for Paper ID: ${paperId}`);
      
      const paper = await this.repository.findByPaperId(paperId);
      if (!paper) {
        throw new AppError(`Paper ID ${paperId} not found in database.`, 404);
      }

      // Step 1: Extract Metadata & Checksums
      logger.info(`[${paperId}] Extracting Metadata...`);
      const metadata: PDFMetadata = await pdfMetadataExtractor.extract(pdfBuffer, pdfBuffer.length);
      
      // Step 2: Full Document Validation
      logger.info(`[${paperId}] Validating Document Integrity...`);
      pdfValidator.validate(pdfBuffer, metadata.pageCount);

      // Step 3: Generate Thumbnails and Previews
      logger.info(`[${paperId}] Generating Thumbnails and Previews...`);
      // Preview up to 3 pages depending on document length
      const previewCount = Math.min(metadata.pageCount, 3);
      const visuals: ThumbnailGenerationResult = await pdfThumbnailGenerator.generate(pdfBuffer, paperId, previewCount);

      // Step 4: Text Extraction (Architecture Setup)
      // logger.info(`[${paperId}] Preparing Text Extraction / OCR...`);
      // const extractedText = await textExtractor.extract(pdfBuffer);
      const ocrPlaceholder = "Extracted text architecture ready. OCR disabled by rules.";

      // Step 5: Update Database
      logger.info(`[${paperId}] Updating Database with Metadata...`);
      await this.repository.update(String(paper._id), {
        checksum: metadata.checksumSha256,
        sha256Hash: metadata.checksumSha256,
        pageCount: metadata.pageCount,
        thumbnailUrl: visuals.coverThumbnailUrl,
        previewImages: visuals.previewImageUrls,
        ocrTextPlaceholder: ocrPlaceholder,
      } as Partial<IQuestionPaper>);

      logger.info(`Successfully completed PDF Processing for ${paperId}`);
      
      // Next Step in Architecture: Trigger Duplicate Detection Queue
      const { duplicateWorkerService } = await import('../queue/duplicate.queue');
      duplicateWorkerService.addJob(paperId);

    } catch (error: any) {
      logger.error(`PDF Processing Failed for ${paperId}: ${error.message}`);
      
      // Update database status to reflect failure
      const paper = await this.repository.findByPaperId(paperId);
      if (paper) {
        await this.repository.update(String(paper._id), {
          ocrTextPlaceholder: 'PROCESSING_FAILED'
        } as Partial<IQuestionPaper>);
      }
      
      throw error;
    }
  }
}

export const pdfProcessorService = new PDFProcessorService();
