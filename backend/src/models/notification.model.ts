import mongoose, { Schema } from 'mongoose';
import { INotification, NotificationType, DeliveryChannel } from '../interfaces/notification.interface';

const notificationSchema = new Schema<INotification>(
  {
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    
    type: { type: String, enum: Object.values(NotificationType), required: true },
    title: { type: String, required: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 1000 },
    
    link: { type: String },
    metadata: { type: Schema.Types.Mixed },
    
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    isArchived: { type: Boolean, default: false },
    
    deliveryChannels: [{ type: String, enum: Object.values(DeliveryChannel), default: [DeliveryChannel.IN_APP] }]
  },
  { timestamps: true }
);

// Highly optimized index for rendering the unread notification badge
notificationSchema.index({ recipientId: 1, isRead: 1, isArchived: 1, createdAt: -1 });

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
