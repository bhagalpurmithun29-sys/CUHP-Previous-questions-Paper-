import { announcementRepository } from '../../repositories/announcement.repository';
import { AnnouncementStatus } from '../../models/Announcement.model';
import { queueWorkerService } from './queueWorker.service';

class SchedulingService {
  // To be run by a cron job (e.g., node-cron) every minute
  async processScheduled() {
    const scheduled = await announcementRepository.getScheduledAnnouncements();
    for (const ann of scheduled) {
      ann.status = AnnouncementStatus.PUBLISHED;
      await ann.save();
      await queueWorkerService.enqueueAnnouncementNotification(ann);
      console.log(`[Scheduler] Published scheduled announcement: \${ann._id}`);
    }

    const expired = await announcementRepository.getExpiredAnnouncements();
    for (const ann of expired) {
      ann.status = AnnouncementStatus.EXPIRED;
      await ann.save();
      console.log(`[Scheduler] Expired announcement: \${ann._id}`);
    }
  }
}

export const schedulingService = new SchedulingService();
