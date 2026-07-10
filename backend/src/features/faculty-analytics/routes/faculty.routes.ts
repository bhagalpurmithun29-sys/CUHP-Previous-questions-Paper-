import { Router } from 'express';
import { FacultyAnalyticsController } from '../controllers/faculty.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';

const router = Router();
const controller = new FacultyAnalyticsController();

router.use(protect);
// Strictly restricted to faculty, admins, dean, hod
router.use(restrictTo('ADMIN', 'MODERATOR', 'FACULTY', 'DEAN', 'HOD'));

router.get('/overview', controller.getOverview);
router.get('/curriculum', controller.getCurriculum);
router.get('/assessment', controller.getAssessment);
router.get('/bloom', controller.getBloom);
router.get('/difficulty', controller.getDifficulty);
router.get('/comparison', controller.getComparison);
router.post('/export', controller.exportReport);

export default router;
