import { QuestionPaper } from '../../../models/paper.model';
import { Subject } from '../../../models/subject.model';
import { OcrResult } from '../../../models/ocrResult.model';
import { User } from '../../../models/user.model';
import { aiGateway } from '../AiGateway';

export class ExecutiveAIService {
  /**
   * Generates the core dashboard analytics payload
   */
  async getDashboardData() {
    // In production, this would use complex MongoDB Aggregation pipelines.
    // For this module, we will perform basic counts and combine with AI insights.
    
    const totalPapers = await QuestionPaper.countDocuments();
    const totalSubjects = await Subject.countDocuments();
    const totalUsers = await User.countDocuments();
    const ocrCompleted = await OcrResult.countDocuments({ status: 'COMPLETED' });

    const repositoryHealth = {
      coverageScore: totalSubjects > 0 ? Math.round((totalPapers / (totalSubjects * 5)) * 100) : 0, // Mock logic: ideally 5 papers per subject
      ocrCompletionRate: totalPapers > 0 ? Math.round((ocrCompleted / totalPapers) * 100) : 0,
      metadataQuality: 85, // Placeholder for analytics engine metadata score
    };

    return {
      metrics: {
        totalPapers,
        totalSubjects,
        totalUsers,
      },
      repositoryHealth,
      departmentPerformance: [
        { department: 'Computer Science', uploadCount: 120, activeUsers: 45 },
        { department: 'Mathematics', uploadCount: 85, activeUsers: 30 },
        { department: 'Physics', uploadCount: 50, activeUsers: 20 },
      ]
    };
  }

  /**
   * Generates AI Strategic Insights based on raw dashboard data
   */
  async getInsights(userId: string) {
    const data = await this.getDashboardData();
    
    const prompt = `
      You are the Principal AI Architect and University Strategy Consultant.
      Analyze the following repository analytics data and generate an executive summary and strategic recommendations.
      
      Data:
      \${JSON.stringify(data, null, 2)}
      
      Return strictly valid JSON:
      {
        "executiveSummary": "A 3-4 sentence high-level overview.",
        "insights": [
          { "title": "string", "description": "string", "type": "POSITIVE|NEGATIVE|NEUTRAL" }
        ],
        "recommendations": [
          { "action": "string", "priority": "HIGH|MEDIUM|LOW", "impact": "string" }
        ]
      }
    `;

    const response = await aiGateway.chat('gemini', {
      messages: [
        { role: 'system', content: 'You are an executive academic strategist. Return JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    }, userId);

    let clean = response.content.trim();
    if (clean.startsWith('\`\`\`json')) clean = clean.replace(/\`\`\`json/g, '');
    if (clean.startsWith('\`\`\`')) clean = clean.replace(/\`\`\`/g, '');
    return JSON.parse(clean);
  }

  /**
   * Generates a downloadable report (Mock implementation for now)
   */
  async generateReport(userId: string, reportType: string) {
    // In production, this would trigger a background worker to generate a PDF/Excel via Puppeteer/SheetJS
    return {
      reportUrl: `/downloads/executive_report_\${Date.now()}.\${reportType.toLowerCase()}`,
      status: 'GENERATED'
    };
  }
}

export const executiveAIService = new ExecutiveAIService();
