import { AiGateway } from '../ai/AiGateway';
import { providerFactory } from '../ai/providers/ProviderFactory';
import { AppError } from '../../utils/AppError';

export class EmbeddingService {
  /**
   * Generates embeddings for a given text using the configured AI provider.
   * Note: This assumes the AI Provider Interface has been updated with `generateEmbeddings`.
   */
  async generateEmbedding(text: string, providerName = 'openai'): Promise<number[]> {
    const provider = providerFactory.getProvider(providerName);
    
    if (provider.generateEmbeddings) {
      const embeddings = await provider.generateEmbeddings([text]);
      return embeddings[0];
    }

    // Placeholder if real embedding is not available
    // In production, we'd call OpenAI's text-embedding-3-small or Gemini's text-embedding-004
    console.warn(`Provider ${providerName} doesn't support embeddings. Returning random vector placeholder.`);
    return Array.from({ length: 1536 }, () => Math.random() - 0.5);
  }
}

export const embeddingService = new EmbeddingService();
