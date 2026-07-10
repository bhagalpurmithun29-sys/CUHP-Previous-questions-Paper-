import { QualityReview, IAIReview } from '../models/review.model';
import mongoose from 'mongoose';

export class QualityRepository {
  async getQueue(status?: string): Promise<IAIReview[]> {
    const query = status ? { status } : {};
    return QualityReview.find(query).sort({ createdAt: -1 }).populate('paperId', 'title subject code');
  }

  async getMetrics(): Promise<any> {
    const total = await QualityReview.countDocuments();
    const approved = await QualityReview.countDocuments({ status: 'APPROVED' });
    const corrected = await QualityReview.countDocuments({ status: 'MANUALLY_CORRECTED' });
    
    return {
      total,
      approved,
      corrected,
      acceptanceRate: total ? (approved / total) * 100 : 0,
      overrideRate: total ? (corrected / total) * 100 : 0
    };
  }

  async updateReviewStatus(reviewId: string, status: string, notes?: string, errorCategory?: string, correctedOutput?: any): Promise<IAIReview | null> {
    const updateData: any = { status };
    if (notes) updateData.reviewerNotes = notes;
    if (errorCategory) updateData.errorCategory = errorCategory;
    if (correctedOutput) updateData.correctedOutput = correctedOutput;

    return QualityReview.findByIdAndUpdate(reviewId, updateData, { new: true });
  }
}
