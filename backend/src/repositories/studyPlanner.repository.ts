import { Types } from 'mongoose';
import { StudyPlan, IStudyPlan } from '../models/studyPlan.model';

class StudyPlannerRepository {
  async getActivePlan(userId: string): Promise<IStudyPlan | null> {
    return StudyPlan.findOne({ userId: new Types.ObjectId(userId), isActive: true }).lean();
  }

  async createPlan(planData: Partial<IStudyPlan>): Promise<IStudyPlan> {
    return StudyPlan.create(planData);
  }

  async inactivateUserPlans(userId: string): Promise<void> {
    await StudyPlan.updateMany({ userId: new Types.ObjectId(userId) }, { isActive: false });
  }

  async updateTaskStatus(userId: string, planId: string, taskId: string, status: string): Promise<IStudyPlan | null> {
    const plan = await StudyPlan.findOne({ _id: planId, userId: new Types.ObjectId(userId) });
    if (!plan) return null;

    const task = plan.tasks.find((t: any) => t._id.toString() === taskId);
    if (task) {
      task.status = status as any;
      plan.progress.lastActiveDate = new Date();
      if (status === 'COMPLETED') plan.progress.streak += 1;
      await plan.save();
    }
    return plan;
  }

  async updateGoal(userId: string, planId: string, goalData: any): Promise<IStudyPlan | null> {
    return StudyPlan.findOneAndUpdate(
      { _id: planId, userId: new Types.ObjectId(userId) },
      { $set: { goal: goalData } },
      { new: true }
    );
  }

  async deletePlan(userId: string, planId: string): Promise<void> {
    await StudyPlan.findOneAndDelete({ _id: planId, userId: new Types.ObjectId(userId) });
  }

  async getPlansByUserId(userId: string): Promise<IStudyPlan[]> {
    return StudyPlan.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).lean();
  }
}

export const studyPlannerRepository = new StudyPlannerRepository();
