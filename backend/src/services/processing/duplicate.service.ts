import { similarityEngine, SimilarityResult } from './similarity.engine';
import { QuestionPaperRepository } from '../../repositories/paper.repository';
import { DuplicateReport } from '../../models/duplicateReport.model';
import { DuplicateDetectionLevel, DuplicateResolutionAction } from '../../interfaces/duplicate.interface';
import { logger } from '../../utils/logger';
import { AppError } from '../../utils/AppError';

export class DuplicateDetectionService {
  private paperRepository = new QuestionPaperRepository();

  /**
   * Determine Detection Level and Suggested Action based on the Similarity Result
   */
  private analyzeResult(result: SimilarityResult): { level: DuplicateDetectionLevel, action: DuplicateResolutionAction } {
    if (result.hashMatch || result.score >= 95) {
      return { level: DuplicateDetectionLevel.EXACT_DUPLICATE, action: DuplicateResolutionAction.DELETE_NEW };
    }
    if (result.score >= 80) {
      return { level: DuplicateDetectionLevel.NEAR_DUPLICATE, action: DuplicateResolutionAction.MARK_AS_VERSION };
    }
    if (result.score >= 60) {
      return { level: DuplicateDetectionLevel.POSSIBLE_DUPLICATE, action: DuplicateResolutionAction.MERGE };
    }
    return { level: DuplicateDetectionLevel.NO_DUPLICATE, action: DuplicateResolutionAction.IGNORE };
  }

  /**
   * Executes the duplicate detection pipeline for a newly processed paper
   */
  public async detectDuplicates(newPaperId: string): Promise<void> {
    try {
      logger.info(`Starting Duplicate Detection for Paper: ${newPaperId}`);
      
      const newPaper = await this.paperRepository.findByPaperId(newPaperId);
      if (!newPaper) throw new AppError(`Paper ${newPaperId} not found`, 404);

      // 1. Fetch potential candidates based on Subject & Year (Performance optimization)
      // We don't compare against the whole database, just the same subject/year cohort
      const candidatesRaw = await this.paperRepository.findBySubjectId(newPaper.subjectId.toString(), { page: 1, limit: 100 });
      const candidates = candidatesRaw.data.filter((p: any) => p.paperId !== newPaperId);

      if (candidates.length === 0) {
        logger.info(`[${newPaperId}] No candidates found. Marking duplicate check complete.`);
        return;
      }

      logger.info(`[${newPaperId}] Found ${candidates.length} candidates for comparison.`);

      // 2. Batch Compare using Similarity Engine
      let highestScore = 0;
      let bestMatch: any = null;
      let bestResult: SimilarityResult | null = null;

      for (const candidate of candidates) {
        const result = similarityEngine.compare(newPaper, candidate);
        if (result.score > highestScore) {
          highestScore = result.score;
          bestMatch = candidate;
          bestResult = result;
        }
      }

      // 3. Evaluate Results and Save Report
      if (bestResult && bestMatch && highestScore >= 60) {
        const { level, action } = this.analyzeResult(bestResult);
        
        await DuplicateReport.create({
          newPaperId: newPaper.paperId,
          matchedPaperId: bestMatch.paperId,
          similarityScore: bestResult.score,
          detectionLevel: level,
          hashMatch: bestResult.hashMatch,
          filenameSimilarity: bestResult.filenameSimilarity,
          metadataSimilarity: bestResult.metadataSimilarity,
          academicSimilarity: bestResult.academicSimilarity,
          pageCountMatch: bestResult.pageCountMatch,
          suggestedAction: action
        });

        logger.info(`[${newPaperId}] Duplicate detected! Matched with ${bestMatch.paperId} (Score: ${bestResult.score}%)`);
      } else {
        logger.info(`[${newPaperId}] No significant duplicates found (Highest Score: ${highestScore}%)`);
      }

    } catch (error: any) {
      logger.error(`Duplicate Detection Failed for ${newPaperId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Retrieves a duplicate report for a specific paper
   */
  public async getReport(paperId: string) {
    return await DuplicateReport.findOne({ newPaperId: paperId, resolved: false })
      .sort({ createdAt: -1 });
  }

  /**
   * Resolves a duplicate report
   */
  public async resolveReport(reportId: string, action: DuplicateResolutionAction, userId: string, notes?: string) {
    const report = await DuplicateReport.findById(reportId);
    if (!report) throw new AppError('Duplicate Report not found', 404);

    report.resolved = true;
    report.finalAction = action;
    report.resolvedAt = new Date();
    report.resolvedBy = userId as any;
    report.resolutionNotes = notes;

    await report.save();
    
    // In a real system, taking action (like DELETE_NEW) would trigger the PaperService.
    return report;
  }
}

export const duplicateDetectionService = new DuplicateDetectionService();
