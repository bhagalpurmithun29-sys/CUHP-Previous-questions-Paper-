import { TopicRepository } from '../repositories/topic.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomRepository } from '../../bloom/repositories/bloom.repository';

export class TopicService {
  private repo = new TopicRepository();
  private auditService = new AuditLogService();
  private extractionRepo = new ExtractionRepository();
  private bloomRepo = new BloomRepository();

  async processPaper(paperId: string, userId: string) {
    const extractionJob = await this.extractionRepo.getJob(paperId);
    if (!extractionJob || extractionJob.status !== 'COMPLETED' || extractionJob.reviewStatus !== 'APPROVED') {
        throw new Error('Question extraction must be completed and approved before Topic Mapping.');
    }

    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      errorMessage: null,
      mappings: []
    });

    this.runWorker(paperId, userId, extractionJob.extractedQuestions);

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    return this.processPaper(paperId, userId);
  }

  private async runWorker(paperId: string, userId: string, questions: any[]) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         const mockUnits = ['Unit 1: Fundamentals', 'Unit 2: Core Concepts', 'Unit 3: Advanced Topics', 'Unit 4: Applications'];
         const mockTopics = ['Topic A', 'Topic B', 'Topic C', 'Topic D', 'Topic E'];
         
         const mappings = questions.map(q => {
             const unit = mockUnits[Math.floor(Math.random() * mockUnits.length)];
             const topic = mockTopics[Math.floor(Math.random() * mockTopics.length)];
             
             return {
                 questionId: q.id,
                 unit,
                 chapter: `Chapter related to ${unit}`,
                 topic,
                 subtopic: `Subtopic of ${topic}`,
                 keywords: [topic.toLowerCase(), 'exam', 'concept'],
                 learningOutcome: `Student should demonstrate understanding of ${topic}`,
                 confidenceScore: 70 + Math.floor(Math.random() * 25),
                 reasoningSummary: `Identified semantic similarities with ${topic} in the syllabus structure.`,
                 reviewStatus: 'PENDING_REVIEW'
             };
         });
         
         const unitDistribution: Record<string, number> = {};
         mappings.forEach(m => {
             unitDistribution[m.unit] = (unitDistribution[m.unit] || 0) + 1;
         });
         
         const coverage = {
             totalUnits: Object.keys(unitDistribution).length,
             totalTopics: new Set(mappings.map(m => m.topic)).size,
             unitDistribution
         };
         
         const overallConfidence = mappings.length > 0 
            ? mappings.reduce((acc, curr) => acc + curr.confidenceScore, 0) / mappings.length 
            : 0;

         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             mappings,
             coverage,
             overallConfidence
         });
         
         await this.auditService.log({
            userId,
            action: 'TOPIC_MAPPING_COMPLETED',
            resource: 'TopicMapping',
            resourceId: paperId
         });
      }, 5000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async getQuestionMapping(paperId: string, questionId: string) {
      return this.repo.getQuestion(paperId, questionId);
  }
  
  async reviewMapping(paperId: string, questionId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', userId: string, manualOverrides?: any) {
      const reviewStatus = action === 'APPROVE' ? 'APPROVED' : action === 'REJECT' ? 'REJECTED' : 'EDITED';
      const job = await this.repo.updateQuestionReview(paperId, questionId, reviewStatus, manualOverrides);
      
      await this.auditService.log({
        userId,
        action: `TOPIC_MAPPING_${reviewStatus}`,
        resource: 'TopicMapping',
        resourceId: `${paperId}-${questionId}`
      });
      
      return job;
  }
}
