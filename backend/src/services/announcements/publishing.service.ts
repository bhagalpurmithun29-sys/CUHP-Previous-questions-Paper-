import { announcementRepository } from '../../repositories/announcement.repository';
import { AnnouncementStatus } from '../../models/Announcement.model';
import { queueWorkerService } from './queueWorker.service';

class PublishingService {
  async publish(announcementId: string) {
    const announcement = await announcementRepository.update(announcementId, { 
      status: AnnouncementStatus.PUBLISHED,
      publishAt: new Date()
    });
    
    if (announcement) {
      // Trigger notifications to targets
      await queueWorkerService.enqueueAnnouncementNotification(announcement);
    }
    return announcement;
  }
}

export const publishingService = new PublishingService();
