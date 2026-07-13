import { Types } from 'mongoose';

class ModerationService {
  private moderationQueue: any[] = [];

  async addToQueue(content: string, type: 'INPUT' | 'OUTPUT', userId: string, reason: string) {
    const item = {
      id: new Types.ObjectId().toString(),
      content,
      type,
      userId,
      reason,
      status: 'PENDING',
      timestamp: new Date()
    };
    this.moderationQueue.push(item);
    return item;
  }

  async getQueue() {
    return this.moderationQueue.filter(item => item.status === 'PENDING');
  }

  async resolveItem(id: string, resolution: 'APPROVED' | 'REJECTED', moderatorId: string) {
    const item = this.moderationQueue.find(i => i.id === id);
    if (!item) throw new Error('Item not found');
    
    item.status = resolution;
    item.resolvedBy = moderatorId;
    item.resolvedAt = new Date();
    
    return item;
  }
}

export const moderationService = new ModerationService();
