import { Preferences, IPreferences } from '../../../models/preference.model';

export class PreferencesRepository {
  static async getByUserId(userId: string): Promise<IPreferences> {
    let prefs = await Preferences.findOne({ userId });
    
    // Create default preferences if none exist for the user yet
    if (!prefs) {
      prefs = await Preferences.create({ userId });
    }
    
    return prefs;
  }

  static async update(userId: string, updateData: Partial<IPreferences>): Promise<IPreferences | null> {
    // If nested objects are updated, we want to deep merge or let Mongoose handle it.
    // For simplicity, we just use Mongoose $set on the fields provided.
    // Since some fields are objects, updating top-level object completely replaces it.
    // A better approach for nested updates:
    
    const flattenUpdate: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(updateData)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const [subKey, subValue] of Object.entries(value)) {
          flattenUpdate[`\${key}.\${subKey}`] = subValue;
        }
      } else {
        flattenUpdate[key] = value;
      }
    }

    return Preferences.findOneAndUpdate(
      { userId },
      { $set: flattenUpdate },
      { new: true, upsert: true }
    );
  }

  static async reset(userId: string): Promise<IPreferences | null> {
    await Preferences.deleteOne({ userId });
    return Preferences.create({ userId }); // Returns fresh defaults
  }
}
