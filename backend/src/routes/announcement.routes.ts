import { Router } from 'express';
import { announcementController } from '../controllers/announcement.controller';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// Public routes for authenticated users (reading)
router.use(protect);
router.get('/', announcementController.getAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.post('/:id/acknowledge', announcementController.acknowledgeAnnouncement);

// Restricted routes (creating, updating, publishing)
// Only Admins, Super Admins, and Faculty can create announcements
router.use(restrictTo('SUPER_ADMIN', 'ADMIN', 'MODERATOR'));

router.post('/', announcementController.createAnnouncement);
router.put('/:id', announcementController.updateAnnouncement);
router.delete('/:id', announcementController.deleteAnnouncement);
router.post('/:id/publish', announcementController.publishAnnouncement);

export default router;
