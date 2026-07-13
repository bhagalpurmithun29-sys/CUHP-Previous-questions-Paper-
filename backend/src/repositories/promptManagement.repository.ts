import { Types } from 'mongoose';
import { AppError } from '../utils/AppError';

// Mocking Prompt model for now as we don't have the schema yet
// In a real implementation this would use a Mongoose model
class PromptManagementRepository {
  private prompts: any[] = []; // In-memory fallback

  async findAll() {
    return this.prompts;
  }

  async findById(id: string) {
    const prompt = this.prompts.find(p => p.id === id);
    if (!prompt) throw new AppError('Prompt not found', 404);
    return prompt;
  }

  async create(data: any, userId: string) {
    const newPrompt = {
      id: new Types.ObjectId().toString(),
      ...data,
      createdBy: userId,
      versions: [
        {
          version: '1.0',
          content: data.content,
          status: 'DRAFT',
          createdAt: new Date(),
          createdBy: userId
        }
      ],
      currentVersion: '1.0',
      status: 'DRAFT',
      metrics: {
        usageCount: 0,
        averageLatency: 0,
        approvalRate: 0
      }
    };
    this.prompts.push(newPrompt);
    return newPrompt;
  }

  async update(id: string, data: any, userId: string) {
    const idx = this.prompts.findIndex(p => p.id === id);
    if (idx === -1) throw new AppError('Prompt not found', 404);
    
    this.prompts[idx] = { ...this.prompts[idx], ...data, updatedAt: new Date() };
    return this.prompts[idx];
  }

  async addVersion(id: string, versionData: any) {
    const idx = this.prompts.findIndex(p => p.id === id);
    if (idx === -1) throw new AppError('Prompt not found', 404);
    
    this.prompts[idx].versions.push(versionData);
    return this.prompts[idx];
  }

  async findTemplates() {
    return this.prompts.filter(p => p.type === 'TEMPLATE');
  }
}

export const promptManagementRepository = new PromptManagementRepository();
