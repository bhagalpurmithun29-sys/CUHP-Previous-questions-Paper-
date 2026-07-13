import mongoose from 'mongoose';
import { AiConversation } from '../models/aiConversation.model';

class PaperQARepository {
  async findConversationsByPaper(userId: string, paperId: string) {
    return AiConversation.find({
      userId: new mongoose.Types.ObjectId(userId),
      'metadata.paperId': paperId
    }).sort({ lastActiveAt: -1 }).lean();
  }

  async getConversationById(conversationId: string) {
    return AiConversation.findOne({ conversationId }).lean();
  }

  async saveMessage(conversationId: string, userId: string, paperId: string, message: any, isNew: boolean = false) {
    if (isNew) {
      return AiConversation.create({
        conversationId,
        userId: new mongoose.Types.ObjectId(userId),
        metadata: { paperId },
        messages: [message],
        lastActiveAt: new Date(),
        title: `Paper Q&A - ${paperId.substring(0, 8)}`
      });
    }

    return AiConversation.findOneAndUpdate(
      { conversationId },
      {
        $push: { messages: message },
        $set: { lastActiveAt: new Date() }
      },
      { new: true, upsert: true }
    );
  }

  async recordCitation(conversationId: string, messageId: string, citationData: any) {
    // Storing citations in metadata for simplicity, ideally a separate schema
    return AiConversation.findOneAndUpdate(
      { conversationId },
      {
        $push: { 'metadata.citations': { messageId, ...citationData } }
      }
    );
  }

  async getCitations(conversationId: string) {
    const convo = await this.getConversationById(conversationId);
    return convo?.metadata?.citations || [];
  }
}

export const paperQARepository = new PaperQARepository();
