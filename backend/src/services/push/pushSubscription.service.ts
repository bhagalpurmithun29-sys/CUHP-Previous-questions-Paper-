import { pushNotificationRepository } from '../../repositories/pushNotification.repository';

class PushSubscriptionService {
  async subscribe(userId: string, subscription: any) {
    await pushNotificationRepository.saveSubscription(userId, subscription);
    return { message: 'Successfully subscribed to push notifications.' };
  }

  async unsubscribe(userId: string, endpoint: string) {
    await pushNotificationRepository.removeSubscription(userId, endpoint);
    return { message: 'Successfully unsubscribed from push notifications.' };
  }

  async getStatus(userId: string) {
    const subs = await pushNotificationRepository.getSubscriptions(userId);
    return {
      isSubscribed: subs.length > 0,
      activeDevices: subs.length
    };
  }
}

export const pushSubscriptionService = new PushSubscriptionService();
