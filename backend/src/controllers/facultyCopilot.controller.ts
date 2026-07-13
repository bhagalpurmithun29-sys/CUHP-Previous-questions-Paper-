import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { facultyCopilotRepository } from '../repositories/facultyCopilot.repository';
import { curriculumIntelligenceService } from '../services/facultyCopilot/curriculumIntelligence.service';
import { assessmentGuidanceService } from '../services/facultyCopilot/assessmentGuidance.service';
import { paperComparisonService } from '../services/facultyCopilot/paperComparison.service';
import { recommendationEngineService } from '../services/facultyCopilot/recommendationEngine.service';
import { v4 as uuidv4 } from 'uuid';

export class FacultyCopilotController {
  
  processChat = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { message, conversationId, context } = req.body;

    const activeConversationId = conversationId || uuidv4();
    const isNew = !conversationId;

    await facultyCopilotRepository.saveMessage(
      activeConversationId,
      userId,
      { role: 'user', content: message, timestamp: new Date() },
      isNew
    );

    // Mock Streaming SSE setup
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write(`data: ${JSON.stringify({ event: 'start', conversationId: activeConversationId })}\n\n`);

    const mockResponse = `Based on the repository data, your curriculum is well-structured, but there is a slight gap in higher-order thinking assessments in recent semesters.`;
    
    for (const char of mockResponse) {
      res.write(`data: ${JSON.stringify({ event: 'token', text: char })}\n\n`);
      await new Promise(r => setTimeout(r, 20)); // Simulate streaming
    }

    await facultyCopilotRepository.saveMessage(
      activeConversationId,
      userId,
      { role: 'assistant', content: mockResponse, timestamp: new Date() }
    );
    
    // Add a mock citation
    await facultyCopilotRepository.recordCitation(activeConversationId, {
       source: 'Repository Analysis 2023-2024',
       confidence: 0.95
    });

    res.write(`data: ${JSON.stringify({ event: 'end' })}\n\n`);
    res.end();
  });

  analyzeCurriculum = catchAsync(async (req: Request, res: Response) => {
    const { subjectId, departmentId } = req.body;
    const coverage = await curriculumIntelligenceService.analyzeCurriculumCoverage(subjectId, departmentId);
    const balance = await assessmentGuidanceService.reviewAssessmentBalance(undefined, subjectId);
    
    res.status(200).json(new ApiResponse(200, { coverage, balance }, 'Curriculum analysis completed'));
  });

  comparePapers = catchAsync(async (req: Request, res: Response) => {
    const { type, sourceId, targetId } = req.body;
    const comparison = await paperComparisonService.compare(type, sourceId, targetId);
    res.status(200).json(new ApiResponse(200, comparison, 'Comparison generated'));
  });

  getHistory = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const history = await facultyCopilotRepository.getHistory(userId);
    res.status(200).json(new ApiResponse(200, history, 'History fetched'));
  });

  getRecommendations = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const recommendations = await recommendationEngineService.generateRecommendations(userId, req.query);
    res.status(200).json(new ApiResponse(200, recommendations, 'Recommendations generated'));
  });
}

export const facultyCopilotController = new FacultyCopilotController();
