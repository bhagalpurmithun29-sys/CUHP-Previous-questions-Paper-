import { OcrResult } from '../../models/ocrResult.model';
import { aiGateway } from '../ai/AiGateway';
import { chunkingService } from './ChunkingService';
import { embeddingService } from './EmbeddingService';
import { retrieverService } from './RetrieverService';
import { contextBuilder } from './ContextBuilder';
import { AppError } from '../../utils/AppError';

export class KnowledgeService {
  /**
   * Re-indexes a specific paper into the Knowledge Engine
   */
  async reindexPaper(paperId: string) {
    const ocr = await OcrResult.findOne({ paperId });
    if (!ocr || ocr.status !== 'COMPLETED') {
      throw new AppError('OCR data not found or not completed for this paper', 400);
    }

    const chunks = chunkingService.chunkOcrResult(ocr);
    const title = `Question Paper: \${ocr.metadata?.subject || 'Unknown'} - \${ocr.metadata?.academicYear || 'Unknown'}`;
    
    const count = await embeddingService.indexChunks(ocr.paperId.toString(), 'QuestionPaper', title, chunks);
    return { indexedChunks: count };
  }

  /**
   * Executes a RAG query
   */
  async query(question: string, userId: string) {
    // 1. Retrieve
    const contexts = await retrieverService.retrieve(question, 4);
    
    if (contexts.length === 0) {
      return {
        answer: "I cannot answer this question as I couldn't find any relevant information in the repository.",
        citations: []
      };
    }

    // 2. Build Context
    const promptContext = contextBuilder.buildPromptContext(contexts);
    const citations = contextBuilder.formatCitations(contexts);

    // 3. Generate Grounded Response
    const prompt = `
      \${promptContext}
      
      User Question: \${question}
      
      Answer the question strictly using the provided context. 
      If the context does not contain the answer, say "I cannot answer this based on the repository documents."
      Do not hallucinate external information.
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are an Enterprise Knowledge AI strictly grounded in the provided document chunks.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1
    }, userId);

    return {
      answer: response.content,
      citations
    };
  }

  /**
   * Status metrics for admin dashboard
   */
  async getStatus() {
    // Basic metrics aggregation
    const mongoose = require('mongoose');
    const totalEmbeddings = await mongoose.model('DocumentEmbedding').countDocuments();
    
    return {
      totalChunksIndexed: totalEmbeddings,
      embeddingModel: 'Cohere/Gemini Placeholder',
      status: 'HEALTHY'
    };
  }
}

export const knowledgeService = new KnowledgeService();
