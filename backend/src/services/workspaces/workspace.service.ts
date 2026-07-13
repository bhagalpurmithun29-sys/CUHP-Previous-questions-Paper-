import { workspaceRepository } from '../../repositories/workspace.repository';

class WorkspaceService {
  async getWorkspacesForUser(userId: string) {
    return workspaceRepository.getUserWorkspaces(userId);
  }

  async getWorkspaceDetails(id: string) {
    return workspaceRepository.getWorkspaceById(id);
  }

  async createWorkspace(userId: string, data: any) {
    // Creator is the OWNER
    data.members = [{ userId, role: 'OWNER' }];
    data.activityFeed = [{ userId, action: 'Workspace Created' }];
    return workspaceRepository.createWorkspace(data);
  }

  async addMemberToWorkspace(workspaceId: string, targetUserId: string, role: string, actionUserId: string) {
    await workspaceRepository.logActivity(workspaceId, actionUserId, 'Added new member', { targetUserId, role });
    return workspaceRepository.addMember(workspaceId, targetUserId, role);
  }
}

export const workspaceService = new WorkspaceService();
