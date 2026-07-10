import { Paper } from '../../../models/paper.model';
import { AppError } from '../../../utils/AppError';

export class StorageService {
  async getPaperDownloadUrl(paperId: string): Promise<string> {
    const paper = await Paper.findById(paperId);
    if (!paper) throw new AppError('Paper not found', 404);
    if (!paper.fileUrl) throw new AppError('Paper file not available', 404);
    return paper.fileUrl; // In a real scenario, this could generate a signed URL
  }
}
