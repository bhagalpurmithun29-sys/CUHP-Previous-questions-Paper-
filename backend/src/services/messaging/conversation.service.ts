import { messagingRepository } from '../../repositories/messaging.repository';

class ConversationService {
  async getConversations(userId: string, query: any) {
    return messagingRepository.getConversations(userId, Number(query.page || 1), Number(query.limit || 20));
  }

  async getConversationDetails(userId: string, conversationId: string) {
    const conv = await messagingRepository.getConversationById(conversationId);
    if (!conv || !conv.participants.some(p => p._id.toString() === userId)) {
      throw new Error('Unauthorized or conversation not found');
    }
    return conv;
  }

  async createDirectConversation(userId: string, targetUserId: string) {
    return messagingRepository.createConversation({
      type: 'DIRECT' as any,
      participants: [userId, targetUserId] as any
    });
  }

  async createGroupConversation(userId: string, name: string, participantIds: string[]) {
    const participants = [...new Set([userId, ...participantIds])];
    return messagingRepository.createConversation({
      type: 'GROUP' as any,
      name,
      participants: participants as any,
      admins: [userId] as any
    });
  }
}

export const conversationService = new ConversationService();
