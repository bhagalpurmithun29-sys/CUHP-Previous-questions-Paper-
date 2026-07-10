import { Request, Response, NextFunction } from 'express';
import { BookmarkService } from '../services/bookmark.service';
import { ReadingListService } from '../services/reading-list.service';
import { BookmarkSyncService } from '../services/bookmark-sync.service';

export class BookmarkController {
  private bookmarkService = new BookmarkService();
  private readingListService = new ReadingListService();
  private syncService = new BookmarkSyncService();

  addBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.bookmarkService.addBookmark(userId as string, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getBookmarks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.bookmarkService.getBookmarks(userId as string, req.query);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  updateBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.bookmarkService.updateBookmark(req.params.id, userId as string, req.body);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  deleteBookmark = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      await this.bookmarkService.removeBookmark(req.params.id, userId as string);
      res.status(200).json({ success: true, message: 'Bookmark removed' });
    } catch (error) { next(error); }
  };

  createReadingList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.readingListService.createList(userId as string, req.body);
      res.status(201).json({ success: true, data });
    } catch (error) { next(error); }
  };

  getReadingLists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.readingListService.getLists(userId as string);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  updateReadingList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.readingListService.updateList(req.params.id, userId as string, req.body);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };

  deleteReadingList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      await this.readingListService.removeList(req.params.id, userId as string);
      res.status(200).json({ success: true, message: 'Reading list removed' });
    } catch (error) { next(error); }
  };

  syncBookmarks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.user?._id;
      const data = await this.syncService.syncOfflineChanges(userId as string, req.body.changes);
      res.status(200).json({ success: true, data });
    } catch (error) { next(error); }
  };
}
