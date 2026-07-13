import { promptValidationService } from './promptValidation.service';
import { outputValidationService } from './outputValidation.service';
import { permissionEnforcementService } from './permissionEnforcement.service';

class GuardrailEngine {
  async evaluateRequest(prompt: string, userId: string, requestedDocumentIds: string[]) {
    // 1. Enforce Permissions
    const authResult = await permissionEnforcementService.validateContextAccess(userId, requestedDocumentIds);
    if (!authResult.isAuthorized) {
      return { allowed: false, error: authResult.reason };
    }

    // 2. Validate Prompt
    const promptResult = await promptValidationService.validatePrompt(prompt, userId);
    if (!promptResult.isValid) {
      return { allowed: false, error: promptResult.reason };
    }

    return { allowed: true };
  }

  async evaluateResponse(response: string, context: any, userId: string) {
    const outputResult = await outputValidationService.validateResponse(response, context, userId);
    
    if (!outputResult.isValid) {
      return { 
        allowed: false, 
        error: outputResult.reason, 
        requiresModeration: outputResult.requiresModeration 
      };
    }

    return { allowed: true };
  }
}

export const guardrailEngine = new GuardrailEngine();
