import { QuestionPaper } from '../../../models/paper.model';
import { OcrResult } from '../../../models/ocrResult.model';
import { AIMetadata } from '../../../models/aiMetadata.model';

export class AnalyticsRepository {
  async getPaperOverview() {
    return QuestionPaper.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalSize: { $sum: '$fileSize' }
        }
      }
    ]);
  }

  async getUploadTimeline() {
    return QuestionPaper.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          uploads: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 },
      { $sort: { _id: 1 } }
    ]);
  }

  async getOcrStats() {
    return OcrResult.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgProcessingTime: { $avg: '$processingTimeMs' },
          avgConfidence: { $avg: '$qualityScore.overallQuality' }
        }
      }
    ]);
  }

  async getAiStats() {
    return AIMetadata.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$overallConfidence' }
        }
      }
    ]);
  }
}
