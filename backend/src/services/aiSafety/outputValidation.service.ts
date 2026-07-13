import { policyRepository } from '../../repositories/policy.repository';

class OutputValidationService {
  async validateResponse(response: string, context: any, userId: string) {
    // Simulate output validation (e.g. checking for citations, hallucination checks)
    const hasCitations = /\[\d+\]/.test(response);
    
    if (context?.requiresCitations && !hasCitations) {
       await policyRepository.logEvent({
          type: 'MISSING_CITATION',
          severity: 'MEDIUM',
          userId,
          details: 'Response generated without supporting repository evidence.',
          action: 'FLAGGED'
       });
       return { 
         isValid: false, 
         reason: 'Response lacks required repository citations.',
         requiresModeration: true 
       };
    }

    return { isValid: true };
  }
}

export const outputValidationService = new OutputValidationService();
