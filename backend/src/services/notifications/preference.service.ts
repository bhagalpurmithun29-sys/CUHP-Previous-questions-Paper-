import { notificationRepository } from '../../repositories/notification.repository';
import { NotificationType, DeliveryChannel } from '../../interfaces/notification.interface';

class PreferenceService {
  async getPreferences(userId: string) {
    return notificationRepository.getPreferences(userId);
  }

  async updatePreferences(userId: string, data: any) {
    // Validate inputs
    const updates: any = {};
    if (typeof data.emailEnabled === 'boolean') updates.emailEnabled = data.emailEnabled;
    if (typeof data.inAppEnabled === 'boolean') updates.inAppEnabled = data.inAppEnabled;
    if (typeof data.pushEnabled === 'boolean') updates.pushEnabled = data.pushEnabled;
    if (Array.isArray(data.optOutTypes)) {
       updates.optOutTypes = data.optOutTypes.filter((t: any) => Object.values(NotificationType).includes(t));
    }
    
    return notificationRepository.updatePreferences(userId, updates);
  }
}

export const preferenceService = new PreferenceService();
