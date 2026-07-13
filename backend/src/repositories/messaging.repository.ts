import { Conversation, IConversation } from '../models/Conversation.model';
import { Message, IMessage } from '../models/Message.model';
import { Types } from 'mongoose';

class MessagingRepository {
  
  // Conversations
  async getConversations(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const conversations = await Conversation.find({ participants: new Types.ObjectId(userId) })
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('participants', 'firstName lastName avatar onlineStatus')
      .lean();

    const total = await Conversation.countDocuments({ participants: new Types.ObjectId(userId) });
    return { conversations, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getConversationById(conversationId: string) {
    return Conversation.findById(conversationId).populate('participants', 'firstName lastName avatar onlineStatus role');
  }

  async createConversation(data: Partial<IConversation>) {
    return Conversation.create(data);
  }

  async updateConversationPreview(conversationId: string, preview: string) {
    return Conversation.findByIdAndUpdate(conversationId, {
      lastMessageAt: new Date(),
      lastMessagePreview: preview
    });
  }

  // Messages
  async getMessages(conversationId: string, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const messages = await Message.find({ conversationId: new Types.ObjectId(conversationId) })
      .sort({ createdAt: -1 }) // We fetch newest first, but client will reverse them
      .skip(skip)
      .limit(limit)
      .populate('senderId', 'firstName lastName avatar')
      .populate('replyTo', 'content senderId')
      .lean();

    const total = await Message.countDocuments({ conversationId: new Types.ObjectId(conversationId) });
    return { messages, total, page, totalPages: Math.ceil(total / limit) };
  }

  async createMessage(data: Partial<IMessage>) {
    return Message.create(data);
  }

  async markAsRead(conversationId: string, userId: string, messageId?: string) {
    const query: any = { conversationId: new Types.ObjectId(conversationId), readBy: { $ne: new Types.ObjectId(userId) } };
    if (messageId) {
       query._id = new Types.ObjectId(messageId);
    }
    return Message.updateMany(query, { $addToSet: { readBy: new Types.ObjectId(userId) } });
  }

  async searchMessages(userId: string, q: string) {
    // Basic search. In a real system, use Atlas Search or Semantic Search
    // First, find conversations this user is in
    const convs = await Conversation.find({ participants: new Types.ObjectId(userId) }, '_id').lean();
    const convIds = convs.map(c => c._id);

    return Message.find({
      conversationId: { $in: convIds },
      content: { $regex: q, $options: 'i' }
    }).populate('conversationId').populate('senderId', 'firstName lastName').limit(20).lean();
  }
}

export const messagingRepository = new MessagingRepository();
