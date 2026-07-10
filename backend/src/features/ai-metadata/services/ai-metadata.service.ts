import { AIMetadata } from '../../../models/aiMetadata.model';
import { AppError } from '../../../utils/AppError';

export class AIMetadataService {
  async queuePaperForExtraction(paperId: string) {
    const record = await AIMetadata.findOneAndUpdate(
      { paperId },
      { 
        status: 'PENDING',
        errorMessage: null
      },
      { upsert: true, new: true }
    );
    
    return record;
  }
  
  async getMetadataStatus(paperId: string) {
    const record = await AIMetadata.findOne({ paperId });
    if (!record) throw new AppError('AI Metadata record not found', 404);
    return record;
  }

  async getStats() {
    const total = await AIMetadata.countDocuments();
    const completed = await AIMetadata.countDocuments({ status: 'COMPLETED' });
    const needsReview = await AIMetadata.countDocuments({ status: 'NEEDS_REVIEW' });
    const failed = await AIMetadata.countDocuments({ status: 'FAILED' });

    const reviewed = await AIMetadata.countDocuments({ moderatorReviewed: true });
    
    return {
      total,
      completed,
      needsReview,
      failed,
      reviewed
    };
  }
}
