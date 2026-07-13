import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { documentContextService } from '../services/paperQA/documentContext.service';
import { selectionService } from '../services/paperQA/selection.service';
import { paperRetrievalService } from '../services/paperQA/paperRetrieval.service';
import { citationService } from '../services/paperQA/citation.service';

export const processMessage = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { paperId, message, context, conversationId } = req.body;

  if (!paperId || !message) {
    return res.status(400).json(new ApiResponse(400, null, 'PaperId and message are required'));
  }

  // Handle stream setup
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  await paperRetrievalService.processAndStreamMessage(res, userId, paperId, message, context, conversationId);
});

export const processSelection = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { paperId, text, pageNumber, questionNumber } = req.body;

  if (!paperId || !text) {
    return res.status(400).json(new ApiResponse(400, null, 'PaperId and selection text are required'));
  }

  const analysis = await selectionService.analyzeSelection(userId, paperId, text, pageNumber, questionNumber);
  res.status(200).json(new ApiResponse(200, analysis, 'Selection processed successfully'));
});

export const summarizeDocument = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { paperId, type, pageNumber, section } = req.body; // type: 'paper' | 'section' | 'page' | 'question' | 'topic'

  if (!paperId || !type) {
    return res.status(400).json(new ApiResponse(400, null, 'PaperId and summary type are required'));
  }

  const summary = await documentContextService.generateSummary(userId, paperId, type, pageNumber, section);
  res.status(200).json(new ApiResponse(200, summary, 'Summary generated successfully'));
});

export const getHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { paperId } = req.params;

  const history = await paperRetrievalService.getPaperConversationHistory(userId, paperId);
  res.status(200).json(new ApiResponse(200, history, 'History fetched successfully'));
});

export const getCitations = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { conversationId } = req.params;

  const citations = await citationService.getCitationsForConversation(conversationId);
  res.status(200).json(new ApiResponse(200, citations, 'Citations fetched successfully'));
});
