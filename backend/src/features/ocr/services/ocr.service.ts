import { OcrResult } from '../../../models/ocrResult.model';
import { QuestionPaper } from '../../../models/paper.model';
import { AppError } from '../../../utils/AppError';

export class OcrService {
  async getOcrText(paperId: string) {
    const record = await OcrResult.findOne({ paperId });
    if (!record) throw new AppError('OCR record not found', 404);
    
    const paper = await QuestionPaper.findById(paperId).select('title fileUrl');
    
    return { record, paper };
  }
  
  async getOcrStats() {
    const total = await OcrResult.countDocuments();
    const completed = await OcrResult.countDocuments({ status: 'COMPLETED' });
    const failed = await OcrResult.countDocuments({ status: 'FAILED' });
    const needsReview = await OcrResult.countDocuments({ status: 'NEEDS_REVIEW' });
    
    return {
      total,
      completed,
      failed,
      needsReview,
      successRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
}
