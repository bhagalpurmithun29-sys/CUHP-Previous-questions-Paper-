import { ReviewWorkflowService } from '../services/review-workflow.service';
import { AIMetadata } from '../../../models/aiMetadata.model';
import { QuestionPaper } from '../../../models/paper.model';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../../../models/aiMetadata.model');
jest.mock('../../../models/paper.model');
jest.mock('../../audit/services/audit.service');

describe('ReviewWorkflowService', () => {
  let reviewService: ReviewWorkflowService;
  
  beforeEach(() => {
    reviewService = new ReviewWorkflowService();
    (reviewService as any).auditService = new AuditLogService();
  });

  it('should approve metadata, update paper, and log audit', async () => {
    const mockRecord = {
      _id: 'ai1',
      paperId: 'paper1',
      suggestions: {
          title: { value: 'Test', confidence: 90 }
      },
      moderatorReviewed: false,
      save: jest.fn().mockResolvedValue(true)
    };
    
    (AIMetadata.findOne as jest.Mock).mockResolvedValue(mockRecord);
    (QuestionPaper.findByIdAndUpdate as jest.Mock).mockResolvedValue(true);
    ((reviewService as any).auditService.log as jest.Mock).mockResolvedValue(true);

    await reviewService.reviewMetadata('paper1', { title: 'Test' }, 'mod1');

    expect(mockRecord.moderatorReviewed).toBe(true);
    expect(mockRecord.save).toHaveBeenCalled();
    expect(QuestionPaper.findByIdAndUpdate).toHaveBeenCalledWith('paper1', { title: 'Test' });
    expect((reviewService as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({
      action: 'AI_METADATA_APPROVED'
    }));
  });
});
