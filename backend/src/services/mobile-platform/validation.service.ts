import { mobilePlatformRepository } from '../../repositories/mobilePlatform.repository';

class ValidationService {
  async validateWorkflow(workflowId: string, payload: any) {
    // Stub simulating testing a mobile workflow
    return mobilePlatformRepository.setValidationStatus(payload);
  }
}

export const validationService = new ValidationService();
