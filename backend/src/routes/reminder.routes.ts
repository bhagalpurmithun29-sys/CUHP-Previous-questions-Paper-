import { Router } from 'express';
import { reminderController } from '../controllers/reminder.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/', reminderController.getReminders);
router.post('/', reminderController.createReminder);
router.post('/:id/snooze', reminderController.snoozeReminder);
router.post('/:id/complete', reminderController.completeReminder);

export default router;
