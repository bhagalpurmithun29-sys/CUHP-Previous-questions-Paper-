import { OcrResult, IOcrResult } from '../../models/ocrResult.model';
import { QuestionPaper } from '../../models/paper.model';
import { aiGateway } from './AiGateway';
import { AppError } from '../../utils/AppError';
import { Types } from 'mongoose';
import { randomUUID } from 'crypto';

export class OcrService {
  /**
   * Initiates OCR processing for a paper.
   * Runs asynchronously in the background.
   */
  async processPaper(paperId: string, userId: string): Promise<IOcrResult> {
    const paper = await QuestionPaper.findById(paperId);
    if (!paper) throw new AppError('Question Paper not found', 404);

    let ocrJob = await OcrResult.findOne({ paperId: paper._id });

    if (ocrJob && (ocrJob.status === 'PROCESSING' || ocrJob.status === 'COMPLETED')) {
      throw new AppError(`OCR is already \${ocrJob.status.toLowerCase()}`, 400);
    }

    if (!ocrJob) {
      ocrJob = await OcrResult.create({
        paperId: paper._id,
        status: 'PENDING',
        jobId: randomUUID()
      });
    } else {
      ocrJob.status = 'PENDING';
      ocrJob.errorMessage = undefined;
      ocrJob.jobId = randomUUID();
      await ocrJob.save();
    }

    // Fire and forget background worker logic
    this.executeOcrPipeline(ocrJob._id.toString(), userId).catch(console.error);

    return ocrJob;
  }

  /**
   * The actual background execution pipeline
   */
  private async executeOcrPipeline(ocrResultId: string, userId: string) {
    const startTime = Date.now();
    
    try {
      const ocrJob = await OcrResult.findById(ocrResultId);
      if (!ocrJob) return;

      ocrJob.status = 'PROCESSING';
      await ocrJob.save();

      const paper = await QuestionPaper.findById(ocrJob.paperId);
      if (!paper) throw new Error('Paper not found during execution');

      // 1. Simulating OCR Text Extraction
      // In a real system, we would download paper.fileUrl and pipe it to Tesseract/AWS Textract.
      const rawText = paper.ocrTextPlaceholder || `
        CUHP End Semester Examination 2023
        Subject: Data Structures
        Time: 3 Hours
        Max Marks: 100
        
        Section A
        1. What is an Array? (5)
        2. Explain Linked List. (5)
        
        Section B
        3. Write a C program to implement a stack. (10)
        4. Explain binary tree traversal methods with examples. (10)
      `;

      // 2. Text Cleaning & Structure Extraction via AI Gateway
      const prompt = `
        You are an expert Intelligent Document Processing Engine.
        Process the following OCR raw text from a university question paper.
        Extract the metadata, clean the text, and parse it into structured sections and questions.
        
        Return valid JSON matching this schema:
        {
          "cleanedText": "String without noise",
          "metadata": {
            "subject": "String", "course": "String", "semester": "String", 
            "academicYear": "String", "examType": "String", "duration": "String", "maximumMarks": Number
          },
          "sections": [
            {
              "sectionName": "String",
              "instructions": "String",
              "questions": [
                {
                  "questionNumber": "String",
                  "text": "String",
                  "marks": Number,
                  "subQuestions": []
                }
              ]
            }
          ],
          "qualityScore": {
            "ocrConfidence": Number (0-100),
            "metadataConfidence": Number (0-100),
            "extractionCompleteness": Number (0-100)
          }
        }
        
        Raw Text:
        \${rawText}
      `;

      const response = await aiGateway.chat('gemini', {
        messages: [
          { role: 'system', content: 'You are an advanced Academic OCR Post-Processor.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1
      }, userId);

      let content = response.content.trim();
      if (content.startsWith('\`\`\`json')) content = content.replace(/\`\`\`json/g, '');
      if (content.startsWith('\`\`\`')) content = content.replace(/\`\`\`/g, '');
      
      const parsedData = JSON.parse(content);

      // 3. Store Results
      ocrJob.rawText = rawText;
      ocrJob.cleanedText = parsedData.cleanedText || rawText;
      ocrJob.metadata = parsedData.metadata || {};
      ocrJob.sections = parsedData.sections || [];
      
      const qScore = parsedData.qualityScore || {};
      const overall = Math.round(((qScore.ocrConfidence || 80) + (qScore.metadataConfidence || 80) + (qScore.extractionCompleteness || 80)) / 3);
      
      ocrJob.qualityScore = {
        ocrConfidence: qScore.ocrConfidence || 80,
        metadataConfidence: qScore.metadataConfidence || 80,
        extractionCompleteness: qScore.extractionCompleteness || 80,
        overallQuality: overall
      };

      // Auto-flag for manual review if quality is poor
      if (overall < 70) {
        ocrJob.status = 'NEEDS_REVIEW';
      } else {
        ocrJob.status = 'COMPLETED';
      }

      ocrJob.processingTimeMs = Date.now() - startTime;
      await ocrJob.save();

    } catch (error: any) {
      console.error('OCR Pipeline Failed:', error);
      await OcrResult.findByIdAndUpdate(ocrResultId, {
        status: 'FAILED',
        errorMessage: error.message,
        processingTimeMs: Date.now() - startTime
      });
    }
  }

  async getStatus(paperId: string) {
    const paper = await QuestionPaper.findOne({ paperId });
    if (!paper) throw new AppError('Paper not found', 404);

    return OcrResult.findOne({ paperId: paper._id }).select('-rawText -cleanedText -sections');
  }

  async getResult(paperId: string) {
    const paper = await QuestionPaper.findOne({ paperId });
    if (!paper) throw new AppError('Paper not found', 404);

    return OcrResult.findOne({ paperId: paper._id });
  }

  async updateReview(paperId: string, moderatorId: string, updates: Partial<IOcrResult>) {
    const paper = await QuestionPaper.findOne({ paperId });
    if (!paper) throw new AppError('Paper not found', 404);

    const ocr = await OcrResult.findOne({ paperId: paper._id });
    if (!ocr) throw new AppError('OCR Result not found', 404);

    ocr.metadata = { ...ocr.metadata, ...updates.metadata };
    if (updates.sections) ocr.sections = updates.sections;
    
    ocr.status = 'COMPLETED';
    ocr.moderatorReviewed = true;
    ocr.reviewedBy = new Types.ObjectId(moderatorId);
    ocr.reviewedAt = new Date();

    await ocr.save();
    return ocr;
  }
}

export const ocrService = new OcrService();
