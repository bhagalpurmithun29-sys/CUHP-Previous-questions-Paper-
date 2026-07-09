import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Enterprise Notification Center APIs
 */

// All routes require authentication
router.use(protect);

router.get('/', notificationController.getNotifications);
router.get('/unread', notificationController.getUnreadCount);
router.post('/read-all', notificationController.markAllAsRead);
router.post('/:id/read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);

// Preferences
router.get('/preferences', notificationController.getPreferences);
router.put('/preferences', notificationController.updatePreferences);

// Admin Only
router.post('/broadcast', restrictTo('ADMIN'), notificationController.broadcast);

export default router;
