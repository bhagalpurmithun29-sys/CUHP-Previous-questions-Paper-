import multer from 'multer';
import { AppError } from '../utils/AppError';
import path from 'path';

// Multer config for temporary storage before processing
const storage = multer.memoryStorage();

export const uploadPaperMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept PDF, JPEG, JPG
    const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.pdf', '.jpeg', '.jpg'];

    if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type. Only PDF, JPEG, and JPG are allowed.', 400));
    }
  }
});
