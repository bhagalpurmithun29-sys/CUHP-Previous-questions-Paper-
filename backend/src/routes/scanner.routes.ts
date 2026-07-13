import { Router } from 'express';
import { scannerController } from '../controllers/scanner.controller';
import { protect } from '../middlewares/auth.middleware';

// In production, configure multer here: import multer from 'multer'; const upload = multer();

const router = Router();

router.use(protect); // Ensure users are authenticated before uploading

// Stubbing the file middleware since this relies on multipart form data in reality
router.post('/upload', scannerController.uploadDocument);
router.post('/preprocess', scannerController.preprocessImage);
router.get('/status', scannerController.getStatus);

export default router;
