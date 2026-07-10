import { OcrResult } from '../../../models/ocrResult.model';
import { AppError } from '../../../utils/AppError';

export class OcrQueueService {
  async queuePaperForOcr(paperId: string) {
    const record = await OcrResult.findOneAndUpdate(
      { paperId },
      { 
        status: 'PENDING',
        errorMessage: null,
        'qualityScore.overallQuality': 0
      },
      { upsert: true, new: true }
    );
    
    return record;
  }
  
  async getQueueStatus(paperId: string) {
    const record = await OcrResult.findOne({ paperId });
    if (!record) throw new AppError('OCR record not found', 404);
    return record;
  }
}
