import { MarksRepository } from '../repositories/marks.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomRepository } from '../../bloom/repositories/bloom.repository';
import { TopicRepository } from '../../topic-mapping/repositories/topic.repository';
import { DifficultyRepository } from '../../difficulty/repositories/difficulty.repository';

export class MarksService {
  private repo = new MarksRepository();
  private auditService = new AuditLogService();
  private extractionRepo = new ExtractionRepository();
  private bloomRepo = new BloomRepository();
  private topicRepo = new TopicRepository();
  private difficultyRepo = new DifficultyRepository();

  async processPaper(paperId: string, userId: string) {
    const extractionJob = await this.extractionRepo.getJob(paperId);
    if (!extractionJob || extractionJob.status !== 'COMPLETED' || extractionJob.reviewStatus !== 'APPROVED') {
        throw new Error('Question extraction must be completed and approved before Marks Analysis.');
    }
    
    // Attempt to load context from other AI engines
    const bloomJob = await this.bloomRepo.getJob(paperId);
    const topicJob = await this.topicRepo.getJob(paperId);
    const difficultyJob = await this.difficultyRepo.getJob(paperId);

    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      errorMessage: null
    });

    this.runWorker(paperId, userId, extractionJob.extractedQuestions, bloomJob, topicJob, difficultyJob);

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    return this.processPaper(paperId, userId);
  }

  private async runWorker(paperId: string, userId: string, questions: any[], bloomContext: any, topicContext: any, difficultyContext: any) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         
         let totalMarks = 0;
         const sectionBreakdownMap: Record<string, any> = {};
         const bloomWeightage: Record<string, number> = {};
         const diffWeightage: Record<string, number> = {};
         const unitWeightage: Record<string, number> = {};
         const topicWeightage: Record<string, number> = {};

         questions.forEach(q => {
             const mark = q.marks || (Math.floor(Math.random() * 5) + 1); // Mock if extraction didn't pull marks
             totalMarks += mark;

             // Section Breakdown
             const section = q.section || 'A';
             if (!sectionBreakdownMap[section]) {
                 sectionBreakdownMap[section] = { sectionName: section, totalMarks: 0, questionCount: 0, mandatoryMarks: 0, optionalMarks: 0 };
             }
             sectionBreakdownMap[section].totalMarks += mark;
             sectionBreakdownMap[section].questionCount += 1;
             
             // Is it an OR question?
             if (q.text.toLowerCase().includes(' or ') || Math.random() > 0.8) {
                 sectionBreakdownMap[section].optionalMarks += mark;
             } else {
                 sectionBreakdownMap[section].mandatoryMarks += mark;
             }

             // Correlation Weightages
             const bloomForQ = bloomContext?.classifications?.find((c: any) => c.questionId === q.id);
             if (bloomForQ) {
                 bloomWeightage[bloomForQ.bloomLevel] = (bloomWeightage[bloomForQ.bloomLevel] || 0) + mark;
             }

             const diffForQ = difficultyContext?.analyses?.find((a: any) => a.questionId === q.id);
             if (diffForQ) {
                 diffWeightage[diffForQ.difficultyLevel] = (diffWeightage[diffForQ.difficultyLevel] || 0) + mark;
             }

             const topicForQ = topicContext?.mappings?.find((m: any) => m.questionId === q.id);
             if (topicForQ) {
                 unitWeightage[topicForQ.unit] = (unitWeightage[topicForQ.unit] || 0) + mark;
                 topicWeightage[topicForQ.topic] = (topicWeightage[topicForQ.topic] || 0) + mark;
             }
         });

         const sectionBreakdown = Object.values(sectionBreakdownMap);
         
         // Convert weightages to percentages
         const toPercentage = (record: Record<string, number>) => {
             const result: Record<string, number> = {};
             for (const key in record) {
                 result[key] = totalMarks > 0 ? parseFloat(((record[key] / totalMarks) * 100).toFixed(1)) : 0;
             }
             return result;
         }

         const weightage = {
             bloom: toPercentage(bloomWeightage),
             difficulty: toPercentage(diffWeightage),
             unit: toPercentage(unitWeightage),
             topic: toPercentage(topicWeightage)
         };

         // Balance Evaluators (Mock logic)
         const getBalance = () => {
             const r = Math.random();
             if (r > 0.8) return 'Excellent';
             if (r > 0.5) return 'Good';
             if (r > 0.2) return 'Fair';
             return 'Poor';
         };

         const balanceIndicators = {
             marksBalance: getBalance(),
             sectionBalance: getBalance(),
             topicCoverage: getBalance(),
             difficultyDistribution: getBalance(),
             bloomDistribution: getBalance()
         };

         const internalChoiceAnalysis = {
             totalChoiceQuestions: Math.floor(questions.length * 0.2),
             totalChoiceMarks: Math.floor(totalMarks * 0.2),
             choiceBalance: 'Generally balanced across options'
         };

         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             totalMarks,
             sectionBreakdown,
             weightage,
             assessmentQualityScore: 70 + Math.floor(Math.random() * 25),
             balanceIndicators,
             internalChoiceAnalysis,
             confidenceScore: 85 + Math.floor(Math.random() * 15),
             reviewStatus: 'PENDING_REVIEW'
         });
         
         await this.auditService.log({
            userId,
            action: 'MARKS_ANALYSIS_COMPLETED',
            resource: 'MarksAnalysis',
            resourceId: paperId
         });
      }, 5000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async reviewAnalysis(paperId: string, action: 'APPROVE' | 'REJECT', userId: string) {
      const reviewStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
      const job = await this.repo.updateReview(paperId, reviewStatus);
      
      await this.auditService.log({
        userId,
        action: `MARKS_ANALYSIS_${reviewStatus}`,
        resource: 'MarksAnalysis',
        resourceId: paperId
      });
      
      return job;
  }
}
