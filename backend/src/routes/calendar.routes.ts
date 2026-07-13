import { Router } from 'express';
import { calendarController } from '../controllers/calendar.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.get('/events', calendarController.getEvents);
router.get('/export', calendarController.exportIcs);
router.get('/events/:id', calendarController.getEventById);
router.post('/events', calendarController.createEvent);
router.put('/events/:id', calendarController.updateEvent);
router.delete('/events/:id', calendarController.deleteEvent);

export default router;
