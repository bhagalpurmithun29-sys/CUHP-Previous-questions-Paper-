import { Notification } from '../models/notification.model';
import { NotificationPreference } from '../models/notificationPreference.model';
import { INotification, NotificationType, DeliveryChannel } from '../interfaces/notification.interface';
import { Types } from 'mongoose';

class NotificationRepository {
  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return Notification.create(data);
  }

  async getUserNotifications(userId: string, filter: any = {}, page: number = 1, limit: number = 20) {
    const query = { recipientId: new Types.ObjectId(userId), ...filter };
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Notification.countDocuments(query)
    ]);

    return { notifications, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return Notification.countDocuments({ recipientId: new Types.ObjectId(userId), isRead: false, isArchived: false });
  }

  async markAsRead(userId: string, notificationId: string): Promise<INotification | null> {
    return Notification.findOneAndUpdate(
      { _id: new Types.ObjectId(notificationId), recipientId: new Types.ObjectId(userId) },
      { $set: { isRead: true, readAt: new Date() } },
      { new: true }
    );
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await Notification.updateMany(
      { recipientId: new Types.ObjectId(userId), isRead: false },
      { $set: { isRead: true, readAt: new Date() } }
    );
    return result.modifiedCount;
  }

  async archiveNotification(userId: string, notificationId: string): Promise<INotification | null> {
    return Notification.findOneAndUpdate(
      { _id: new Types.ObjectId(notificationId), recipientId: new Types.ObjectId(userId) },
      { $set: { isArchived: true } },
      { new: true }
    );
  }

  async deleteNotification(userId: string, notificationId: string): Promise<boolean> {
    const result = await Notification.deleteOne({ 
      _id: new Types.ObjectId(notificationId), 
      recipientId: new Types.ObjectId(userId) 
    });
    return result.deletedCount === 1;
  }

  async getPreferences(userId: string) {
    let prefs = await NotificationPreference.findOne({ userId: new Types.ObjectId(userId) });
    if (!prefs) {
      prefs = await NotificationPreference.create({ userId: new Types.ObjectId(userId) });
    }
    return prefs;
  }

  async updatePreferences(userId: string, data: any) {
    return NotificationPreference.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: data },
      { new: true, upsert: true }
    );
  }
}

export const notificationRepository = new NotificationRepository();
