class PushNotificationRepository {
  private subscriptions: Map<string, any[]> = new Map();

  async saveSubscription(userId: string, subscription: any) {
    const userSubs = this.subscriptions.get(userId) || [];
    userSubs.push(subscription);
    this.subscriptions.set(userId, userSubs);
    return subscription;
  }

  async removeSubscription(userId: string, endpoint: string) {
    let userSubs = this.subscriptions.get(userId) || [];
    userSubs = userSubs.filter(sub => sub.endpoint !== endpoint);
    this.subscriptions.set(userId, userSubs);
    return { success: true };
  }

  async getSubscriptions(userId: string) {
    return this.subscriptions.get(userId) || [];
  }

  async logDelivery(userId: string, payload: any, status: string) {
    // Stub implementation to save delivery logs
    return { userId, payload, status, timestamp: new Date() };
  }
}

export const pushNotificationRepository = new PushNotificationRepository();
