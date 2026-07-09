import mongoose, { Schema } from 'mongoose';
import { INotificationPreference, NotificationType } from '../interfaces/notification.interface';

const notificationPreferenceSchema = new Schema<INotificationPreference>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    
    emailEnabled: { type: Boolean, default: true },
    inAppEnabled: { type: Boolean, default: true },
    pushEnabled: { type: Boolean, default: false }, // Requires opt-in browser permission
    
    optOutTypes: [{ type: String, enum: Object.values(NotificationType) }]
  },
  { timestamps: true }
);

export const NotificationPreference = mongoose.model<INotificationPreference>('NotificationPreference', notificationPreferenceSchema);
