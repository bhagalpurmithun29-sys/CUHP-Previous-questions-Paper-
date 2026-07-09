import { Notification } from '../../models/notification.model';
import { NotificationPreference } from '../../models/notificationPreference.model';
import { User } from '../../models/user.model';
import { NotificationType, DeliveryChannel } from '../../interfaces/notification.interface';
import { AppError } from '../../utils/AppError';

export class NotificationService {
  
  /**
   * Internal Method: Dispatches a notification via the appropriate channels based on user preferences.
   */
  public async dispatch(
    recipientId: string, 
    type: NotificationType, 
    title: string, 
    message: string, 
    metadata?: any
  ) {
    // 1. Get user preferences
    let prefs = await NotificationPreference.findOne({ userId: recipientId });
    if (!prefs) {
       // Create defaults if they don't exist
       prefs = await NotificationPreference.create({ userId: recipientId });
    }

    // 2. Check Opt-Outs
    if (prefs.optOutTypes.includes(type)) {
      return null; // User explicitly opted out of this type
    }

    // 3. Determine Channels
    const channels: DeliveryChannel[] = [];
    if (prefs.inAppEnabled) channels.push(DeliveryChannel.IN_APP);
    if (prefs.emailEnabled) channels.push(DeliveryChannel.EMAIL);
    if (prefs.pushEnabled) channels.push(DeliveryChannel.PUSH);

    if (channels.length === 0) return null;

    // 4. Create In-App Record (Primary persistence layer)
    const notification = await Notification.create({
      recipientId,
      type,
      title,
      message,
      metadata,
      deliveryChannels: channels
    });

    // 5. Trigger external deliveries (Placeholders for workers)
    if (channels.includes(DeliveryChannel.EMAIL)) {
       // emailQueue.add({ to: recipientId, template: type, data: metadata });
    }
    
    if (channels.includes(DeliveryChannel.PUSH)) {
       // pushNotificationQueue.add({ to: recipientId, title, message });
    }

    return notification;
  }

  /**
   * Admin Method: Broadcast a notification to a segment of users
   */
  public async broadcast(type: NotificationType, title: string, message: string, roleFilter?: string) {
    const query = roleFilter ? { role: roleFilter, status: 'ACTIVE' } : { status: 'ACTIVE' };
    
    // In production, this should absolutely be chunked and handled by a background worker queue
    // to prevent memory exhaustion and request timeouts.
    const users = await User.find(query).select('_id');
    
    let dispatched = 0;
    for (const user of users) {
      await this.dispatch(user._id.toString(), type, title, message);
      dispatched++;
    }

    return { success: true, count: dispatched };
  }

  // ==========================================
  // USER ACTIONS
  // ==========================================

  public async getUserNotifications(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    const [data, total, unreadCount] = await Promise.all([
      Notification.find({ recipientId: userId, isArchived: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments({ recipientId: userId, isArchived: false }),
      Notification.countDocuments({ recipientId: userId, isRead: false, isArchived: false })
    ]);

    return { data, total, unreadCount, page, limit, totalPages: Math.ceil(total / limit) };
  }

  public async getUnreadCount(userId: string) {
    const count = await Notification.countDocuments({ recipientId: userId, isRead: false, isArchived: false });
    return { count };
  }

  public async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipientId: userId },
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    if (!notification) throw new AppError('Notification not found', 404);
    return notification;
  }

  public async markAllAsRead(userId: string) {
    const result = await Notification.updateMany(
      { recipientId: userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    return { success: true, modifiedCount: result.modifiedCount };
  }

  public async archiveNotification(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipientId: userId },
      { isArchived: true },
      { new: true }
    );
    if (!notification) throw new AppError('Notification not found', 404);
    return { success: true };
  }

  public async deleteNotification(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndDelete({ _id: notificationId, recipientId: userId });
    if (!notification) throw new AppError('Notification not found', 404);
    return { success: true };
  }
  
  // ==========================================
  // PREFERENCES
  // ==========================================
  
  public async getPreferences(userId: string) {
    let prefs = await NotificationPreference.findOne({ userId });
    if (!prefs) {
      prefs = await NotificationPreference.create({ userId });
    }
    return prefs;
  }
  
  public async updatePreferences(userId: string, data: any) {
    const prefs = await NotificationPreference.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    );
    return prefs;
  }
}

export const notificationService = new NotificationService();
