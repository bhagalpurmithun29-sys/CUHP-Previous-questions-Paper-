import { Request, Response } from 'express';
import { helpService } from '../services/help.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const data = await helpService.getCategories();
  res.status(200).json(new ApiResponse(200, data, 'Categories fetched successfully'));
});

export const searchArticles = catchAsync(async (req: Request, res: Response) => {
  const { q, category } = req.query;
  const data = await helpService.searchArticles(q as string, category as string);
  res.status(200).json(new ApiResponse(200, data, 'Articles fetched successfully'));
});

export const getArticleBySlug = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const data = await helpService.getArticleBySlug(slug);
  res.status(200).json(new ApiResponse(200, data, 'Article fetched successfully'));
});

export const getFaqs = catchAsync(async (req: Request, res: Response) => {
  const data = await helpService.getFaqs();
  res.status(200).json(new ApiResponse(200, data, 'FAQs fetched successfully'));
});

export const submitFeedback = catchAsync(async (req: Request, res: Response) => {
  const { isHelpful, comment, slug } = req.body;
  const data = await helpService.submitFeedback(slug, isHelpful, comment);
  res.status(200).json(new ApiResponse(200, data, 'Feedback submitted successfully'));
});
