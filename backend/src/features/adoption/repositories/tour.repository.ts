import { Adoption, IAdoption } from '../../../models/adoption.model';

export class TourRepository {
  static async getByUserId(userId: string): Promise<IAdoption> {
    let adoption = await Adoption.findOne({ userId });
    
    if (!adoption) {
      adoption = await Adoption.create({ userId });
    }
    
    return adoption;
  }

  static async updateProgress(userId: string, data: Partial<IAdoption>): Promise<IAdoption | null> {
    const flattenUpdate: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
        for (const [subKey, subValue] of Object.entries(value)) {
          flattenUpdate[`\${key}.\${subKey}`] = subValue;
        }
      } else {
        flattenUpdate[key] = value;
      }
    }

    return Adoption.findOneAndUpdate(
      { userId },
      { $set: flattenUpdate },
      { new: true, upsert: true }
    );
  }

  static async resetTours(userId: string): Promise<IAdoption | null> {
    return Adoption.findOneAndUpdate(
      { userId },
      { $set: { tours: {}, hintsDismissed: [] } },
      { new: true }
    );
  }
}
