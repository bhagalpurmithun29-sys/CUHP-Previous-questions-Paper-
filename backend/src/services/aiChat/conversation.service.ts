import { AiConversation } from '../../models/aiConversation.model';
import { ragContextService } from './ragContext.service';
import { v4 as uuidv4 } from 'uuid';
import { aiGateway } from '../../features/ai-gateway/services/gateway.service';
import mongoose from 'mongoose';

export class ConversationService {
  public async getUserConversations(userId: string) {
    return await AiConversation.find({ userId: new mongoose.Types.ObjectId(userId) })
      .select('conversationId title lastActiveAt createdAt')
      .sort({ lastActiveAt: -1 })
      .lean();
  }

  public async getConversation(userId: string, conversationId: string) {
    return await AiConversation.findOne({ 
      userId: new mongoose.Types.ObjectId(userId), 
      conversationId 
    }).lean();
  }

  public async deleteConversation(userId: string, conversationId: string) {
    await AiConversation.deleteOne({ 
      userId: new mongoose.Types.ObjectId(userId), 
      conversationId 
    });
  }

  public async processMessage(userId: string, conversationId: string | undefined, content: string) {
    let conversation;

    if (conversationId) {
      conversation = await AiConversation.findOne({ 
        userId: new mongoose.Types.ObjectId(userId), 
        conversationId 
      });
    }

    if (!conversation) {
      conversation = new AiConversation({
        conversationId: uuidv4(),
        userId: new mongoose.Types.ObjectId(userId),
        title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
        messages: []
      });
    }

    // 1. Add user message
    conversation.messages.push({
      role: 'user',
      content,
      timestamp: new Date()
    });

    // 2. Retrieve RAG context
    const contextResults = await ragContextService.getRelevantContext(content);
    
    // 3. Construct prompt
    let systemPrompt = `You are a Principal AI Architect and Academic Assistant for CUHP Question Bank. 
You must ground your answers strictly in the provided context. If the context does not contain the answer, say you don't know based on the repository. Do not fabricate information.
Format output in Markdown. Use citations when possible based on the paper Code/Title.

CONTEXT:
${contextResults.map((r: any, idx) => `[Citation ${idx + 1}] Title: ${r.title || r.paperCode}\nContent: ${r.snippet || r.description || ''}`).join('\n\n')}
`;

    // 4. Call AI Gateway
    const messagesForLLM = [
      { role: 'system', content: systemPrompt },
      ...conversation.messages.slice(-5).map((m: any) => ({ role: m.role, content: m.content }))
    ];

    try {
      const response = await aiGateway.chat(messagesForLLM, { modelId: 'gemini-3-pro' });
      const answer = response.choices[0].message.content;

      // 5. Add assistant message
      conversation.messages.push({
        role: 'assistant',
        content: answer,
        timestamp: new Date()
      });

      conversation.lastActiveAt = new Date();
      await conversation.save();

      return {
        conversationId: conversation.conversationId,
        message: answer,
        citations: contextResults
      };
    } catch (error: any) {
      console.error('LLM Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }
}

export const conversationService = new ConversationService();
