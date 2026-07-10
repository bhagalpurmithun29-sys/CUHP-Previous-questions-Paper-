import { MergeService } from '../services/merge.service';
import { DuplicateReport } from '../../../models/duplicateReport.model';
import { QuestionPaper } from '../../../models/paper.model';
import { AuditLogService } from '../../audit/services/audit.service';

jest.mock('../../../models/duplicateReport.model');
jest.mock('../../../models/paper.model');
jest.mock('../../audit/services/audit.service');

describe('MergeService', () => {
  let mergeService: MergeService;
  
  beforeEach(() => {
    mergeService = new MergeService();
    (mergeService as any).auditService = new AuditLogService();
  });

  it('should successfully merge papers and log audit', async () => {
    const mockReport = {
      _id: 'report1',
      newPaperId: 'paper1',
      matchedPaperId: 'paper2',
      resolved: false,
      save: jest.fn().mockResolvedValue(true)
    };
    
    const mockNewPaper = {
      paperId: 'paper1',
      isDeleted: false,
      save: jest.fn().mockResolvedValue(true)
    };
    
    const mockMatchedPaper = {
      paperId: 'paper2'
    };

    (DuplicateReport.findById as jest.Mock).mockResolvedValue(mockReport);
    (QuestionPaper.findOne as jest.Mock)
      .mockResolvedValueOnce(mockNewPaper)
      .mockResolvedValueOnce(mockMatchedPaper);
    
    (mergeService as any).auditService.log.mockResolvedValue(true);

    const result = await mergeService.mergePapers('report1', 'mod1', 'Test notes');

    expect(mockNewPaper.isDeleted).toBe(true);
    expect(mockNewPaper.save).toHaveBeenCalled();
    expect(mockReport.resolved).toBe(true);
    expect(mockReport.save).toHaveBeenCalled();
    expect((mergeService as any).auditService.log).toHaveBeenCalledWith(expect.objectContaining({
      action: 'MERGE_COMPLETED'
    }));
  });
});
