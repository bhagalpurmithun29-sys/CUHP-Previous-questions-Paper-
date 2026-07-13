import { studyPlannerRepository } from '../../repositories/studyPlanner.repository';

class RevisionService {
  async getRevisionPlan(userId: string) {
    const plan = await studyPlannerRepository.getActivePlan(userId);
    if (!plan) return null;

    // Filter tasks marked for revision and completed reading tasks
    const revisionTasks = plan.tasks.filter(t => t.type === 'REVISION' || t.status === 'COMPLETED');
    
    return {
      suggestedTopics: revisionTasks.map(t => t.topic),
      bookmarkedRevision: [], // Mocking integration with bookmarks
      continueReading: plan.tasks.filter(t => t.status === 'IN_PROGRESS').map(t => t.topic)
    };
  }
}

export const revisionService = new RevisionService();
