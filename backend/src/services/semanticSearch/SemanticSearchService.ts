import { embeddingService } from './EmbeddingService';
import { vectorRepository } from './VectorRepository';
import { hybridRankingService } from './HybridRankingService';
import { QuestionPaper } from '../../models/paper.model';
import { DocumentEmbedding } from '../../models/documentEmbedding.model';

export class SemanticSearchService {
  async hybridSearch(query: string, filters: any = {}) {
    const startTime = Date.now();
    
    // 1. Keyword Search Pipeline (Text Index)
    // Build query
    const keywordFilter: any = { status: 'PUBLISHED' };
    if (query) {
      keywordFilter.$text = { $search: query };
    }
    
    // Execute keyword search
    const keywordResultsPromise = QuestionPaper.find(keywordFilter)
      .populate('subjectId', 'name code')
      .populate('departmentId', 'name')
      .limit(20)
      .lean();

    // 2. Semantic Search Pipeline
    // Generate embedding for user query
    const queryVectorPromise = embeddingService.generateEmbedding(query);

    // Run concurrently
    const [keywordResults, queryVector] = await Promise.all([
      keywordResultsPromise,
      queryVectorPromise
    ]);

    // Vector search
    const semanticResults = await vectorRepository.vectorSearch(queryVector, 20, { documentType: 'QuestionPaper' });

    // 3. Hybrid Reranking
    const rankedResults = hybridRankingService.rank(keywordResults, semanticResults);

    // Truncate to top 20
    const finalResults = rankedResults.slice(0, 20);

    const latency = Date.now() - startTime;

    return {
      query,
      results: finalResults,
      metadata: {
        totalFound: finalResults.length,
        latencyMs: latency,
        isSemanticActive: semanticResults.length > 0
      }
    };
  }

  async findSimilarPapers(paperId: string) {
    // 1. Fetch paper's embedding from DocumentEmbedding
    const docEmbedding = await DocumentEmbedding.findOne({ documentId: paperId, documentType: 'QuestionPaper' });
    if (!docEmbedding) {
      return [];
    }

    // 2. Perform vector search excluding self
    const similarDocs = await vectorRepository.vectorSearch(docEmbedding.embedding, 6, { 
      documentType: 'QuestionPaper',
      documentId: { $ne: docEmbedding.documentId }
    });

    return similarDocs;
  }
}

export const semanticSearchService = new SemanticSearchService();
