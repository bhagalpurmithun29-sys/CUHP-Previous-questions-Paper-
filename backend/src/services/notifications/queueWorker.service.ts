import { notificationRepository } from '../../repositories/notification.repository';
import { deliveryService } from './delivery.service';
import { preferenceService } from './preference.service';
import { INotification, DeliveryChannel, NotificationType } from '../../interfaces/notification.interface';

class QueueWorkerService {
  
  // Method to simulate adding to a background queue
  async enqueueNotification(payload: Partial<INotification>) {
    await this.processJob(payload);
  }

  private async processJob(payload: Partial<INotification>) {
    const userId = payload.recipientId!.toString();
    const prefs = await preferenceService.getPreferences(userId);

    // Check opt-outs
    if (payload.type && prefs.optOutTypes.includes(payload.type as NotificationType)) {
      console.log(`[Queue Worker] User \${userId} opted out of \${payload.type}. Skipping.`);
      return;
    }

    // Determine channels
    const channelsToDeliver = payload.deliveryChannels || [DeliveryChannel.IN_APP];

    // In-App
    if (channelsToDeliver.includes(DeliveryChannel.IN_APP) && prefs.inAppEnabled) {
      await notificationRepository.createNotification(payload);
      await deliveryService.deliverWebSocket(userId, payload);
    }

    // Email
    if (channelsToDeliver.includes(DeliveryChannel.EMAIL) && prefs.emailEnabled) {
      await deliveryService.deliverEmail(userId, payload);
    }

    // Push
    if (channelsToDeliver.includes(DeliveryChannel.PUSH) && prefs.pushEnabled) {
      await deliveryService.deliverPush(userId, payload);
    }
  }
}

export const queueWorkerService = new QueueWorkerService();
