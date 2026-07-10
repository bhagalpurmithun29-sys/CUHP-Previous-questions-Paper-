import { DuplicateDetectionLevel, DuplicateResolutionAction } from '../../../interfaces/duplicate.interface';
import { QuestionPaper } from '../../../models/paper.model';
import { DuplicateReport } from '../../../models/duplicateReport.model';

export class SimilarityService {
  async detectDuplicates(newPaperId: string) {
    const newPaper = await QuestionPaper.findOne({ paperId: newPaperId });
    if (!newPaper) return;

    const potentialMatches = await QuestionPaper.find({
      _id: { $ne: newPaper._id },
      isDeleted: { $ne: true },
      $or: [
        { checksum: newPaper.checksum },
        { title: newPaper.title },
        { 
          subjectId: newPaper.subjectId, 
          examYear: newPaper.examYear, 
          examType: newPaper.examType 
        }
      ]
    }).limit(20);

    for (const match of potentialMatches) {
      const hashMatch = newPaper.checksum === match.checksum;
      const metadataSimilarity = (newPaper.title === match.title && newPaper.examYear === match.examYear) ? 100 : 50;
      
      let similarityScore = hashMatch ? 100 : metadataSimilarity;
      let detectionLevel = DuplicateDetectionLevel.NO_DUPLICATE;
      
      if (similarityScore === 100) detectionLevel = DuplicateDetectionLevel.EXACT_DUPLICATE;
      else if (similarityScore > 80) detectionLevel = DuplicateDetectionLevel.NEAR_DUPLICATE;
      else if (similarityScore > 50) detectionLevel = DuplicateDetectionLevel.POSSIBLE_DUPLICATE;

      if (similarityScore > 50) {
        await DuplicateReport.findOneAndUpdate(
          { newPaperId, matchedPaperId: match.paperId },
          {
            newPaperId,
            matchedPaperId: match.paperId,
            similarityScore,
            detectionLevel,
            hashMatch,
            filenameSimilarity: 90,
            metadataSimilarity,
            academicSimilarity: 90,
            pageCountMatch: newPaper.pageCount === match.pageCount,
            suggestedAction: hashMatch ? DuplicateResolutionAction.MERGE : DuplicateResolutionAction.PENDING
          },
          { upsert: true, new: true }
        );
      }
    }
  }
}
