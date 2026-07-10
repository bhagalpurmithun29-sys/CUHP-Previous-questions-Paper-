import { QuestionPaper } from '../../models/paper.model';
import { DocumentEmbedding } from '../../models/documentEmbedding.model';
import { embeddingService } from './EmbeddingService';

export class IndexingService {
  /**
   * Reindexes all question papers that haven't been embedded yet or forces a full reindex.
   */
  async reindexAll(force = false) {
    let query: any = { status: 'PUBLISHED' };
    
    if (!force) {
      // Find papers that already have embeddings
      const embeddedDocs = await DocumentEmbedding.find({ documentType: 'QuestionPaper' }).select('documentId');
      const embeddedIds = embeddedDocs.map(d => d.documentId);
      
      query._id = { $nin: embeddedIds };
    } else {
      // Clear existing index if forcing full reindex
      await DocumentEmbedding.deleteMany({ documentType: 'QuestionPaper' });
    }

    // Process in batches
    const batchSize = 10;
    const cursor = QuestionPaper.find(query)
      .populate('subjectId', 'name code')
      .populate('departmentId', 'name')
      .cursor({ batchSize });

    let indexedCount = 0;
    let failedCount = 0;

    for await (const paper of cursor) {
      try {
        // Construct rich text for embedding
        const contentStr = `
          Title: ${paper.title}
          Subject: ${(paper.subjectId as any)?.name} ${(paper.subjectId as any)?.code ? `(${(paper.subjectId as any).code})` : ''}
          Department: ${(paper.departmentId as any)?.name}
          Year: ${paper.academicYear}
          Exam Type: ${paper.examType}
          Tags: ${paper.tags.join(', ')}
        `.trim();

        // Generate embedding
        const vector = await embeddingService.generateEmbedding(contentStr);

        // Store
        await DocumentEmbedding.create({
          documentId: paper._id,
          documentType: 'QuestionPaper',
          title: paper.title,
          content: contentStr,
          metadata: {
            year: paper.academicYear,
            examType: paper.examType,
            views: 0
          },
          embedding: vector
        });

        indexedCount++;
      } catch (err) {
        console.error(`Failed to index paper ${paper._id}:`, err);
        failedCount++;
      }
    }

    return { indexedCount, failedCount };
  }

  async getIndexStatus() {
    const totalPapers = await QuestionPaper.countDocuments({ status: 'PUBLISHED' });
    const indexedPapers = await DocumentEmbedding.countDocuments({ documentType: 'QuestionPaper' });
    
    return {
      totalDocuments: totalPapers,
      indexedDocuments: indexedPapers,
      pendingDocuments: Math.max(0, totalPapers - indexedPapers),
      coveragePercentage: totalPapers > 0 ? (indexedPapers / totalPapers) * 100 : 0
    };
  }
}

export const indexingService = new IndexingService();
