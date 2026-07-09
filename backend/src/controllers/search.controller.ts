import { Request, Response } from 'express';
import { SearchService } from '../services/search.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

const searchService = new SearchService();

export const globalSearch = catchAsync(async (req: Request, res: Response) => {
  const { q, type, page, limit, ...filters } = req.query;
  
  const params = {
    query: q as string,
    type: type as any,
    page: page ? parseInt(page as string) : 1,
    limit: limit ? parseInt(limit as string) : 10,
    filters
  };

  const userId = (req as any).user?.userId;
  const ipAddress = req.ip || req.socket.remoteAddress;
  const userAgent = req.get('user-agent');

  const data = await searchService.search(params, userId, ipAddress, userAgent);
  
  res.status(200).json(new ApiResponse(200, data, 'Search completed successfully'));
});

export const autocomplete = catchAsync(async (req: Request, res: Response) => {
  const { q } = req.query;
  const data = await searchService.autocomplete(q as string);
  
  res.status(200).json(new ApiResponse(200, data, 'Autocomplete fetched successfully'));
});

export const getRecentSearches = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const data = await searchService.getRecentSearches(userId);
  
  res.status(200).json(new ApiResponse(200, data, 'Recent searches fetched successfully'));
});

export const getPinnedSearches = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const data = await searchService.getPinnedSearches(userId);
  
  res.status(200).json(new ApiResponse(200, data, 'Pinned searches fetched successfully'));
});

export const togglePinSearch = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const { id } = req.params;
  const data = await searchService.togglePinSearch(userId, id);
  
  res.status(200).json(new ApiResponse(200, data, 'Search pinned status updated successfully'));
});

export const clearRecentSearches = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  await searchService.clearRecentSearches(userId);
  
  res.status(200).json(new ApiResponse(200, null, 'Recent searches cleared successfully'));
});

export const getTrendingSearches = catchAsync(async (req: Request, res: Response) => {
  const data = await searchService.getTrendingSearches();
  res.status(200).json(new ApiResponse(200, data, 'Trending searches fetched successfully'));
});

export const saveSearchManually = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  const { query, filters } = req.body;
  const data = await searchService.saveSearchManually(userId, query, filters);
  res.status(200).json(new ApiResponse(200, data, 'Search saved successfully'));
});
