import { ProviderRegistry } from './provider.registry';

export class ModelRouter {
  constructor(private registry: ProviderRegistry) {}

  route(taskType?: string) {
    // Default task-based routing placeholder
    if (taskType === 'EXTRACTION') {
      return this.registry.getAdapter('gemini');
    }
    if (taskType === 'CLASSIFICATION') {
      return this.registry.getAdapter('openai');
    }
    return this.registry.getAdapter('openai');
  }
}
