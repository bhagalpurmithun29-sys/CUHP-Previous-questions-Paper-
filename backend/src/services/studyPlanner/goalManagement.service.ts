import { studyPlannerRepository } from '../../repositories/studyPlanner.repository';
import { Types } from 'mongoose';

class GoalManagementService {
  async createGoal(userId: string, goalData: any) {
    // Generate AI tasks based on the goal (Mocking logic previously in studyPlanner.service)
    await studyPlannerRepository.inactivateUserPlans(userId);

    const newPlan = {
      userId: new Types.ObjectId(userId),
      goal: goalData,
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + (goalData.durationDays || 30))),
      dailyCommitmentMinutes: goalData.dailyMinutes || 60,
      tasks: [],
      generatedByAI: true,
      isActive: true
    };

    return studyPlannerRepository.createPlan(newPlan);
  }

  async updateGoal(userId: string, goalId: string, goalData: any) {
    return studyPlannerRepository.updateGoal(userId, goalId, goalData);
  }

  async deleteGoal(userId: string, goalId: string) {
    return studyPlannerRepository.deletePlan(userId, goalId);
  }
}

export const goalManagementService = new GoalManagementService();
