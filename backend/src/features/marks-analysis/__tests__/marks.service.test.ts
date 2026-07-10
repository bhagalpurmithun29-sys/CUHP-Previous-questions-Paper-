import { MarksService } from '../services/marks.service';
import { MarksRepository } from '../repositories/marks.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';
import { BloomRepository } from '../../bloom/repositories/bloom.repository';
import { TopicRepository } from '../../topic-mapping/repositories/topic.repository';
import { DifficultyRepository } from '../../difficulty/repositories/difficulty.repository';

jest.mock('../repositories/marks.repository');
jest.mock('../../audit/services/audit.service');
jest.mock('../../question-extraction/repositories/extraction.repository');
jest.mock('../../bloom/repositories/bloom.repository');
jest.mock('../../topic-mapping/repositories/topic.repository');
jest.mock('../../difficulty/repositories/difficulty.repository');

describe('MarksService', () => {
  let service: MarksService;
  
  beforeEach(() => {
    service = new MarksService();
    (service as any).repo = new MarksRepository();
    (service as any).auditService = new AuditLogService();
    (service as any).extractionRepo = new ExtractionRepository();
    (service as any).bloomRepo = new BloomRepository();
    (service as any).topicRepo = new TopicRepository();
    (service as any).difficultyRepo = new DifficultyRepository();
  });

  it('should queue a paper for marks analysis if extraction is approved', async () => {
    ((service as any).extractionRepo.getJob as jest.Mock).mockResolvedValue({ status: 'COMPLETED', reviewStatus: 'APPROVED', extractedQuestions: [] });
    ((service as any).bloomRepo.getJob as jest.Mock).mockResolvedValue(null);
    ((service as any).topicRepo.getJob as jest.Mock).mockResolvedValue(null);
    ((service as any).difficultyRepo.getJob as jest.Mock).mockResolvedValue(null);
    
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

  it('should record review action', async () => {
    const mockJob = { _id: 'job1', reviewStatus: 'APPROVED' };
    ((service as any).repo.updateReview as jest.Mock).mockResolvedValue(mockJob);
    ((service as any).auditService.log as jest.Mock).mockResolvedValue(true);

    const result = await service.reviewAnalysis('paper1', 'APPROVE', 'admin1');
    
    expect(result.reviewStatus).toBe('APPROVED');
    expect((service as any).repo.updateReview).toHaveBeenCalledWith('paper1', 'APPROVED');
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'MARKS_ANALYSIS_APPROVED' }));
  });
});
