import { Types } from 'mongoose';
import { AiConversation } from '../models/aiConversation.model';

class FacultyCopilotRepository {
  async getHistory(userId: string) {
    return AiConversation.find({
      userId: new Types.ObjectId(userId),
      'metadata.type': 'FACULTY_COPILOT'
    }).sort({ lastActiveAt: -1 }).lean();
  }

  async saveMessage(conversationId: string, userId: string, message: any, isNew: boolean = false) {
    if (isNew) {
      return AiConversation.create({
        conversationId,
        userId: new Types.ObjectId(userId),
        metadata: { type: 'FACULTY_COPILOT' },
        messages: [message],
        lastActiveAt: new Date(),
        title: 'Curriculum Intelligence Session'
      });
    }

    return AiConversation.findOneAndUpdate(
      { conversationId, userId: new Types.ObjectId(userId) },
      {
        $push: { messages: message },
        $set: { lastActiveAt: new Date() }
      },
      { new: true, upsert: true }
    );
  }

  async recordCitation(conversationId: string, citation: any) {
    return AiConversation.findOneAndUpdate(
      { conversationId },
      { $push: { 'metadata.citations': citation } }
    );
  }
}

export const facultyCopilotRepository = new FacultyCopilotRepository();
