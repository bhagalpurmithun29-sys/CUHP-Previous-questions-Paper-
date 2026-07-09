import { IQuestionPaper } from '../../interfaces/paper.interface';
import { AppError } from '../../utils/AppError';

export interface SimilarityResult {
  score: number;
  hashMatch: boolean;
  filenameSimilarity: number;
  metadataSimilarity: number;
  academicSimilarity: number;
  pageCountMatch: boolean;
}

export class SimilarityEngine {
  
  /**
   * Calculates similarity between two strings using Levenshtein distance (mocked via Jaccard for simplicity here)
   */
  private calculateStringSimilarity(str1: string, str2: string): number {
    if (!str1 || !str2) return 0;
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();
    
    if (s1 === s2) return 100;
    
    const set1 = new Set(s1.split(''));
    const set2 = new Set(s2.split(''));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return (intersection.size / union.size) * 100;
  }

  /**
   * Compare Academic Information
   * Subject, Course, Semester, Academic Year, Exam Type
   * Max Weight: 40%
   */
  private compareAcademic(newPaper: IQuestionPaper, existingPaper: IQuestionPaper): number {
    let matchPoints = 0;
    let totalPoints = 5;

    if (newPaper.subjectId.toString() === existingPaper.subjectId.toString()) matchPoints += 2; // High weight
    if (newPaper.courseId.toString() === existingPaper.courseId.toString()) matchPoints += 1;
    if (newPaper.semesterId.toString() === existingPaper.semesterId.toString()) matchPoints += 1;
    if (newPaper.examType === existingPaper.examType) matchPoints += 0.5;
    if (newPaper.academicYear === existingPaper.academicYear) matchPoints += 0.5;

    return (matchPoints / totalPoints) * 100;
  }

  /**
   * Orchestrates the comparison logic and applies the weighted scoring system.
   */
  public compare(newPaper: IQuestionPaper, existingPaper: IQuestionPaper): SimilarityResult {
    // 1. Hash (100% weight if match)
    const hashMatch = newPaper.sha256Hash === existingPaper.sha256Hash;
    if (hashMatch) {
      return {
        score: 100,
        hashMatch: true,
        filenameSimilarity: 100,
        metadataSimilarity: 100,
        academicSimilarity: 100,
        pageCountMatch: true
      };
    }

    // 2. Academic Similarity (40% Weight)
    const academicSimilarity = this.compareAcademic(newPaper, existingPaper);

    // 3. Filename Similarity (15% Weight)
    const filenameSimilarity = this.calculateStringSimilarity(newPaper.originalFileName, existingPaper.originalFileName);

    // 4. Metadata Similarity (Title, Language, Duration) (20% Weight)
    const titleSim = this.calculateStringSimilarity(newPaper.title, existingPaper.title);
    const langMatch = newPaper.language === existingPaper.language ? 100 : 0;
    const metadataSimilarity = (titleSim * 0.7) + (langMatch * 0.3);

    // 5. Page Count (10% Weight)
    const pageCountMatch = newPaper.pageCount === existingPaper.pageCount;

    // 6. Document Properties (Size, PDF version) (15% Weight)
    const sizeDiff = Math.abs((newPaper.fileSize || 0) - (existingPaper.fileSize || 0));
    const sizeSim = sizeDiff < (100 * 1024) ? 100 : Math.max(0, 100 - (sizeDiff / (1024 * 1024) * 10)); // Lose points based on MB difference
    
    // Calculate Final Weighted Score
    const finalScore = 
      (filenameSimilarity * 0.15) + 
      (metadataSimilarity * 0.20) + 
      (academicSimilarity * 0.40) + 
      (pageCountMatch ? 10 : 0) + 
      (sizeSim * 0.15);

    return {
      score: Math.round(finalScore),
      hashMatch: false,
      filenameSimilarity: Math.round(filenameSimilarity),
      metadataSimilarity: Math.round(metadataSimilarity),
      academicSimilarity: Math.round(academicSimilarity),
      pageCountMatch
    };
  }
}

export const similarityEngine = new SimilarityEngine();
