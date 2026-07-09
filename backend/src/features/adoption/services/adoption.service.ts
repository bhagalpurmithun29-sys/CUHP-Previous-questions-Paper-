import { TourRepository } from '../repositories/tour.repository';
import { MilestoneService } from './milestone.service';

export class AdoptionService {
  static async getAdoptionState(userId: string) {
    return TourRepository.getByUserId(userId);
  }

  static async updateProgress(userId: string, data: any) {
    const { tourId, isCompleted, hintId, milestoneId } = data;
    
    const update: any = {};
    
    if (tourId !== undefined && isCompleted !== undefined) {
      update[`tours.\${tourId}`] = isCompleted;
    }

    if (hintId) {
      const current = await TourRepository.getByUserId(userId);
      if (!current.hintsDismissed.includes(hintId)) {
        update.hintsDismissed = [...current.hintsDismissed, hintId];
      }
    }

    if (milestoneId) {
      await MilestoneService.triggerMilestone(userId, milestoneId);
    }

    if (Object.keys(update).length > 0) {
      return TourRepository.updateProgress(userId, update);
    }
    
    return TourRepository.getByUserId(userId);
  }

  static async resetAdoption(userId: string) {
    return TourRepository.resetTours(userId);
  }

  static getWhatsNew() {
    return [
      {
        version: 'v2.1.0',
        date: '2026-07-09T00:00:00.000Z',
        features: [
          { title: 'Interactive Product Tours', description: 'Explore features with step-by-step guided tours.' },
          { title: 'Milestones Tracker', description: 'Earn achievements as you master the platform.' },
          { title: 'Contextual Hints', description: 'Get inline help exactly when you need it.' }
        ]
      },
      {
        version: 'v2.0.0',
        date: '2026-06-15T00:00:00.000Z',
        features: [
          { title: 'Smart Search Engine', description: 'Semantically search through thousands of academic papers.' },
          { title: 'AI Assistant', description: 'Ask context-aware questions directly in the dashboard.' }
        ]
      }
    ];
  }
}
