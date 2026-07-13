class HealthCheckService {
  async getSystemHealth() {
    // In production this pings the underlying microservices or MongoDB collections
    return {
      overallStatus: 'HEALTHY',
      components: {
        gateway: { status: 'OK', latency: 45 },
        rag: { status: 'OK', latency: 120 },
        embeddings: { status: 'OK', latency: 350 },
        promptRepo: { status: 'OK', latency: 12 },
        safety: { status: 'OK', latency: 15 },
        analytics: { status: 'OK', latency: 8 },
        routing: { status: 'OK', latency: 5 }
      },
      lastChecked: new Date()
    };
  }
}

export const healthCheckService = new HealthCheckService();
