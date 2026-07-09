import { DocumentEmbedding, IDocumentEmbedding } from '../../models/documentEmbedding.model';

export class VectorRepository {
  /**
   * Performs a vector similarity search.
   * If using MongoDB Atlas, this would use the $vectorSearch aggregation pipeline.
   * Here we implement a brute force cosine similarity for standard MongoDB compatibility.
   */
  async vectorSearch(queryVector: number[], limit = 10, filter?: any): Promise<(IDocumentEmbedding & { score: number })[]> {
    // 1. Fetch filtered docs (in production, use true ANN index)
    const docs = await DocumentEmbedding.find(filter || {}).lean();
    
    // 2. Compute cosine similarity
    const scoredDocs = docs.map(doc => {
      const score = this.cosineSimilarity(queryVector, doc.embedding);
      return { ...doc, score };
    });

    // 3. Sort by score descending and return top K
    scoredDocs.sort((a, b) => b.score - a.score);
    return scoredDocs.slice(0, limit) as any;
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
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

export const vectorRepository = new VectorRepository();
