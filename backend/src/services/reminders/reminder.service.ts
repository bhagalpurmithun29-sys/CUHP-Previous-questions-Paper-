import { reminderRepository } from '../../repositories/reminder.repository';

class ReminderService {
  async getUserReminders(userId: string) {
    return reminderRepository.getRemindersByUser(userId);
  }

  async createReminder(data: any) {
    data.activityHistory = [{ action: 'Created', timestamp: new Date() }];
    return reminderRepository.createReminder(data);
  }

  async snoozeReminder(id: string, minutes: number) {
    const newScheduledTime = new Date(Date.now() + minutes * 60000);
    return reminderRepository.updateReminderStatus(id, 'SNOOZED', { snoozedUntil: newScheduledTime });
  }

  async completeReminder(id: string) {
    return reminderRepository.updateReminderStatus(id, 'COMPLETED');
  }
}

export const reminderService = new ReminderService();
