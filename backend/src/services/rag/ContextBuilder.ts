import { RetrievedContext } from './RetrieverService';

export class ContextBuilder {
  buildPromptContext(retrievedContexts: RetrievedContext[]): string {
    if (!retrievedContexts || retrievedContexts.length === 0) {
      return "No repository documents matched the query.";
    }

    let contextString = "### REPOSITORY CONTEXT ###\n";
    contextString += "You must base your answer strictly on the following retrieved chunks.\n\n";

    retrievedContexts.forEach((ctx, index) => {
      contextString += `[Source \${index + 1}: \${ctx.metadata.subject || 'Unknown Subject'} - \${ctx.metadata.academicYear || 'Unknown Year'}]\n`;
      contextString += `\${ctx.content}\n\n`;
    });

    return contextString;
  }

  formatCitations(retrievedContexts: RetrievedContext[]) {
    return retrievedContexts.map((ctx, idx) => ({
      citationId: idx + 1,
      paperId: ctx.metadata.paperId,
      subject: ctx.metadata.subject,
      academicYear: ctx.metadata.academicYear,
      chunkType: ctx.metadata.chunkType,
      confidenceScore: Math.round(ctx.similarity * 100),
      snippet: ctx.content.substring(0, 150) + '...'
    }));
  }
}

export const contextBuilder = new ContextBuilder();
