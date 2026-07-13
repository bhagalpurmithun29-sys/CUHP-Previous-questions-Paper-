import { promptManagementRepository } from '../../repositories/promptManagement.repository';
import { AppError } from '../../utils/AppError';

class ApprovalService {
  async requestApproval(id: string, versionId: string, userId: string) {
    const prompt = await promptManagementRepository.findById(id);
    const version = prompt.versions.find((v: any) => v.version === versionId);
    
    if (!version) throw new AppError('Version not found', 404);
    
    version.status = 'REVIEW';
    return promptManagementRepository.update(id, prompt, userId);
  }

  async approveVersion(id: string, versionId: string, userId: string) {
    const prompt = await promptManagementRepository.findById(id);
    const version = prompt.versions.find((v: any) => v.version === versionId);
    
    if (!version) throw new AppError('Version not found', 404);
    
    version.status = 'APPROVED';
    version.approvedBy = userId;
    version.approvedAt = new Date();
    
    return promptManagementRepository.update(id, prompt, userId);
  }
}

export const approvalService = new ApprovalService();
