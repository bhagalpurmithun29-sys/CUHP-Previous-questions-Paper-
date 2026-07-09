export interface DocumentChunk {
  content: string;
  metadata: Record<string, any>;
}

export class ChunkingService {
  /**
   * Adaptive chunking for OCR Extracted JSON
   */
  chunkOcrResult(ocrResult: any): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    const baseMetadata = {
      paperId: ocrResult.paperId.toString(),
      subject: ocrResult.metadata?.subject,
      course: ocrResult.metadata?.course,
      semester: ocrResult.metadata?.semester,
      academicYear: ocrResult.metadata?.academicYear,
    };

    // 1. Chunk at the Section level for high-level context
    ocrResult.sections?.forEach((section: any) => {
      let sectionText = `Section: \${section.sectionName}\n`;
      if (section.instructions) sectionText += `Instructions: \${section.instructions}\n`;
      
      // 2. Chunk at the Question level for granular retrieval
      section.questions?.forEach((q: any) => {
        const questionText = `Question \${q.questionNumber}: \${q.text} (\${q.marks || 0} marks)`;
        
        chunks.push({
          content: `\${sectionText}\n\${questionText}`,
          metadata: {
            ...baseMetadata,
            chunkType: 'QUESTION',
            sectionName: section.sectionName,
            questionNumber: q.questionNumber,
          }
        });
      });
    });

    // 3. Fallback to raw text sliding window if sections failed
    if (chunks.length === 0 && ocrResult.cleanedText) {
      return this.slidingWindowChunk(ocrResult.cleanedText, baseMetadata);
    }

    return chunks;
  }

  private slidingWindowChunk(text: string, metadata: any, chunkSize = 1000, overlap = 200): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    let start = 0;
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      const chunk = text.slice(start, end);
      chunks.push({
        content: chunk,
        metadata: { ...metadata, chunkType: 'RAW_WINDOW' }
      });
      start += chunkSize - overlap;
    }
    return chunks;
  }
}

export const chunkingService = new ChunkingService();
