import { WorkflowService } from '../services/workflow.service';
import { ModerationRepository } from '../repositories/moderation.repository';
import { AuditLogService } from '../../audit/services/audit.service';
import { ReportStatus } from '../../../interfaces/report.interface';

jest.mock('../repositories/moderation.repository');
jest.mock('../../audit/services/audit.service');

describe('WorkflowService', () => {
  let workflowService: WorkflowService;
  
  beforeEach(() => {
    workflowService = new WorkflowService();
    (workflowService as any).repository = new ModerationRepository();
    (workflowService as any).auditService = new AuditLogService();
  });

  it('should assign moderator and log audit', async () => {
    const mockReport = { _id: 'reportId', status: ReportStatus.ASSIGNED, assigneeId: 'mod123' };
    (workflowService as any).repository.updateReport.mockResolvedValue(mockReport);
    (workflowService as any).auditService.log.mockResolvedValue(true);

    const result = await workflowService.assignModerator('reportId', 'mod123', 'admin456');

    expect(result).toEqual(mockReport);
    expect((workflowService as any).repository.updateReport).toHaveBeenCalledWith('reportId', {
      assigneeId: 'mod123',
      status: ReportStatus.ASSIGNED
    });
    expect((workflowService as any).auditService.log).toHaveBeenCalledWith({
      userId: 'admin456',
      action: 'MODERATOR_ASSIGNED',
      resource: 'Report',
      resourceId: 'reportId',
      details: { assigneeId: 'mod123' }
    });
  });
});
