import { embeddingService } from './EmbeddingService';
import { vectorRepository } from './VectorRepository';
import { hybridRankingService } from './HybridRankingService';
import { QuestionPaper } from '../../models/paper.model';
import { DocumentEmbedding } from '../../models/documentEmbedding.model';

export class SemanticSearchService {
  async hybridSearch(query: string, filters: any = {}) {
    const startTime = Date.now();
    const mode = filters.mode || 'hybrid';
    
    // 1. Keyword Search Pipeline (Text Index)
    // Build query
    const keywordFilter: any = { status: 'APPROVED' }; // Only approved content
    
    // Apply filters
    if (filters.school) keywordFilter.schoolId = filters.school;
    if (filters.department) keywordFilter.departmentId = filters.department;
    if (filters.course) keywordFilter.courseId = filters.course;
    if (filters.academicYear) keywordFilter.academicYear = filters.academicYear;
    if (filters.examType) keywordFilter.examType = filters.examType;
    
    if (query) {
      keywordFilter.$text = { $search: query };
    }
    
    // Execute keyword search
    let keywordResults: any[] = [];
    if (mode === 'hybrid' || mode === 'keyword') {
      keywordResults = await QuestionPaper.find(keywordFilter)
        .populate('subjectId', 'name code')
        .populate('departmentId', 'name')
        .limit(20)
        .lean();
    }

    // 2. Semantic Search Pipeline
    let semanticResults: any[] = [];
    if (mode === 'hybrid' || mode === 'semantic') {
      const queryVector = await embeddingService.generateEmbedding(query || 'academic');
      // pass metadata filters to vector db if supported
      const vectorFilters: any = { documentType: 'QuestionPaper' };
      if (filters.academicYear) vectorFilters.academicYear = filters.academicYear;
      
      semanticResults = await vectorRepository.vectorSearch(queryVector, 20, vectorFilters);
    }

    // 3. Hybrid Reranking
    let rankedResults: any[] = [];
    if (mode === 'hybrid') {
      rankedResults = hybridRankingService.rank(keywordResults, semanticResults);
    } else if (mode === 'keyword') {
      rankedResults = keywordResults.map(res => ({ ...res, score: 1.0, entityType: 'paper', title: res.title || res.paperCode }));
    } else if (mode === 'semantic') {
      rankedResults = semanticResults;
    }

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
