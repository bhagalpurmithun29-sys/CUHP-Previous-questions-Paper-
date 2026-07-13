import { announcementRepository } from '../../repositories/announcement.repository';
import { IAnnouncement, AnnouncementStatus } from '../../models/Announcement.model';

class AnnouncementService {
  async getAnnouncements(user: any, query: any) {
    const filter: any = {};
    if (query.type) filter.type = query.type;
    if (query.isPinned) filter.isPinned = query.isPinned === 'true';

    return announcementRepository.findForUser(user, filter, Number(query.page || 1), Number(query.limit || 20));
  }

  async getAnnouncementById(id: string) {
    return announcementRepository.findById(id);
  }

  async createAnnouncement(userId: string, data: Partial<IAnnouncement>) {
    data.authorId = userId as any;
    if (!data.status) {
      data.status = data.publishAt && new Date(data.publishAt) > new Date() 
        ? AnnouncementStatus.SCHEDULED 
        : AnnouncementStatus.DRAFT;
    }
    return announcementRepository.create(data);
  }

  async updateAnnouncement(id: string, data: Partial<IAnnouncement>) {
    return announcementRepository.update(id, data);
  }

  async deleteAnnouncement(id: string) {
    return announcementRepository.delete(id);
  }
}

export const announcementService = new AnnouncementService();
