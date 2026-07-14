import { Request, Response } from 'express';
import { semanticSearchService } from '../services/semanticSearch/SemanticSearchService';
import { indexingService } from '../services/semanticSearch/IndexingService';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const hybridSearch = catchAsync(async (req: Request, res: Response) => {
  const { query, filters } = req.body;
  const result = await semanticSearchService.hybridSearch(query || '', filters || {});
  res.status(200).json(new ApiResponse(200, result, 'Hybrid search successful'));
});

export const getSimilarPapers = catchAsync(async (req: Request, res: Response) => {
  const result = await semanticSearchService.findSimilarPapers(req.params.paperId);
  res.status(200).json(new ApiResponse(200, result, 'Similar papers fetched'));
});

export const triggerReindex = catchAsync(async (req: Request, res: Response) => {
  const { force } = req.body;
  
  // Don't await the full process as it may take a long time, trigger in background
  indexingService.reindexAll(force).catch(err => console.error('Background index failed', err));
  
  res.status(202).json(new ApiResponse(202, null, 'Indexing started in background'));
});

export const getIndexStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await indexingService.getIndexStatus();
  res.status(200).json(new ApiResponse(200, result, 'Index status fetched'));
});
