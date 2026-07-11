import { Router } from 'express';
import { paperController } from '../controllers/paper.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Secure all paper routes
router.use(protect);

// Public reads (for authenticated users)
router.get('/', paperController.getPapers);
router.get('/:id', paperController.getPaperById);

// Writes (Faculty and up)
router.post('/', restrictTo(UserRole.ADMIN,  UserRole.MODERATOR), paperController.createPaper);
router.put('/:id', restrictTo(UserRole.ADMIN,  UserRole.MODERATOR), paperController.updatePaper);

// Workflow (Moderators and up)
router.patch('/:id/status', restrictTo(UserRole.ADMIN,  UserRole.MODERATOR), paperController.setStatus);

// Deletes (Admin only)
router.delete('/:id', restrictTo(UserRole.ADMIN), paperController.deletePaper);

export default router;
