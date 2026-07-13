import { Response } from 'express';
import { paperQARepository } from '../../repositories/paperQA.repository';
import { v4 as uuidv4 } from 'uuid';

class PaperRetrievalService {
  async processAndStreamMessage(res: Response, userId: string, paperId: string, message: string, context?: any, conversationId?: string) {
    const isNew = !conversationId;
    const activeConversationId = conversationId || uuidv4();
    
    // Save user message
    await paperQARepository.saveMessage(
      activeConversationId,
      userId,
      paperId,
      { role: 'user', content: message, timestamp: new Date() },
      isNew
    );

    // Context retrieval logic restricted to the current paper
    // (In production, this would hit the RAG vector store filtered by paperId)
    const retrievedContext = `Mock retrieved context for paper ${paperId}`;

    // Streaming the mock response
    res.write(`data: ${JSON.stringify({ event: 'start', conversationId: activeConversationId })}\n\n`);
    
    const mockResponse = `Based on the paper context, here is the answer: The requested information is derived strictly from the active document.`;
    
    for (const char of mockResponse) {
      res.write(`data: ${JSON.stringify({ event: 'token', text: char })}\n\n`);
      await new Promise(r => setTimeout(r, 20));
    }

    // Save assistant message
    const assistantMessage = { role: 'assistant', content: mockResponse, timestamp: new Date() };
    await paperQARepository.saveMessage(
      activeConversationId,
      userId,
      paperId,
      assistantMessage
    );
    
    // Mock citation recording
    await paperQARepository.recordCitation(activeConversationId, uuidv4(), {
      paperId,
      pageNumber: 1,
      textReference: 'Sample cited text from paper',
      confidence: 0.95
    });

    res.write(`data: ${JSON.stringify({ event: 'end' })}\n\n`);
    res.end();
  }

  async getPaperConversationHistory(userId: string, paperId: string) {
    return paperQARepository.findConversationsByPaper(userId, paperId);
  }
}

export const paperRetrievalService = new PaperRetrievalService();
