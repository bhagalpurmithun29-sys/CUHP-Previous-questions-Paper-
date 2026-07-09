import { StudyPlan, IStudyPlan, IStudyTask } from '../models/studyPlan.model';
import { PaperAnalysis } from '../models/paperAnalysis.model';
import { QuestionPaper } from '../models/paper.model';
import { aiGateway } from './ai/AiGateway';
import { AppError } from '../utils/AppError';
import { Types } from 'mongoose';

export class StudyPlannerService {
  /**
   * AI-based Study Plan Generation
   */
  async generatePlan(userId: string, goalData: any): Promise<IStudyPlan> {
    // 1. Gather context for AI
    let academicContext = '';
    
    if (goalData.subjectId) {
      // Get AI insights from previous papers
      const analyses = await PaperAnalysis.find({ 
        subjectId: new Types.ObjectId(goalData.subjectId),
        status: 'COMPLETED'
      }).limit(5);

      if (analyses.length > 0) {
        const topTopics = analyses.flatMap(a => a.repeatedTopics.map(r => r.topic));
        academicContext = `Important topics based on past exams: \${[...new Set(topTopics)].join(', ')}. `;
      }
    }

    const prompt = `Create a highly structured study plan.
Goal: \${goalData.description}
Type: \${goalData.type}
Days: \${goalData.durationDays}
Daily Commitment: \${goalData.dailyMinutes} minutes
Context: \${academicContext}

Return ONLY a JSON array of tasks matching this schema:
[{
  "title": "String",
  "description": "String",
  "topic": "String",
  "dayOffset": Number (0 to \${goalData.durationDays - 1}),
  "durationMinutes": Number,
  "type": "READING" | "PRACTICE" | "REVISION" | "MOCK_TEST"
}]
Ensure the total duration per day roughly matches \${goalData.dailyMinutes} minutes. Do not wrap in markdown blocks.`;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are an expert AI Study Planner. You generate personalized, realistic daily study tasks for university students.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    }, userId);

    let content = response.content.trim();
    if (content.startsWith('\`\`\`json')) content = content.replace(/\`\`\`json/g, '');
    if (content.startsWith('\`\`\`')) content = content.replace(/\`\`\`/g, '');
    content = content.trim();

    let rawTasks;
    try {
      rawTasks = JSON.parse(content);
    } catch (e) {
      throw new AppError('AI failed to generate a valid study plan', 500);
    }

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + goalData.durationDays);

    const tasks: Partial<IStudyTask>[] = rawTasks.map((t: any) => {
      const taskDate = new Date(startDate);
      taskDate.setDate(taskDate.getDate() + t.dayOffset);
      
      return {
        title: t.title,
        description: t.description,
        topic: t.topic,
        date: taskDate,
        durationMinutes: t.durationMinutes,
        type: t.type,
        status: 'PENDING'
      };
    });

    // Inactivate old plans
    await StudyPlan.updateMany({ userId: new Types.ObjectId(userId) }, { isActive: false });

    // Save new plan
    const newPlan = await StudyPlan.create({
      userId: new Types.ObjectId(userId),
      goal: {
        type: goalData.type,
        targetDate: endDate,
        subjectId: goalData.subjectId,
        description: goalData.description
      },
      startDate,
      endDate,
      dailyCommitmentMinutes: goalData.dailyMinutes,
      tasks,
      generatedByAI: true
    });

    return newPlan;
  }

  async getActivePlan(userId: string) {
    return StudyPlan.findOne({ userId: new Types.ObjectId(userId), isActive: true });
  }

  async updateTaskStatus(userId: string, planId: string, taskId: string, status: string) {
    const plan = await StudyPlan.findOne({ _id: planId, userId: new Types.ObjectId(userId) });
    if (!plan) throw new AppError('Plan not found', 404);

    const task = plan.tasks.find(t => (t as any)._id.toString() === taskId);
    if (!task) throw new AppError('Task not found', 404);

    task.status = status as any;
    plan.progress.lastActiveDate = new Date();
    
    // Streak logic (basic)
    if (status === 'COMPLETED') {
      plan.progress.streak += 1;
    }

    await plan.save(); // pre-save hook handles progress recalculation
    return plan;
  }

  async getRecommendations(userId: string) {
    // Recommend question papers based on active plan's subject
    const plan = await StudyPlan.findOne({ userId: new Types.ObjectId(userId), isActive: true });
    if (!plan || !plan.goal.subjectId) return [];

    const papers = await QuestionPaper.find({ 
      subjectId: plan.goal.subjectId,
      isDeleted: false
    }).sort({ examYear: -1 }).limit(3);

    return papers;
  }
}

export const studyPlannerService = new StudyPlannerService();
