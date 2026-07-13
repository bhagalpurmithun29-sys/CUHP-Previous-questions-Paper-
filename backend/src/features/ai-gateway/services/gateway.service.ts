import { ProviderRegistry } from './provider.registry';
import { ModelRouter } from './model.router';
import { AuditLogService } from '../../audit/services/audit.service';
import { LLMRequest } from '../adapters/provider.interface';

export class GatewayService {
  private registry = new ProviderRegistry();
  private router = new ModelRouter(this.registry);
  private auditService = new AuditLogService();

  async chat(request: LLMRequest, taskType: string, userId: string) {
    const adapter = request.model ? 
        Array.from(this.registry.getAllProviders()).find(p => p.models.includes(request.model)) 
          ? this.registry.getAdapter(Array.from(this.registry.getAllProviders()).find(p => p.models.includes(request.model!))!.name)
          : this.router.route(taskType)
        : this.router.route(taskType);

    await this.auditService.log({
      userId,
      action: 'AI_REQUEST_STARTED',
      resourceType: 'AI_GATEWAY',
      details: { provider: adapter.name, model: request.model }
    });

    try {
      // Basic retry logic placeholder
      const response = await adapter.generate(request);

      await this.auditService.log({
        userId,
        action: 'AI_REQUEST_COMPLETED',
        resourceType: 'AI_GATEWAY',
        details: { provider: adapter.name, model: request.model, status: 'SUCCESS' }
      });

      return response;
    } catch (error) {
      await this.auditService.log({
        userId,
        action: 'AI_REQUEST_FAILED',
        resourceType: 'AI_GATEWAY',
        details: { provider: adapter.name, model: request.model, error: String(error) }
      });
      throw error;
    }
  }

  async streamChat(request: LLMRequest, taskType: string, userId: string, onChunk: (chunk: string) => void) {
    const adapter = request.model ? 
        Array.from(this.registry.getAllProviders()).find(p => p.models.includes(request.model!)) 
          ? this.registry.getAdapter(Array.from(this.registry.getAllProviders()).find(p => p.models.includes(request.model!))!.name)
          : this.router.route(taskType)
        : this.router.route(taskType);

    if (adapter.stream) {
      await adapter.stream(request, onChunk);
    } else {
      const response = await adapter.generate(request);
      onChunk(response.text);
    }
  }

  getProviders() {
    return this.registry.getAllProviders();
  }
}
export const aiGateway = new GatewayService();
