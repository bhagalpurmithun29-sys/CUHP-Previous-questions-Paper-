import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { protect, restrictTo } from '../../auth/middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Publicly readable for authenticated users
router.use(protect);

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Write operations limited to Admin / Super Admin
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.patch('/:id/archive', courseController.archiveCourse);
router.patch('/:id/restore', courseController.restoreCourse);
router.delete('/:id', courseController.deleteCourse);

export default router;
