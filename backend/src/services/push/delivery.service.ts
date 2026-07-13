import { pushNotificationRepository } from '../../repositories/pushNotification.repository';

class DeliveryService {
  async sendNotification(userId: string, payload: any) {
    const subs = await pushNotificationRepository.getSubscriptions(userId);
    if (subs.length === 0) {
      return { success: false, reason: 'NO_SUBSCRIPTION' };
    }

    // Standard web push library integration goes here.
    // e.g. webpush.sendNotification(sub, JSON.stringify(payload))
    
    await pushNotificationRepository.logDelivery(userId, payload, 'SENT');
    return { success: true, deliveredTo: subs.length };
  }
}

export const deliveryService = new DeliveryService();
