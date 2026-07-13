import { promptManagementRepository } from '../../repositories/promptManagement.repository';
import { AppError } from '../../utils/AppError';

class PromptRepositoryService {
  async getAllPrompts() {
    return promptManagementRepository.findAll();
  }

  async getPromptById(id: string) {
    return promptManagementRepository.findById(id);
  }

  async createPrompt(data: any, userId: string) {
    if (!data.name || !data.content) {
      throw new AppError('Prompt name and content are required', 400);
    }
    return promptManagementRepository.create(data, userId);
  }

  async updatePrompt(id: string, data: any, userId: string) {
    return promptManagementRepository.update(id, data, userId);
  }
}

export const promptRepositoryService = new PromptRepositoryService();
