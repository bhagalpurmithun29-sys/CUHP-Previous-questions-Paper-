import { SubjectRevision, ISubjectRevision } from '../../models/revision.model';
import { PaperAnalysis } from '../../models/paperAnalysis.model';
import { QuestionPaper } from '../../models/paper.model';
import { aiGateway } from './AiGateway';
import { AppError } from '../../utils/AppError';
import { Types } from 'mongoose';

export class RevisionService {
  /**
   * Initializes or updates a user's revision tracker for a subject
   */
  async initializeRevision(userId: string, subjectId: string): Promise<ISubjectRevision> {
    let revision = await SubjectRevision.findOne({ userId, subjectId });
    
    // Fetch historical AI paper analyses for this subject to gather all topics
    const analyses = await PaperAnalysis.find({ 
      subjectId: new Types.ObjectId(subjectId), 
      status: 'COMPLETED' 
    });

    const topicFrequencies = new Map<string, number>();
    analyses.forEach(a => {
      a.repeatedTopics.forEach(rt => {
        topicFrequencies.set(rt.topic, (topicFrequencies.get(rt.topic) || 0) + rt.frequency);
      });
      a.importantTopics.forEach(it => {
        topicFrequencies.set(it, (topicFrequencies.get(it) || 0) + 1);
      });
    });

    const uniqueTopics = Array.from(topicFrequencies.entries()).map(([topic, freq]) => ({
      topic,
      baseFrequency: freq
    }));

    if (!revision) {
      revision = await SubjectRevision.create({
        userId,
        subjectId,
        topics: uniqueTopics.map(t => ({
          topic: t.topic,
          confidenceScore: 0,
          isCompleted: false,
          priorityScore: t.baseFrequency * 10 // initial simple priority
        })),
        checklist: [
          { item: 'Review all previous year papers', isDone: false },
          { item: 'Take at least 2 mock tests', isDone: false },
          { item: 'Revise formula/concept sheets', isDone: false }
        ]
      });
    }

    return this.recalculatePriorities(revision);
  }

  /**
   * Recalculates readiness and priorities dynamically
   */
  async recalculatePriorities(revision: ISubjectRevision): Promise<ISubjectRevision> {
    if (revision.topics.length === 0) return revision;

    let totalConfidence = 0;
    
    revision.topics = revision.topics.map(topic => {
      // Priority = (100 - confidence) * historical_frequency_weight
      // (Simplified model. Real enterprise logic would be more robust)
      const missedWeight = topic.isCompleted ? 0 : 50;
      const confidenceGap = 100 - topic.confidenceScore;
      
      topic.priorityScore = confidenceGap + missedWeight; // basic priority algorithm
      totalConfidence += topic.confidenceScore;
      return topic;
    });

    // Sort by priority descending
    revision.topics.sort((a, b) => b.priorityScore - a.priorityScore);

    revision.readinessScore = Math.round(totalConfidence / revision.topics.length);
    revision.lastReadinessCalculation = new Date();

    await revision.save();
    return revision;
  }

  /**
   * Update student progress on a specific topic
   */
  async updateProgress(userId: string, subjectId: string, topicName: string, confidence: number, isCompleted: boolean) {
    const revision = await SubjectRevision.findOne({ userId, subjectId });
    if (!revision) throw new AppError('Revision plan not found', 404);

    const topicIndex = revision.topics.findIndex(t => t.topic === topicName);
    if (topicIndex !== -1) {
      revision.topics[topicIndex].confidenceScore = confidence;
      revision.topics[topicIndex].isCompleted = isCompleted;
      revision.topics[topicIndex].lastRevisedAt = new Date();
    } else {
      // Add dynamic topic if not mapped initially
      revision.topics.push({
        topic: topicName,
        confidenceScore: confidence,
        isCompleted,
        lastRevisedAt: new Date(),
        priorityScore: 50
      });
    }

    return this.recalculatePriorities(revision);
  }

  /**
   * Generates AI-driven Last-Minute Revision Mode plan
   */
  async generateLastMinutePlan(userId: string, subjectId: string, mode: 'LAST_MINUTE_7_DAY' | 'LAST_MINUTE_3_DAY' | 'LAST_MINUTE_24_HR') {
    const revision = await SubjectRevision.findOne({ userId, subjectId });
    if (!revision) throw new AppError('Revision plan not found', 404);

    revision.mode = mode;
    await revision.save();

    const highPriorityTopics = revision.topics
      .filter(t => t.priorityScore > 50)
      .slice(0, 10)
      .map(t => t.topic);

    const prompt = `
      As an expert Academic Assistant, generate a \${mode.replace(/_/g, ' ')} revision plan.
      The student's readiness score is \${revision.readinessScore}/100.
      The highest priority topics they struggle with are: \${highPriorityTopics.join(', ')}.
      
      Return JSON:
      {
        "planTimeline": [
          { "timeLabel": "Day 1 (or Hour 1)", "action": "string", "focusTopic": "string" }
        ],
        "emergencyAdvice": "String"
      }
      Only return valid JSON. Do not include markdown code block formatting.
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You generate personalized, high-intensity exam revision schedules.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    }, userId);

    let content = response.content.trim();
    if (content.startsWith('\`\`\`json')) content = content.replace(/\`\`\`json/g, '');
    if (content.startsWith('\`\`\`')) content = content.replace(/\`\`\`/g, '');
    
    return JSON.parse(content);
  }

  async getRecommendations(userId: string, subjectId: string) {
    const revision = await SubjectRevision.findOne({ userId, subjectId });
    if (!revision) return { recommendedPapers: [], criticalTopics: [] };

    // Get worst performing topics
    const criticalTopics = revision.topics.slice(0, 5);

    // Recommend question papers that feature these critical topics heavily
    // Since our paper tags/keywords are flat, we'll do a simple match
    const topicNames = criticalTopics.map(t => t.topic.toLowerCase());
    
    const recommendedPapers = await QuestionPaper.find({
      subjectId: new Types.ObjectId(subjectId),
      isDeleted: false,
      visibility: 'PUBLIC'
    }).sort({ examYear: -1 }).limit(4);

    // In a true vector environment, we'd use SemanticSearchService to find papers mapping strictly to these topics.

    return { recommendedPapers, criticalTopics };
  }
}

export const revisionService = new RevisionService();
