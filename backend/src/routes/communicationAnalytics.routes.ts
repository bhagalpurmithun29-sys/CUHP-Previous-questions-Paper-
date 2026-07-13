import { Router } from 'express';
import { communicationAnalyticsController } from '../controllers/communicationAnalytics.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Only Admins or above can access organizational analytics
router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'MODERATOR')); // Adjust based on new RBAC

router.get('/overview', communicationAnalyticsController.getOverview);
router.get('/notifications', communicationAnalyticsController.getNotifications);
router.get('/messages', communicationAnalyticsController.getMessages);
router.get('/announcements', communicationAnalyticsController.getAnnouncements);
router.get('/tasks', communicationAnalyticsController.getTasks);
router.get('/calendar', communicationAnalyticsController.getCalendar);
router.post('/export', communicationAnalyticsController.exportData);

export default router;
