import { Workspace, IWorkspace } from '../models/Workspace.model';

class WorkspaceRepository {
  async getUserWorkspaces(userId: string) {
    return Workspace.find({ 'members.userId': userId, isArchived: false })
      .select('name description type members')
      .lean();
  }

  async getWorkspaceById(id: string) {
    return Workspace.findById(id).populate('members.userId', 'firstName lastName avatar').lean();
  }

  async createWorkspace(data: Partial<IWorkspace>) {
    return Workspace.create(data);
  }

  async updateWorkspace(id: string, data: Partial<IWorkspace>) {
    return Workspace.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async addMember(workspaceId: string, userId: string, role: string) {
    return Workspace.findByIdAndUpdate(
      workspaceId,
      {
        $push: { members: { userId: userId as any, role: role as any, joinedAt: new Date() } }
      },
      { new: true }
    );
  }

  async logActivity(workspaceId: string, userId: string, action: string, metadata?: any) {
    return Workspace.findByIdAndUpdate(workspaceId, {
      $push: { activityFeed: { userId: userId as any, action, metadata, timestamp: new Date() } }
    });
  }
}

export const workspaceRepository = new WorkspaceRepository();
