import { DifficultyService } from '../services/difficulty.service';
import { DifficultyRepository } from '../repositories/difficulty.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomRepository } from '../../bloom/repositories/bloom.repository';
import { TopicRepository } from '../../topic-mapping/repositories/topic.repository';

jest.mock('../repositories/difficulty.repository');
jest.mock('../../audit/services/audit.service');
jest.mock('../../question-extraction/repositories/extraction.repository');
jest.mock('../../bloom/repositories/bloom.repository');
jest.mock('../../topic-mapping/repositories/topic.repository');

describe('DifficultyService', () => {
  let service: DifficultyService;
  
  beforeEach(() => {
    service = new DifficultyService();
    (service as any).repo = new DifficultyRepository();
    (service as any).auditService = new AuditLogService();
    (service as any).extractionRepo = new ExtractionRepository();
    (service as any).bloomRepo = new BloomRepository();
    (service as any).topicRepo = new TopicRepository();
  });

  it('should queue a paper for difficulty analysis if extraction is approved', async () => {
    ((service as any).extractionRepo.getJob as jest.Mock).mockResolvedValue({ status: 'COMPLETED', reviewStatus: 'APPROVED', extractedQuestions: [] });
    ((service as any).bloomRepo.getJob as jest.Mock).mockResolvedValue(null);
    ((service as any).topicRepo.getJob as jest.Mock).mockResolvedValue(null);
    
    const mockJob = { _id: 'job1', paperId: 'paper1', status: 'QUEUED' };
    ((service as any).repo.createOrUpdateJob as jest.Mock).mockResolvedValue(mockJob);

    const result = await service.processPaper('paper1', 'admin1');
    
    expect(result.status).toBe('QUEUED');
    expect((service as any).repo.createOrUpdateJob).toHaveBeenCalledWith('paper1', expect.objectContaining({ status: 'QUEUED' }));
  });
  
  it('should throw error if extraction is not approved', async () => {
    ((service as any).extractionRepo.getJob as jest.Mock).mockResolvedValue({ status: 'COMPLETED', reviewStatus: 'PENDING_REVIEW' });
    
    await expect(service.processPaper('paper1', 'admin1')).rejects.toThrow('Question extraction must be completed and approved');
  });

  it('should record review action with overrides', async () => {
    const mockJob = { _id: 'job1', reviewStatus: 'EDITED' };
    ((service as any).repo.updateQuestionReview as jest.Mock).mockResolvedValue(mockJob);
    ((service as any).auditService.log as jest.Mock).mockResolvedValue(true);

    const overrides = { difficultyLevel: 'Hard', expectedSolvingTimeMinutes: 10 };
    const result = await service.reviewAnalysis('paper1', 'q1', 'EDIT', 'admin1', overrides);
    
    expect(result.reviewStatus).toBe('EDITED');
    expect((service as any).repo.updateQuestionReview).toHaveBeenCalledWith('paper1', 'q1', 'EDITED', overrides);
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'DIFFICULTY_ANALYSIS_EDITED' }));
  });
});
