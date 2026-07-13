import { Types } from 'mongoose';

class AdminRepository {
  private config = {
    providers: {
      openai: { enabled: true },
      anthropic: { enabled: true },
      gemini: { enabled: false }
    },
    routing: {
      fallbackEnabled: true,
      costOptimization: true
    },
    safety: {
      strictMode: true
    }
  };

  private alerts = [
    {
      id: '1',
      severity: 'HIGH',
      type: 'PROVIDER_LATENCY',
      message: 'Anthropic Claude 3 Opus is experiencing high latency (>5s).',
      timestamp: new Date().toISOString(),
      acknowledged: false
    },
    {
      id: '2',
      severity: 'MEDIUM',
      type: 'RAG_SYNC',
      message: 'Vector index sync delayed by 15 minutes for Physics department.',
      timestamp: new Date().toISOString(),
      acknowledged: false
    }
  ];

  async getConfiguration() {
    return this.config;
  }

  async updateConfiguration(updates: any) {
    this.config = { ...this.config, ...updates };
    return this.config;
  }

  async getAlerts() {
    return this.alerts.filter(a => !a.acknowledged);
  }

  async acknowledgeAlert(id: string) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.acknowledged = true;
    }
    return alert;
  }
}

export const adminRepository = new AdminRepository();
