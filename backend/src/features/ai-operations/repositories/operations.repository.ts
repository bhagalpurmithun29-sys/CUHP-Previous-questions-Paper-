export class OperationsRepository {
  async getOverview() {
    return {
      papersProcessed: 1250,
      queueSize: 45,
      successRate: 94.5,
      failureRate: 5.5,
      avgProcessingTime: 12.4
    };
  }

  async getPipelineHealth() {
    return {
      status: 'HEALTHY',
      activeWorkers: 8,
      totalCapacity: 10,
      currentThroughput: 45,
      queueDelay: 2.1
    };
  }

  async getModelMetrics() {
    return {
      versions: [
        { model: 'GPT-4o', usage: 75, avgConfidence: 92 },
        { model: 'Gemini-1.5-Pro', usage: 25, avgConfidence: 88 }
      ],
      overallAcceptanceRate: 91,
      overallOverrideRate: 9
    };
  }

  async getQualityMetrics() {
    return {
      validationPassRate: 85,
      reviewQueueSize: 24,
      reviewCompletionRate: 95,
      qualityScore: 9.2
    };
  }

  async getErrorAnalytics() {
    return [
      { category: 'EXTRACTION_TIMEOUT', count: 145 },
      { category: 'FORMAT_MISMATCH', count: 82 },
      { category: 'LOW_CONFIDENCE_BLOOM', count: 54 }
    ];
  }
}
