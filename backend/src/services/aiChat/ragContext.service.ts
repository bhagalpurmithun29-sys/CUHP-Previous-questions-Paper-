import { semanticSearchService } from '../semanticSearch/SemanticSearchService';
import { AiConversation } from '../../models/aiConversation.model';

export class RagContextService {
  public async getRelevantContext(query: string, mode: 'semantic' | 'hybrid' | 'keyword' = 'hybrid'): Promise<any[]> {
    // Rely on the existing semantic search service for retrieval
    const filters = { mode };
    const searchResults = await semanticSearchService.hybridSearch(query, filters);
    return searchResults.results || [];
  }
}

export const ragContextService = new RagContextService();
