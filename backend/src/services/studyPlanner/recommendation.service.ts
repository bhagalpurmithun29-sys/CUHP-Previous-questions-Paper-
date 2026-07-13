import { QuestionPaper } from '../../models/paper.model';
import { studyPlannerRepository } from '../../repositories/studyPlanner.repository';

class RecommendationService {
  async getRecommendations(userId: string) {
    const plan = await studyPlannerRepository.getActivePlan(userId);
    if (!plan || !plan.goal.subjectId) return [];

    const papers = await QuestionPaper.find({
      subjectId: plan.goal.subjectId,
      isDeleted: false
    }).sort({ examYear: -1 }).limit(5).lean();

    return {
      recommendedPapers: papers,
      suggestedTopics: ['Topic 1', 'Topic 2'], // Mock derived topics
      relatedResources: []
    };
  }
}

export const recommendationService = new RecommendationService();
