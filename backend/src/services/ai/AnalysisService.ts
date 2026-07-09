import { PaperAnalysis, IPaperAnalysis } from '../../models/paperAnalysis.model';
import { QuestionPaper } from '../../models/paper.model';
import { aiGateway } from './AiGateway';
import { AppError } from '../../utils/AppError';
import { Types } from 'mongoose';

export class AnalysisService {
  private getSystemPrompt(): string {
    return `You are an expert academic evaluator and data scientist for a University.
Analyze the provided university question paper text and extract deep academic insights.
Return ONLY valid JSON that matches this exact schema:
{
  "overallDifficulty": "EASY" | "MEDIUM" | "HARD",
  "topicBreakdown": [
    { "topic": "Topic Name", "percentage": number, "description": "Short description" }
  ],
  "keyConcepts": ["Concept 1", "Concept 2"],
  "examPattern": [
    { "section": "A", "marks": 20, "questionCount": 5, "type": "OBJECTIVE" | "SUBJECTIVE" | "MIXED" }
  ],
  "repeatedTopics": [
    { "topic": "Topic Name", "frequency": number }
  ],
  "importantTopics": ["Topic 1", "Topic 2"],
  "preparationTips": ["Tip 1", "Tip 2"],
  "summary": "Overall summary of the paper and its focus."
}
Do NOT wrap the JSON in markdown code blocks. Ensure percentage breakdown sums to approximately 100.`;
  }

  /**
   * Triggers background analysis of a question paper
   */
  async triggerAnalysis(paperId: string): Promise<IPaperAnalysis> {
    const paper = await QuestionPaper.findOne({ paperId });
    if (!paper) throw new AppError('Question paper not found', 404);

    let analysis = await PaperAnalysis.findOne({ paperId: paper._id });
    if (!analysis) {
      analysis = await PaperAnalysis.create({
        paperId: paper._id,
        subjectId: paper.subjectId,
        status: 'PENDING'
      });
    } else if (analysis.status === 'PROCESSING') {
      throw new AppError('Analysis is already processing', 400);
    }

    // Update status
    analysis.status = 'PROCESSING';
    analysis.error = undefined;
    await analysis.save();

    // Trigger async processing (fire and forget)
    this.processAnalysis(paper._id.toString(), analysis._id.toString()).catch(console.error);

    return analysis;
  }

  /**
   * The actual processing logic (runs asynchronously)
   */
  private async processAnalysis(paperObjectId: string, analysisId: string) {
    try {
      const paper = await QuestionPaper.findById(paperObjectId);
      const analysis = await PaperAnalysis.findById(analysisId);
      
      if (!paper || !analysis) return;

      // In a real scenario, this would be actual OCR text. Using placeholder or dummy if empty.
      const textToAnalyze = paper.ocrTextPlaceholder || 
        `Subject: ${paper.subjectId}\nExam Year: ${paper.examYear}\nExam Type: ${paper.examType}\n\nQ1. Discuss the core concepts. (10 marks)\nQ2. Explain the advanced topics with examples. (15 marks)`;

      const prompt = `Analyze this question paper text:\n\n${textToAnalyze}`;

      const response = await aiGateway.chat('gemini', {
        messages: [
          { role: 'system', content: this.getSystemPrompt() },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1, // Low temperature for consistent JSON
        maxTokens: 2000
      });

      let content = response.content.trim();
      // Clean markdown if present
      if (content.startsWith('\`\`\`json')) content = content.replace(/\`\`\`json/g, '');
      if (content.startsWith('\`\`\`')) content = content.replace(/\`\`\`/g, '');
      content = content.trim();

      const parsedData = JSON.parse(content);

      // Update Analysis record
      analysis.overallDifficulty = parsedData.overallDifficulty || 'MEDIUM';
      analysis.topicBreakdown = parsedData.topicBreakdown || [];
      analysis.keyConcepts = parsedData.keyConcepts || [];
      analysis.examPattern = parsedData.examPattern || [];
      analysis.repeatedTopics = parsedData.repeatedTopics || [];
      analysis.importantTopics = parsedData.importantTopics || [];
      analysis.preparationTips = parsedData.preparationTips || [];
      analysis.summary = parsedData.summary || 'Analysis complete.';
      analysis.status = 'COMPLETED';
      analysis.processedAt = new Date();
      
      await analysis.save();
    } catch (error: any) {
      console.error('Paper analysis failed:', error);
      await PaperAnalysis.findByIdAndUpdate(analysisId, {
        status: 'FAILED',
        error: error.message
      });
    }
  }

  async getAnalysis(paperId: string) {
    const paper = await QuestionPaper.findOne({ paperId });
    if (!paper) throw new AppError('Question paper not found', 404);

    return PaperAnalysis.findOne({ paperId: paper._id });
  }

  async getSubjectAnalysis(subjectId: string) {
    const analyses = await PaperAnalysis.find({ 
      subjectId: new Types.ObjectId(subjectId),
      status: 'COMPLETED'
    });

    if (!analyses.length) return null;

    // Aggregate logic for subject-level intelligence
    const totalPapers = analyses.length;
    const difficultyCount = { EASY: 0, MEDIUM: 0, HARD: 0 };
    const allTopics = new Map<string, number>();

    analyses.forEach(a => {
      difficultyCount[a.overallDifficulty]++;
      a.repeatedTopics.forEach(rt => {
        allTopics.set(rt.topic, (allTopics.get(rt.topic) || 0) + rt.frequency);
      });
    });

    // Sort topics by frequency
    const topRepeated = Array.from(allTopics.entries())
      .map(([topic, frequency]) => ({ topic, frequency }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5);

    return {
      totalPapersAnalyzed: totalPapers,
      difficultyDistribution: difficultyCount,
      topRepeatedTopics: topRepeated
    };
  }
}

export const analysisService = new AnalysisService();
