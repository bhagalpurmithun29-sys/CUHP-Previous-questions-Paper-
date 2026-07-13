class QualityScoringService {
  async getQualityMetrics() {
    // Mock aggregated metrics across all evaluations
    return {
      overallScore: 8.5,
      metrics: {
        groundedness: 9.2,
        citationQuality: 8.8,
        completeness: 8.4,
        relevance: 9.0,
        clarity: 8.1,
        helpfulness: 8.6,
        consistency: 8.2
      },
      trend: [
        { month: 'Jan', score: 7.8 },
        { month: 'Feb', score: 8.1 },
        { month: 'Mar', score: 8.5 }
      ]
    };
  }
}

export const qualityScoringService = new QualityScoringService();
