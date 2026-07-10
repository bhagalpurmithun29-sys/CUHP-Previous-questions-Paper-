import { DuplicateReport } from '../../../models/duplicateReport.model';
import { QuestionPaper } from '../../../models/paper.model';

export class DuplicateService {
  async getDuplicates(page = 1, limit = 20, resolved = false) {
    const skip = (page - 1) * limit;
    const query = { resolved };
    
    const [data, total] = await Promise.all([
      DuplicateReport.find(query).sort({ similarityScore: -1, createdAt: -1 }).skip(skip).limit(limit),
      DuplicateReport.countDocuments(query)
    ]);
    
    const populatedData = await Promise.all(data.map(async (report) => {
      const newPaper = await QuestionPaper.findOne({ paperId: report.newPaperId }).select('title examYear subjectId storageUrl checksum fileSize');
      const matchedPaper = await QuestionPaper.findOne({ paperId: report.matchedPaperId }).select('title examYear subjectId storageUrl checksum fileSize');
      return { ...report.toObject(), newPaper, matchedPaper };
    }));

    return {
      reports: populatedData,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
