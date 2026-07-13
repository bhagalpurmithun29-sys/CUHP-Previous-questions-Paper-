import { promptManagementRepository } from '../../repositories/promptManagement.repository';
import { AppError } from '../../utils/AppError';

class VersionControlService {
  async publishVersion(id: string, versionId: string, userId: string) {
    const prompt = await promptManagementRepository.findById(id);
    const version = prompt.versions.find((v: any) => v.version === versionId);
    
    if (!version) throw new AppError('Version not found', 404);
    if (version.status !== 'APPROVED') throw new AppError('Only approved versions can be published', 400);

    prompt.currentVersion = versionId;
    prompt.status = 'PUBLISHED';
    version.status = 'PUBLISHED';
    
    return promptManagementRepository.update(id, prompt, userId);
  }

  async rollbackVersion(id: string, versionId: string, userId: string) {
    const prompt = await promptManagementRepository.findById(id);
    const version = prompt.versions.find((v: any) => v.version === versionId);
    
    if (!version) throw new AppError('Version not found', 404);

    prompt.currentVersion = versionId;
    
    // Log rollback action
    return promptManagementRepository.update(id, prompt, userId);
  }

  generateNextVersion(currentVersion: string, type: 'major' | 'minor' = 'minor') {
    const [major, minor] = currentVersion.split('.').map(Number);
    if (type === 'major') return `\${major + 1}.0`;
    return `\${major}.\${minor + 1}`;
  }
}

export const versionControlService = new VersionControlService();
