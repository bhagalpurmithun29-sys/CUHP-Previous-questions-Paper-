import { notificationRepository } from '../../repositories/notification.repository';
import { INotification } from '../../interfaces/notification.interface';

class NotificationService {
  async getNotifications(userId: string, query: any) {
    const { page = 1, limit = 20, unreadOnly, archived } = query;
    const filter: any = {};
    
    if (unreadOnly === 'true') filter.isRead = false;
    if (archived === 'true') {
      filter.isArchived = true;
    } else {
      filter.isArchived = false;
    }

    return notificationRepository.getUserNotifications(userId, filter, Number(page), Number(limit));
  }

  async getUnreadCount(userId: string) {
    const count = await notificationRepository.getUnreadCount(userId);
    return { count };
  }

  async markAsRead(userId: string, notificationId: string) {
    return notificationRepository.markAsRead(userId, notificationId);
  }

  async markAllAsRead(userId: string) {
    const count = await notificationRepository.markAllAsRead(userId);
    return { updatedCount: count };
  }

  async archive(userId: string, notificationId: string) {
    return notificationRepository.archiveNotification(userId, notificationId);
  }

  async delete(userId: string, notificationId: string) {
    return notificationRepository.deleteNotification(userId, notificationId);
  }
}

export const notificationService = new NotificationService();
