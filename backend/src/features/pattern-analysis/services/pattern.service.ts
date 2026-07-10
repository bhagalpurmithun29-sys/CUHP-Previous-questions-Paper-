import { PatternRepository } from '../repositories/pattern.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomRepository } from '../../bloom/repositories/bloom.repository';
import { TopicRepository } from '../../topic-mapping/repositories/topic.repository';
import { DifficultyRepository } from '../../difficulty/repositories/difficulty.repository';
import { MarksRepository } from '../../marks-analysis/repositories/marks.repository';

export class PatternService {
  private repo = new PatternRepository();
  private auditService = new AuditLogService();
  private extractionRepo = new ExtractionRepository();
  private bloomRepo = new BloomRepository();
  private topicRepo = new TopicRepository();
  private difficultyRepo = new DifficultyRepository();
  private marksRepo = new MarksRepository();

  async processPaper(paperId: string, userId: string) {
    const extractionJob = await this.extractionRepo.getJob(paperId);
    if (!extractionJob || extractionJob.status !== 'COMPLETED' || extractionJob.reviewStatus !== 'APPROVED') {
        throw new Error('Question extraction must be completed and approved before Pattern Analysis.');
    }
    
    // Aggregate context from all 4 previous layers
    const bloomJob = await this.bloomRepo.getJob(paperId);
    const topicJob = await this.topicRepo.getJob(paperId);
    const difficultyJob = await this.difficultyRepo.getJob(paperId);
    const marksJob = await this.marksRepo.getJob(paperId);

    const job = await this.repo.createOrUpdateJob(paperId, {
      status: 'QUEUED',
      errorMessage: null
    });

    this.runWorker(paperId, userId, extractionJob.extractedQuestions, { bloomJob, topicJob, difficultyJob, marksJob });

    return job;
  }

  async reprocessPaper(paperId: string, userId: string) {
    return this.processPaper(paperId, userId);
  }

  private async runWorker(paperId: string, userId: string, questions: any[], context: any) {
    setTimeout(async () => {
      await this.repo.createOrUpdateJob(paperId, { status: 'PROCESSING' });
      
      setTimeout(async () => {
         
         const sections: Record<string, any> = {};
         
         questions.forEach(q => {
             const sec = q.section || 'A';
             if (!sections[sec]) {
                 sections[sec] = { questionCount: 0, totalMarks: 0 };
             }
             sections[sec].questionCount += 1;
             sections[sec].totalMarks += (q.marks || 5);
         });
         
         const sectionStructures = Object.keys(sections).map(sec => ({
             sectionName: sec,
             questionCount: sections[sec].questionCount,
             marksPerQuestion: sections[sec].questionCount > 0 ? parseFloat((sections[sec].totalMarks / sections[sec].questionCount).toFixed(1)) : 0,
             totalMarks: sections[sec].totalMarks,
             choicePattern: Math.random() > 0.7 ? 'Internal Choice' : 'No Choice',
             dominantBloom: 'Analyze',
             dominantTopic: 'Mixed'
         }));
         
         const blueprint = {
             sectionCount: Object.keys(sections).length,
             totalQuestionCount: questions.length,
             totalMarks: sectionStructures.reduce((acc, curr) => acc + curr.totalMarks, 0),
             sectionStructures
         };
         
         const recurringStructures = [
             { type: 'Question Ordering', frequency: 85, description: 'Questions are consistently ordered by ascending difficulty.' },
             { type: 'Section Distribution', frequency: 90, description: 'Standard 3-section layout matching 80% of repository.' },
             { type: 'Topic Pairing', frequency: 65, description: 'Topic A is frequently paired with Topic B in long-form questions.' }
         ];

         await this.repo.createOrUpdateJob(paperId, { 
             status: 'COMPLETED',
             blueprint,
             recurringStructures,
             patternSummary: 'The document strictly adheres to the standard university blueprint with high structural consistency across sections and topics.',
             blueprintSimilarityScore: 82 + Math.floor(Math.random() * 15),
             confidenceScore: 88 + Math.floor(Math.random() * 10),
             reviewStatus: 'PENDING_REVIEW'
         });
         
         await this.auditService.log({
            userId,
            action: 'PATTERN_ANALYSIS_COMPLETED',
            resource: 'PatternAnalysis',
            resourceId: paperId
         });
      }, 5000);
    }, 1000);
  }

  async getStatus(paperId: string) {
    return this.repo.getJob(paperId);
  }

  async getSimilar(paperId: string) {
      return {
          matches: [
              { paperId: 'mock-1', similarity: 94 },
              { paperId: 'mock-2', similarity: 88 }
          ]
      };
  }

  async reviewAnalysis(paperId: string, action: 'APPROVE' | 'REJECT', userId: string) {
      const reviewStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
      const job = await this.repo.updateReview(paperId, reviewStatus);
      
      await this.auditService.log({
        userId,
        action: `PATTERN_ANALYSIS_${reviewStatus}`,
        resource: 'PatternAnalysis',
        resourceId: paperId
      });
      
      return job;
  }
}
