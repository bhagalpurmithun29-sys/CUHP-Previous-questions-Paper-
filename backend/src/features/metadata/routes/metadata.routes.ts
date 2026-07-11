import { Router } from 'express';
import { metadataController } from '../controllers/metadata.controller';
import { protect, restrictTo } from '../../../middlewares/auth.middleware';
import { UserRole } from '../../../enums/auth.enum';

const router = Router();

// Secure all metadata routes
router.use(protect);

router.get('/:id', metadataController.getMetadata);
router.get('/:id/history', metadataController.getHistory);

// Only faculty and above can update metadata
router.put('/:id', restrictTo(UserRole.ADMIN,  UserRole.MODERATOR), metadataController.updateMetadata);

export default router;
