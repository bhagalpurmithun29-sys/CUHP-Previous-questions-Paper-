import { Request, Response } from 'express';
import { libraryService } from '../services/library/library.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { LibraryItemType } from '../interfaces/library.interface';

export class LibraryController {
  
  // Dashboard
  public getDashboard = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.getDashboardOverview(req.user.id);
    res.status(200).json(new ApiResponse(200, result, 'Library dashboard retrieved'));
  });

  // Bookmarks & Favorites
  public toggleBookmark = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.toggleBookmark(req.user.id, req.body.paperId, LibraryItemType.BOOKMARK);
    res.status(200).json(new ApiResponse(200, result, 'Bookmark toggled'));
  });

  public getBookmarks = catchAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    // @ts-ignore
    const result = await libraryService.getItemsByType(req.user.id, LibraryItemType.BOOKMARK, page, limit);
    res.status(200).json(new ApiResponse(200, result, 'Bookmarks retrieved'));
  });

  public toggleFavorite = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.toggleBookmark(req.user.id, req.body.paperId, LibraryItemType.FAVORITE);
    res.status(200).json(new ApiResponse(200, result, 'Favorite toggled'));
  });

  // Continue Reading
  public updateProgress = catchAsync(async (req: Request, res: Response) => {
    const { paperId, lastPage, timeSpent, deviceInfo } = req.body;
    // @ts-ignore
    const result = await libraryService.updateReadingProgress(req.user.id, paperId, lastPage, timeSpent, deviceInfo);
    res.status(200).json(new ApiResponse(200, result, 'Reading progress updated'));
  });

  // Collections
  public createCollection = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.createCollection(req.user.id, req.body);
    res.status(201).json(new ApiResponse(201, result, 'Collection created'));
  });

  public getCollections = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.getCollections(req.user.id);
    res.status(200).json(new ApiResponse(200, result, 'Collections retrieved'));
  });

  public getCollectionDetails = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.getCollectionDetails(req.user.id, req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Collection details retrieved'));
  });

  public updateCollection = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.updateCollection(req.user.id, req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Collection updated'));
  });

  public deleteCollection = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    await libraryService.deleteCollection(req.user.id, req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Collection deleted'));
  });

  public addToCollection = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.addPaperToCollection(req.user.id, req.params.id, req.body.paperId);
    res.status(200).json(new ApiResponse(200, result, 'Paper added to collection'));
  });

  public removeFromCollection = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const result = await libraryService.removePaperFromCollection(req.user.id, req.params.id, req.params.paperId);
    res.status(200).json(new ApiResponse(200, result, 'Paper removed from collection'));
  });
}

export const libraryController = new LibraryController();
