import { Response } from 'express';
import { AiConversation } from '../../models/aiConversation.model';
import { ragContextService } from './ragContext.service';
import { v4 as uuidv4 } from 'uuid';
import { aiGateway } from '../../features/ai-gateway/services/gateway.service';
import mongoose from 'mongoose';

export class StreamingService {
  public async streamResponse(res: Response, userId: string, conversationId: string | undefined, content: string) {
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

    conversation.messages.push({
      role: 'user',
      content,
      timestamp: new Date()
    });

    // Send conversation info back first if new
    res.write(`event: init\ndata: ${JSON.stringify({ conversationId: conversation.conversationId })}\n\n`);

    // Retrieve RAG context
    res.write(`event: status\ndata: Retrieving context from repository...\n\n`);
    const contextResults = await ragContextService.getRelevantContext(content);
    
    res.write(`event: citations\ndata: ${JSON.stringify(contextResults)}\n\n`);

    let systemPrompt = `You are a Principal AI Architect and Academic Assistant for CUHP Question Bank. 
You must ground your answers strictly in the provided context. If the context does not contain the answer, say you don't know based on the repository. Do not fabricate information.
Format output in Markdown. Use citations when possible based on the paper Code/Title.

CONTEXT:
${contextResults.map((r: any, idx) => `[Citation ${idx + 1}] Title: ${r.title || r.paperCode}\nContent: ${r.snippet || r.description || ''}`).join('\n\n')}
`;

    const messagesForLLM = [
      { role: 'system', content: systemPrompt },
      ...conversation.messages.slice(-5).map((m: any) => ({ role: m.role, content: m.content }))
    ];

    try {
      res.write(`event: status\ndata: Generating response...\n\n`);
      
      let fullAnswer = '';
      
      await aiGateway.streamChat(
        { prompt: JSON.stringify(messagesForLLM), model: 'gemini-3-pro' },
        'GENERAL_CHAT',
        userId,
        (text: string) => {
          if (text) {
            fullAnswer += text;
            res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
          }
        }
      );

      conversation.messages.push({
        role: 'assistant',
        content: fullAnswer,
        timestamp: new Date()
      });

      conversation.lastActiveAt = new Date();
      await conversation.save();

      res.write(`event: done\ndata: {}\n\n`);
    } catch (error: any) {
      console.error('Streaming Error:', error);
      res.write(`event: error\ndata: ${JSON.stringify({ error: 'Failed to generate AI response' })}\n\n`);
    } finally {
      res.end();
    }
  }
}

export const streamingService = new StreamingService();
