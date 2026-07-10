import { Collection } from '../../../models/collection.model';
import { RuleEngineService } from './rule-engine.service';
import { AppError } from '../../../utils/AppError';

export class CollectionService {
  private ruleEngine = new RuleEngineService();

  async getCollections(userId: string) {
    const collections = await Collection.find({ userId })
      .populate('paperIds', 'title subjectId academicYear originalFileName thumbnailUrl pageCount')
      .sort({ isPinned: -1, updatedAt: -1 });
      
    return collections;
  }

  async getCollectionById(userId: string, id: string) {
    const collection = await Collection.findOne({ _id: id, userId })
      .populate('paperIds', 'title subjectId academicYear originalFileName thumbnailUrl pageCount format');
    
    if (!collection) throw new AppError('Collection not found', 404);
    
    if (collection.isSmart && collection.rules && collection.rules.length > 0) {
      const matchedIds = await this.ruleEngine.evaluateRules(collection.rules);
      collection.paperIds = matchedIds as any;
      await collection.save();
    }
    
    return collection;
  }

  async createCollection(userId: string, data: any) {
    if (data.isSmart && data.rules) {
      const matchedIds = await this.ruleEngine.evaluateRules(data.rules);
      data.paperIds = matchedIds;
    }
    return await Collection.create({ userId, ...data });
  }

  async updateCollection(userId: string, id: string, data: any) {
    const collection = await Collection.findOne({ _id: id, userId });
    if (!collection) throw new AppError('Collection not found', 404);

    if (data.isSmart && data.rules) {
      const matchedIds = await this.ruleEngine.evaluateRules(data.rules);
      data.paperIds = matchedIds;
    }

    Object.assign(collection, data);
    await collection.save();
    return collection;
  }

  async deleteCollection(userId: string, id: string) {
    const collection = await Collection.findOneAndDelete({ _id: id, userId });
    if (!collection) throw new AppError('Collection not found', 404);
    
    await Collection.deleteMany({ parentId: id, userId });
    return { success: true };
  }
}
