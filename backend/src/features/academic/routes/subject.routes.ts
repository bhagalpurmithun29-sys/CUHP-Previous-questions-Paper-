import { Router } from 'express';
import { subjectController } from '../controllers/subject.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Publicly readable for authenticated users
router.use(protect);

router.get('/', subjectController.getSubjects);
router.get('/:id', subjectController.getSubjectById);

// Write operations limited to Admin / Super Admin
router.use(restrictTo(UserRole.ADMIN));

router.post('/', subjectController.createSubject);
router.put('/:id', subjectController.updateSubject);
router.patch('/:id/archive', subjectController.archiveSubject);
router.patch('/:id/restore', subjectController.restoreSubject);
router.delete('/:id', subjectController.deleteSubject);

export default router;
