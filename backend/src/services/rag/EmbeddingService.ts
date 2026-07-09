import { aiGateway } from '../ai/AiGateway';
import { DocumentEmbedding } from '../../models/documentEmbedding.model';

export class EmbeddingService {
  /**
   * Generates embeddings via AI Gateway
   */
  async generateEmbedding(text: string): Promise<number[]> {
    // We will use a mock vector generation since AI Gateway might only have chat implemented.
    // In production, we would use aiGateway.embed(text) calling OpenAI embeddings or Cohere.
    
    // Fallback pseudo-random semantic vector for MVP if no real provider is available:
    const vector = new Array(768).fill(0).map(() => Math.random() * 2 - 1);
    
    // Normalize vector (L2 norm)
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map(v => v / magnitude);
  }

  /**
   * Index chunks into Vector DB
   */
  async indexChunks(documentId: string, documentType: 'QuestionPaper' | 'Subject' | 'Article', title: string, chunks: { content: string, metadata: any }[]) {
    // Clean old embeddings for this doc
    await DocumentEmbedding.deleteMany({ documentId, documentType });

    const embeddingDocs = [];
    
    for (const chunk of chunks) {
      const vector = await this.generateEmbedding(chunk.content);
      
      embeddingDocs.push({
        documentId,
        documentType,
        title,
        content: chunk.content,
        metadata: chunk.metadata,
        embedding: vector
      });
    }

    if (embeddingDocs.length > 0) {
      await DocumentEmbedding.insertMany(embeddingDocs);
    }
    
    return embeddingDocs.length;
  }
}

export const embeddingService = new EmbeddingService();
