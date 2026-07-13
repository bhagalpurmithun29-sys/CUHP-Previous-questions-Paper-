import { announcementRepository } from '../../repositories/announcement.repository';

class AcknowledgementService {
  async acknowledge(announcementId: string, userId: string) {
    return announcementRepository.acknowledge(announcementId, userId);
  }
}

export const acknowledgementService = new AcknowledgementService();
