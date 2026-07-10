import { Router } from 'express';
import { semesterController } from '../controllers/semester.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Publicly readable for authenticated users
router.use(protect);

router.get('/', semesterController.getSemesters);
router.get('/:id', semesterController.getSemesterById);

// Write operations limited to Admin / Super Admin
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.post('/', semesterController.createSemester);
router.put('/:id', semesterController.updateSemester);
router.patch('/:id/archive', semesterController.archiveSemester);
router.patch('/:id/restore', semesterController.restoreSemester);
router.delete('/:id', semesterController.deleteSemester);

export default router;
