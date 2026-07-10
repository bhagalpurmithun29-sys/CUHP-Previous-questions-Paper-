import { InsightRepository } from '../repositories/insight.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { PatternRepository } from '../../pattern-analysis/repositories/pattern.repository';

export class InsightService {
  private repo = new InsightRepository();
  private auditService = new AuditLogService();
  private patternRepo = new PatternRepository();

  async processPaper(paperId: string, userId: string) {
    const patternData = await this.patternRepo.getJob(paperId);
    if (!patternData || patternData.status !== 'COMPLETED' || patternData.reviewStatus !== 'APPROVED') {
       throw new Error('Pattern analysis must be completed and approved before generating insights');
    }

    const job = await this.repo.createOrUpdateJob(paperId, { status: 'QUEUED' });

    setTimeout(async () => {
      try {
        await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
        
        // Simulating the LLM Insight Generation based on aggregated metadata
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        await this.repo.createOrUpdateJob(paperId, {
           status: 'COMPLETED',
           executiveSummary: 'This examination paper demonstrates a highly balanced assessment aligned with standard curriculum benchmarks, focusing heavily on applied knowledge and complex problem-solving.',
           facultyInsights: {
               assessmentBalance: 'Excellent balance between theoretical knowledge and practical application.',
               coverageObservations: 'Strong coverage of core algorithms, but lacks depth in emerging data structures.',
               difficultyDistribution: 'Slightly skewed towards higher difficulty, which may challenge average students.'
           },
           studentInsights: {
               studyPriorities: 'Focus on mastering dynamic programming and graph traversals as they carry heavy weight.',
               topicCoverageSummary: 'Broad coverage expected across all primary modules.',
               preparationSummary: 'Prepare for application-based questions rather than direct definitions.'
           },
           explainability: {
               confidenceScore: 92,
               evidenceReferences: ['Extracted Question 4 aligns with High Difficulty model.', 'Pattern Analysis indicates 45% weightage to Algorithms.'],
               reasoningSummary: 'Insights derived securely by aggregating outputs from the Difficulty, Bloom, and Pattern engines.'
           }
        });

        await this.auditService.log({
          userId, action: 'INSIGHT_GENERATION_COMPLETED', resourceId: paperId, resourceType: 'PAPER'
        });
      } catch (err) {
        await this.repo.createOrUpdateJob(paperId, { status: 'FAILED' });
      }
    }, 1000);

    return job;
  }

  async getInsights(paperId: string) {
    return this.repo.getJob(paperId);
  }
}
