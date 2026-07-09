import { TourRepository } from '../repositories/tour.repository';

export class MilestoneService {
  static async triggerMilestone(userId: string, milestoneId: string) {
    const adoption = await TourRepository.getByUserId(userId);
    
    if (adoption.milestones && (adoption.milestones as any).get ? (adoption.milestones as any).get(milestoneId) : (adoption.milestones as any)[milestoneId]) {
      return { triggered: false, message: 'Milestone already achieved' };
    }

    const update = {
      [`milestones.\${milestoneId}`]: new Date()
    };

    await TourRepository.updateProgress(userId, update as any);

    return { triggered: true, message: `Milestone \${milestoneId} achieved!` };
  }
}
