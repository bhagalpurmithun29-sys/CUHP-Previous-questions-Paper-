import multer from 'multer';
import { AppError } from '../utils/AppError';
import path from 'path';

// Multer config for temporary storage before processing
const storage = multer.memoryStorage();

export const uploadPaperMiddleware = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Only accept PDF
    if (file.mimetype === 'application/pdf' && path.extname(file.originalname).toLowerCase() === '.pdf') {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type. Only PDF is allowed.', 400));
    }
  }
});
