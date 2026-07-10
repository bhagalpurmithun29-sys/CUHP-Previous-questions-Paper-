import { TopicService } from '../services/topic.service';
import { TopicRepository } from '../repositories/topic.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ExtractionRepository } from '../../question-extraction/repositories/extraction.repository';

jest.mock('../repositories/topic.repository');
jest.mock('../../audit/services/audit.service');
jest.mock('../../question-extraction/repositories/extraction.repository');

describe('TopicService', () => {
  let service: TopicService;
  
  beforeEach(() => {
    service = new TopicService();
    (service as any).repo = new TopicRepository();
    (service as any).auditService = new AuditLogService();
    (service as any).extractionRepo = new ExtractionRepository();
  });

  it('should queue a paper for topic mapping if extraction is approved', async () => {
    ((service as any).extractionRepo.getJob as jest.Mock).mockResolvedValue({ status: 'COMPLETED', reviewStatus: 'APPROVED', extractedQuestions: [] });
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
    ((service as any).repo.updateQuestionReview as jest.Mock).mockResolvedValue(mockJob);
    ((service as any).auditService.log as jest.Mock).mockResolvedValue(true);

    const result = await service.reviewMapping('paper1', 'q1', 'APPROVE', 'admin1');
    
    expect(result.reviewStatus).toBe('APPROVED');
    expect((service as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({ action: 'TOPIC_MAPPING_APPROVED' }));
  });
});
