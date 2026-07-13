class HealthMonitoringService {
  async getHealthStatus() {
    return {
      gateway: { status: 'HEALTHY', latency: 45 },
      rag: { status: 'DEGRADED', latency: 850, notes: 'Sync delay' },
      embedding: { status: 'HEALTHY', queueSize: 12 },
      safety: { status: 'HEALTHY', latency: 15 },
      providers: [
        { name: 'OpenAI', status: 'HEALTHY', latency: 450 },
        { name: 'Anthropic', status: 'HEALTHY', latency: 600 }
      ]
    };
  }
}

export const healthMonitoringService = new HealthMonitoringService();
