import { QuestionPaper } from '../../../models/paper.model';
import { DuplicateReport } from '../../../models/duplicateReport.model';

export class IntegrityService {
  async scanRepository() {
    const orphans = await QuestionPaper.countDocuments({ 
      isDeleted: { $ne: true },
      $or: [
        { subjectId: null }, 
        { subjectId: { $exists: false } }
      ]
    });

    const missingFiles = await QuestionPaper.countDocuments({ 
      isDeleted: { $ne: true },
      $or: [
        { fileSize: 0 },
        { fileSize: null }
      ]
    });
    
    const unresolvedDuplicates = await DuplicateReport.countDocuments({ resolved: false });

    return {
      orphans,
      missingFiles,
      unresolvedDuplicates
    };
  }
}
