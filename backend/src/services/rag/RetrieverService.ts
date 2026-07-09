import { DocumentEmbedding } from '../../models/documentEmbedding.model';
import { embeddingService } from './EmbeddingService';

export interface RetrievedContext {
  content: string;
  metadata: any;
  similarity: number;
}

export class RetrieverService {
  /**
   * Hybrid retrieval (Mocking vector search using cosine similarity for MVP)
   */
  async retrieve(query: string, topK: number = 5, filterMetadata?: any): Promise<RetrievedContext[]> {
    const queryVector = await embeddingService.generateEmbedding(query);
    
    // In MongoDB Atlas Vector Search, we would use an aggregation pipeline with $vectorSearch.
    // For local environments without Atlas, we pull candidate documents and score in memory.
    
    const queryFilter = filterMetadata ? { ...filterMetadata } : {};
    
    // Limit to recent or relevant bounds if we had thousands of docs
    const candidates = await DocumentEmbedding.find(queryFilter).lean();
    
    const scoredCandidates = candidates.map(doc => {
      const similarity = this.cosineSimilarity(queryVector, doc.embedding);
      return {
        content: doc.content,
        metadata: doc.metadata,
        similarity
      };
    });

    // Sort by descending similarity and take top K
    scoredCandidates.sort((a, b) => b.similarity - a.similarity);
    
    return scoredCandidates.slice(0, topK);
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}

export const retrieverService = new RetrieverService();
