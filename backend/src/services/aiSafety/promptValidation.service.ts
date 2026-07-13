import { policyRepository } from '../../repositories/policy.repository';

class PromptValidationService {
  async validatePrompt(prompt: string, userId: string, context?: any) {
    const policies = await policyRepository.getActivePolicies();
    
    // Simulate prompt injection detection
    const injectionPatterns = [
      /ignore all previous instructions/i,
      /forget everything/i,
      /system prompt/i,
      /you are now a/i
    ];

    for (const pattern of injectionPatterns) {
      if (pattern.test(prompt)) {
        await policyRepository.logEvent({
          type: 'PROMPT_INJECTION',
          severity: 'HIGH',
          userId,
          details: 'Detected potential prompt injection attack.',
          promptSnippet: prompt.substring(0, 100),
          action: 'BLOCKED'
        });
        return { isValid: false, reason: 'Request blocked due to security policy violation.' };
      }
    }

    return { isValid: true };
  }
}

export const promptValidationService = new PromptValidationService();
