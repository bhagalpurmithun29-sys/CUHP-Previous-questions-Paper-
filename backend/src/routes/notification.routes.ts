import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

// All notification routes require authentication
router.use(protect);

router.get('/', notificationController.getNotifications);
router.get('/unread-count', notificationController.getUnreadCount);

router.put('/read-all', notificationController.markAllAsRead);
router.put('/:id/read', notificationController.markAsRead);
router.put('/:id/archive', notificationController.archiveNotification);
router.delete('/:id', notificationController.deleteNotification);

router.get('/preferences', notificationController.getPreferences);
router.put('/preferences', notificationController.updatePreferences);

export default router;
