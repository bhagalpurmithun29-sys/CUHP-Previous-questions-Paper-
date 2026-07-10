import { Router } from 'express';
import { ModerationController } from '../controllers/moderation.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new ModerationController();

// Anyone authenticated can create a report
router.post('/reports', protect, controller.createReport);

// Only moderators and admins can access the queue and manage reports
router.use(protect, restrictTo('MODERATOR', 'ADMIN'));

router.get('/reports', controller.getReports);
router.get('/reports/:id', controller.getReportById);
router.put('/reports/:id', controller.updateReport);

router.post('/reports/:id/assign', controller.assignModerator);
router.post('/reports/:id/approve', controller.approveReport);
router.post('/reports/:id/reject', controller.rejectReport);
router.post('/reports/:id/escalate', controller.escalateReport);

export default router;
