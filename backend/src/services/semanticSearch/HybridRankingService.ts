export class HybridRankingService {
  /**
   * Combines and reranks keyword search results and semantic search results using Reciprocal Rank Fusion (RRF).
   */
  rank(keywordResults: any[], semanticResults: any[], k = 60) {
    const rrfScores = new Map<string, { item: any; score: number }>();

    // Process Keyword Results
    keywordResults.forEach((item, index) => {
      const id = item._id.toString();
      const score = 1 / (k + index + 1); // RRF formula
      rrfScores.set(id, { item, score });
    });

    // Process Semantic Results
    semanticResults.forEach((item, index) => {
      const id = item.documentId.toString();
      const existing = rrfScores.get(id);
      const score = 1 / (k + index + 1);
      
      if (existing) {
        // Boost existing score if found in both
        existing.score += score;
        
        // Add semantic context to the item metadata
        existing.item.semanticContext = item.content;
        existing.item.similarityScore = item.score;
      } else {
        // Format semantic-only result to match expected Paper DTO
        rrfScores.set(id, { 
          item: {
            _id: item.documentId,
            title: item.title,
            ...item.metadata,
            semanticContext: item.content,
            similarityScore: item.score,
            isSemanticOnly: true
          }, 
          score 
        });
      }
    });

    // Convert map back to array and sort by RRF score
    const rankedResults = Array.from(rrfScores.values());
    rankedResults.sort((a, b) => b.score - a.score);

    // Apply metadata boosters (e.g. popularity, recency)
    const finalResults = rankedResults.map(ranked => {
      let finalScore = ranked.score;
      
      // Popularity boost
      if (ranked.item.views) {
        finalScore += Math.log10(ranked.item.views + 1) * 0.01;
      }
      
      return {
        ...ranked.item,
        hybridScore: finalScore
      };
    });

    // Sort by final boosted score
    finalResults.sort((a, b) => b.hybridScore - a.hybridScore);

    return finalResults;
  }
}

export const hybridRankingService = new HybridRankingService();
