import { LibraryItem } from '../../models/libraryItem.model';
import { Collection } from '../../models/collection.model';
import { LibraryItemType, CreateCollectionDTO } from '../../interfaces/library.interface';
import { AppError } from '../../utils/AppError';
import { Types } from 'mongoose';

export class LibraryService {
  
  // ==========================================
  // BOOKMARKS & FAVORITES
  // ==========================================

  public async toggleBookmark(userId: string, paperId: string, type: LibraryItemType = LibraryItemType.BOOKMARK) {
    const existing = await LibraryItem.findOne({ userId, paperId, type });
    
    if (existing) {
      await existing.deleteOne();
      return { status: 'REMOVED', type };
    } else {
      await LibraryItem.create({ userId, paperId, type });
      // In a real system, we might trigger a repository Analytics increment here: `incrementAnalytics(paperId, 'bookmarkCount')`
      return { status: 'ADDED', type };
    }
  }

  public async getItemsByType(userId: string, type: LibraryItemType, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      LibraryItem.find({ userId, type })
        .populate('paperId', 'title subjectId academicYear originalFileName thumbnailUrl pageCount fileSizeMb')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      LibraryItem.countDocuments({ userId, type })
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ==========================================
  // CONTINUE READING & HISTORY
  // ==========================================

  public async updateReadingProgress(userId: string, paperId: string, lastPage: number, timeSpent: number, deviceInfo: string) {
    return await LibraryItem.findOneAndUpdate(
      { userId, paperId, type: LibraryItemType.CONTINUE_READING },
      { lastPage, timeSpent, deviceInfo },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  // ==========================================
  // COLLECTIONS
  // ==========================================

  public async createCollection(userId: string, data: CreateCollectionDTO) {
    // Unique check is handled by MongoDB index (userId + name)
    try {
      return await Collection.create({ userId, ...data });
    } catch (e: any) {
      if (e.code === 11000) throw new AppError('A collection with this name already exists', 400);
      throw e;
    }
  }

  public async getCollections(userId: string) {
    return await Collection.find({ userId }).sort({ isPinned: -1, updatedAt: -1 });
  }

  public async getCollectionDetails(userId: string, collectionId: string) {
    const collection = await Collection.findOne({ _id: collectionId, userId })
      .populate('paperIds', 'title subjectId academicYear originalFileName thumbnailUrl pageCount');
    
    if (!collection) throw new AppError('Collection not found', 404);
    return collection;
  }

  public async updateCollection(userId: string, collectionId: string, data: Partial<CreateCollectionDTO> & { isPinned?: boolean }) {
    const collection = await Collection.findOneAndUpdate(
      { _id: collectionId, userId },
      data,
      { new: true, runValidators: true }
    );
    
    if (!collection) throw new AppError('Collection not found', 404);
    return collection;
  }

  public async deleteCollection(userId: string, collectionId: string) {
    const collection = await Collection.findOneAndDelete({ _id: collectionId, userId });
    if (!collection) throw new AppError('Collection not found', 404);
    return { success: true };
  }

  public async addPaperToCollection(userId: string, collectionId: string, paperId: string) {
    const collection = await Collection.findOne({ _id: collectionId, userId });
    if (!collection) throw new AppError('Collection not found', 404);

    const paperObjectId = new Types.ObjectId(paperId);
    if (collection.paperIds.includes(paperObjectId)) {
       throw new AppError('Paper already in collection', 400);
    }

    collection.paperIds.push(paperObjectId);
    await collection.save();
    return collection;
  }

  public async removePaperFromCollection(userId: string, collectionId: string, paperId: string) {
    const collection = await Collection.findOne({ _id: collectionId, userId });
    if (!collection) throw new AppError('Collection not found', 404);

    const paperObjectId = new Types.ObjectId(paperId);
    collection.paperIds = collection.paperIds.filter((id: any) => id.toString() !== paperObjectId.toString());
    
    await collection.save();
    return collection;
  }

  // ==========================================
  // DASHBOARD AGGREGATION
  // ==========================================

  public async getDashboardOverview(userId: string) {
    const [recentReading, pinnedCollections, recentBookmarks] = await Promise.all([
      LibraryItem.find({ userId, type: LibraryItemType.CONTINUE_READING })
        .sort({ updatedAt: -1 }).limit(4).populate('paperId', 'title thumbnailUrl pageCount'),
      Collection.find({ userId, isPinned: true })
        .sort({ updatedAt: -1 }).limit(4),
      LibraryItem.find({ userId, type: LibraryItemType.BOOKMARK })
        .sort({ createdAt: -1 }).limit(6).populate('paperId', 'title thumbnailUrl')
    ]);

    return {
      recentReading,
      pinnedCollections,
      recentBookmarks
    };
  }
}

export const libraryService = new LibraryService();
