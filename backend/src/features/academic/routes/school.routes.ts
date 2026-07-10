import { Router } from 'express';
import { schoolController } from '../controllers/school.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Publicly readable for authenticated users
router.use(protect);

router.get('/', schoolController.getSchools);
router.get('/:id', schoolController.getSchoolById);

// Write operations limited to Admin / Super Admin
router.use(restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.post('/', schoolController.createSchool);
router.put('/:id', schoolController.updateSchool);
router.patch('/:id/archive', schoolController.archiveSchool);
router.patch('/:id/restore', schoolController.restoreSchool);
router.delete('/:id', schoolController.deleteSchool);

export default router;
