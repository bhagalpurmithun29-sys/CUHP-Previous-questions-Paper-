import { Types } from 'mongoose';
import { AppError } from '../utils/AppError';

// Mocking Policy model
class PolicyRepository {
  private policies: any[] = [
    {
      id: '1',
      name: 'Anti-Injection Guard',
      description: 'Detects and blocks prompt injection attempts.',
      priority: 1,
      enabled: true,
      rules: [
        { type: 'REGEX', pattern: 'ignore previous instructions', action: 'BLOCK' }
      ]
    },
    {
      id: '2',
      name: 'Repository Content Enforcement',
      description: 'Ensures responses are strictly based on provided repository context.',
      priority: 2,
      enabled: true,
      rules: [
        { type: 'COMPLIANCE', check: 'CITATION_REQUIRED', action: 'FLAG' }
      ]
    }
  ];

  async findAll() {
    return this.policies;
  }

  async getActivePolicies() {
    return this.policies.filter(p => p.enabled).sort((a, b) => a.priority - b.priority);
  }

  // Mocking Events collection
  private events: any[] = [];

  async logEvent(event: any) {
    const newEvent = { ...event, id: new Types.ObjectId().toString(), timestamp: new Date() };
    this.events.unshift(newEvent);
    return newEvent;
  }

  async getEvents() {
    return this.events;
  }
}

export const policyRepository = new PolicyRepository();
