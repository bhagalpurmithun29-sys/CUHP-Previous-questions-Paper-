import { Reminder, IReminder } from '../models/Reminder.model';

class ReminderRepository {
  async getRemindersByUser(userId: string) {
    return Reminder.find({ targetUserId: userId }).sort({ scheduledTime: 1 }).lean();
  }

  async getDueReminders(currentTime: Date) {
    return Reminder.find({
      status: 'SCHEDULED',
      scheduledTime: { $lte: currentTime }
    });
  }

  async createReminder(data: Partial<IReminder>) {
    return Reminder.create(data);
  }

  async updateReminderStatus(id: string, status: string, activityMetadata?: any) {
    return Reminder.findByIdAndUpdate(
      id,
      { 
        $set: { status },
        $push: { activityHistory: { action: `Status updated to \${status}`, metadata: activityMetadata, timestamp: new Date() } }
      },
      { new: true }
    );
  }
  
  async deleteReminder(id: string) {
    return Reminder.findByIdAndDelete(id);
  }
}

export const reminderRepository = new ReminderRepository();
