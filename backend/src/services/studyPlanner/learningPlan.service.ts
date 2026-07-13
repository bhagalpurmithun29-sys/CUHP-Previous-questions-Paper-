import { studyPlannerRepository } from '../../repositories/studyPlanner.repository';
import { Types } from 'mongoose';
import { aiGateway } from '../ai/AiGateway';

class LearningPlanService {
  async getDashboardData(userId: string) {
    const plan = await studyPlannerRepository.getActivePlan(userId);
    if (!plan) return null;

    // Separate tasks by timeline (weekly, monthly based on dates)
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    
    const weeklyTasks = plan.tasks.filter(t => new Date(t.date) >= startOfWeek && new Date(t.date) <= endOfWeek);
    const monthlyTasks = plan.tasks.filter(t => new Date(t.date).getMonth() === now.getMonth());

    return {
      plan,
      weeklyProgress: {
        total: weeklyTasks.length,
        completed: weeklyTasks.filter(t => t.status === 'COMPLETED').length
      },
      monthlyProgress: {
        total: monthlyTasks.length,
        completed: monthlyTasks.filter(t => t.status === 'COMPLETED').length
      }
    };
  }

  async getWeeklyPlan(userId: string) {
    const plan = await studyPlannerRepository.getActivePlan(userId);
    if (!plan) return [];
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return plan.tasks.filter(t => new Date(t.date) >= startOfWeek && new Date(t.date) <= endOfWeek);
  }

  async getMonthlyPlan(userId: string) {
    const plan = await studyPlannerRepository.getActivePlan(userId);
    if (!plan) return [];
    const now = new Date();
    return plan.tasks.filter(t => new Date(t.date).getMonth() === now.getMonth());
  }
}

export const learningPlanService = new LearningPlanService();
