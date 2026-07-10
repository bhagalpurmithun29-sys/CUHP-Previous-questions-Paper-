import { PaperVersion } from '../../../models/paperVersion.model';
import { PaperMetadataHistory } from '../../../models/paperMetadataHistory.model';
import { QuestionPaper } from '../../../models/paper.model';

export class VersionRepository {
  async getPaperVersions(paperId: string) {
    return PaperVersion.find({ paperId }).populate('uploaderId', 'firstName lastName email').sort({ versionNumber: -1 });
  }

  async getPaperMetadataHistory(paperId: string) {
    return PaperMetadataHistory.find({ paperId }).populate('editorId', 'firstName lastName email').sort({ timestamp: -1 });
  }

  async getVersionById(versionId: string) {
    return PaperVersion.findById(versionId).populate('uploaderId', 'firstName lastName');
  }

  async getPaper(paperId: string) {
    return QuestionPaper.findById(paperId);
  }

  async createVersion(data: any) {
    return PaperVersion.create(data);
  }

  async createMetadataHistory(data: any) {
    return PaperMetadataHistory.create(data);
  }

  async updatePaper(paperId: string, data: any) {
    return QuestionPaper.findByIdAndUpdate(paperId, data, { new: true });
  }
}
