import { AiConversation, IMessage } from '../../../models/aiConversation.model';
import { AppError } from '../../../utils/AppError';
import { v4 as uuidv4 } from 'uuid';

export class ConversationManager {
  async getOrCreateSession(userId: string, conversationId?: string) {
    if (conversationId) {
      const conv = await AiConversation.findOne({ conversationId, userId });
      if (!conv) throw new AppError('Conversation not found', 404);
      return conv;
    }

    return await AiConversation.create({
      conversationId: uuidv4(),
      userId,
      messages: []
    });
  }

  async addMessage(conversationId: string, userId: string, role: 'system' | 'user' | 'assistant', content: string) {
    const conv = await AiConversation.findOne({ conversationId, userId });
    if (!conv) throw new AppError('Conversation not found', 404);

    conv.messages.push({ role, content, timestamp: new Date() });
    conv.lastActiveAt = new Date();
    
    // Auto-generate title for first user message
    if (conv.messages.length === 1 && role === 'user') {
      conv.title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
    }

    await conv.save();
    return conv;
  }

  async getContextWindow(conversationId: string, userId: string, limit = 10) {
    const conv = await AiConversation.findOne({ conversationId, userId });
    if (!conv) return [];

    // Return the last N messages to fit context window
    return conv.messages.slice(-limit).map((m: any) => ({
      role: m.role,
      content: m.content
    }));
  }

  async getHistory(userId: string) {
    return await AiConversation.find({ userId })
      .sort({ lastActiveAt: -1 })
      .select('conversationId title lastActiveAt');
  }

  async getConversation(conversationId: string, userId: string) {
    const conv = await AiConversation.findOne({ conversationId, userId });
    if (!conv) throw new AppError('Conversation not found', 404);
    return conv;
  }

  async deleteConversation(conversationId: string, userId: string) {
    const result = await AiConversation.deleteOne({ conversationId, userId });
    if (result.deletedCount === 0) throw new AppError('Conversation not found', 404);
    return { success: true };
  }
}

export const conversationManager = new ConversationManager();
