import { explorerRepository } from '../repositories/explorer.repository';
import { GetPapersDto } from '../dtos/explorer.dto';

export class ExplorerService {
  async getPublicPapers(filters: GetPapersDto) {
    return await explorerRepository.findPapers(filters);
  }

  async getPaperDetails(id: string) {
    const paper = await explorerRepository.findPaperById(id);
    if (!paper) {
      throw new Error('Paper not found or access denied');
    }
    // Asynchronously increment view count
    explorerRepository.incrementViewCount(id).catch(err => console.error(err));
    return paper;
  }
}

export const explorerService = new ExplorerService();
