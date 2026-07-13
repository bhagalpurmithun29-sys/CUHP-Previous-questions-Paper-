import { messagingRepository } from '../../repositories/messaging.repository';
import { websocketGateway } from './websocket.gateway';
import { IMessage } from '../../models/Message.model';

class MessageService {
  async getMessages(userId: string, conversationId: string, query: any) {
    const conv = await messagingRepository.getConversationById(conversationId);
    if (!conv || !conv.participants.some(p => p._id.toString() === userId)) {
      throw new Error('Unauthorized access to conversation');
    }

    return messagingRepository.getMessages(conversationId, Number(query.page || 1), Number(query.limit || 50));
  }

  async sendMessage(userId: string, data: Partial<IMessage>) {
    const conv = await messagingRepository.getConversationById(data.conversationId!.toString());
    if (!conv || !conv.participants.some(p => p._id.toString() === userId)) {
      throw new Error('Unauthorized to send message in this conversation');
    }

    data.senderId = userId as any;
    const msg = await messagingRepository.createMessage(data);
    
    // Truncate for preview
    const preview = data.content!.length > 40 ? data.content!.substring(0, 40) + '...' : data.content;
    await messagingRepository.updateConversationPreview(data.conversationId!.toString(), preview as string);

    // Notify participants
    conv.participants.forEach(p => {
       websocketGateway.emitToUser(p._id.toString(), 'NEW_MESSAGE', msg);
    });

    return msg;
  }

  async markAsRead(userId: string, conversationId: string, messageId?: string) {
    await messagingRepository.markAsRead(conversationId, userId, messageId);
    
    // Notify sender that it was read
    websocketGateway.emitToConversation(conversationId, 'MESSAGE_READ', { conversationId, userId, messageId });
    return { success: true };
  }

  async searchMessages(userId: string, q: string) {
    if (!q) return [];
    return messagingRepository.searchMessages(userId, q);
  }
}

export const messageService = new MessageService();
