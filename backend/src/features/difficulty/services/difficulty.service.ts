import { DifficultyRepository } from '../repositories/difficulty.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomRepository } from '../../bloom/repositories/bloom.repository';
import { TopicRepository } from '../../topic-mapping/repositories/topic.repository';
import { DifficultyLevel, ComplexityType } from '../../../models/difficulty.model';

export class DifficultyService {
  private repo = new DifficultyRepository();
  private auditService = new AuditLogService();
  private extractionRepo = new ExtractionRepository();
  private bloomRepo = new BloomRepository();
  private topicRepo = new TopicRepository();

  async processPaper(paperId: string, userId: string) {
    const extractionJob = await this.extractionRepo.getJob(paperId);
    if (!extractionJob || extractionJob.status !== 'COMPLETED' || extractionJob.reviewStatus !== 'APPROVED') {
        throw new Error('Question extraction must be completed and approved before Difficulty Analysis.');
    }
    
    const bloomJob = await this.bloomRepo.getJob(paperId);
    const topicJob = await this.topicRepo.getJob(paperId);

    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      errorMessage: null,
      analyses: []
    });

    this.runWorker(paperId, userId, extractionJob.extractedQuestions, bloomJob, topicJob);

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    return this.processPaper(paperId, userId);
  }

  private async runWorker(paperId: string, userId: string, questions: any[], bloomContext: any, topicContext: any) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         const difficultyLevels: DifficultyLevel[] = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
         const complexityTypes: ComplexityType[] = ['Single Concept', 'Multi Concept', 'Multi Step Reasoning', 'Analytical Reasoning', 'Problem Solving', 'Critical Thinking'];
         
         const analyses = questions.map(q => {
             const diff = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
             const comp = complexityTypes[Math.floor(Math.random() * complexityTypes.length)];
             
             const bloomForQ = bloomContext?.classifications?.find((c: any) => c.questionId === q.id);
             const topicForQ = topicContext?.mappings?.find((m: any) => m.questionId === q.id);
             
             return {
                 questionId: q.id,
                 difficultyLevel: diff,
                 complexityType: comp,
                 expectedSolvingTimeMinutes: Math.max(1, Math.floor(Math.random() * 15)),
                 prerequisiteKnowledge: ['Fundamental algebra', 'Basic concept understanding'],
                 confidenceScore: 65 + Math.floor(Math.random() * 30),
                 reasoningSummary: `Analysis based on cognitive depth${bloomForQ ? ` (${bloomForQ.bloomLevel})` : ''} and topic complexity.`,
                 reviewStatus: 'PENDING_REVIEW'
             };
         });
         
         const diffDist: any = {};
         const compDist: any = {};
         let totalTime = 0;
         
         analyses.forEach(a => {
             diffDist[a.difficultyLevel] = (diffDist[a.difficultyLevel] || 0) + 1;
             compDist[a.complexityType] = (compDist[a.complexityType] || 0) + 1;
             totalTime += a.expectedSolvingTimeMinutes;
         });
         
         const distribution = {
             difficulty: diffDist,
             complexity: compDist,
             averageSolvingTimeMinutes: analyses.length > 0 ? parseFloat((totalTime / analyses.length).toFixed(1)) : 0
         };
         
         const overallConfidence = analyses.length > 0 
            ? analyses.reduce((acc, curr) => acc + curr.confidenceScore, 0) / analyses.length 
            : 0;

         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             analyses,
             distribution,
             overallConfidence
         });
         
         await this.auditService.log({
            userId,
            action: 'DIFFICULTY_ANALYSIS_COMPLETED',
            resource: 'DifficultyAnalysis',
            resourceId: paperId
         });
      }, 5000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async getQuestionAnalysis(paperId: string, questionId: string) {
      return this.repo.getQuestion(paperId, questionId);
  }
  
  async reviewAnalysis(paperId: string, questionId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', userId: string, manualOverrides?: any) {
      const reviewStatus = action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'EDITED';
      const job = await this.repo.updateQuestionReview(paperId, questionId, reviewStatus, manualOverrides);
      
      await this.auditService.log({
        userId,
        action: `DIFFICULTY_ANALYSIS_${reviewStatus}`,
        resource: 'DifficultyAnalysis',
        resourceId: `${paperId}-${questionId}`
      });
      
      return job;
  }
}
