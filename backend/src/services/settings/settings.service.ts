import { Setting, ISetting, SettingCategory } from '../../models/setting.model';
import { ActivityLog } from '../../models/activityLog.model'; // Assuming activity log for audit
import { AppError } from '../../utils/AppError';

export class SettingsService {
  // Simple in-memory cache to prevent DB hits on every request (simulating Redis for this scope)
  private cache: Map<string, any> = new Map();
  private cacheExpiry: number = 0;
  private readonly CACHE_TTL = 1000 * 60 * 5; // 5 minutes

  /**
   * Initialize default settings if database is empty
   */
  public async initializeDefaults() {
    const count = await Setting.countDocuments();
    if (count === 0) {
      const defaults = [
        { key: 'maintenance_mode', value: false, category: SettingCategory.MAINTENANCE, type: 'boolean', description: 'System wide maintenance mode', isPublic: true },
        { key: 'max_upload_size_mb', value: 20, category: SettingCategory.UPLOADS, type: 'number', description: 'Maximum PDF upload size', isPublic: false },
        { key: 'enable_registration', value: true, category: SettingCategory.AUTHENTICATION, type: 'boolean', description: 'Allow new user registrations', isPublic: true },
        { key: 'flag_recommendations', value: true, category: SettingCategory.FEATURE_FLAGS, type: 'boolean', description: 'Enable recommendation engine', isPublic: true }
      ];
      await Setting.insertMany(defaults);
      this.clearCache();
    }
  }

  /**
   * Get all settings, using cache if possible
   */
  public async getAllSettings(includePrivate: boolean = false) {
    if (Date.now() > this.cacheExpiry) {
      await this.refreshCache();
    }

    const settings = Array.from(this.cache.values());
    if (!includePrivate) {
      return settings.filter(s => s.isPublic);
    }
    return settings;
  }

  /**
   * Get settings by category
   */
  public async getByCategory(category: SettingCategory) {
    return await Setting.find({ category });
  }

  /**
   * Get a specific setting value quickly
   */
  public async getSettingValue(key: string) {
    if (Date.now() > this.cacheExpiry) {
      await this.refreshCache();
    }
    const setting = this.cache.get(key);
    return setting ? setting.value : null;
  }

  /**
   * Update a setting and log the change
   */
  public async updateSetting(key: string, value: any, userId: string) {
    const setting = await Setting.findOne({ key });
    if (!setting) throw new AppError(`Setting ${key} not found`, 404);

    const oldValue = setting.value;
    
    // Type validation
    if (setting.type === 'number') value = Number(value);
    if (setting.type === 'boolean') value = Boolean(value);
    
    setting.value = value;
    setting.updatedBy = userId as any;
    await setting.save();

    // Audit Log
    // Using console.log placeholder if ActivityLog structure is uncertain, ideally write to DB
    console.log(`[AUDIT] Setting ${key} changed from ${oldValue} to ${value} by User ${userId}`);
    
    this.clearCache();
    return setting;
  }

  /**
   * Bulk import settings
   */
  public async importSettings(settingsPayload: any[], userId: string) {
    for (const item of settingsPayload) {
      await Setting.findOneAndUpdate(
        { key: item.key },
        { 
          $set: { 
            value: item.value, 
            category: item.category,
            type: item.type,
            description: item.description,
            isPublic: item.isPublic,
            updatedBy: userId 
          } 
        },
        { upsert: true }
      );
    }
    this.clearCache();
    return { success: true, count: settingsPayload.length };
  }

  private async refreshCache() {
    const settings = await Setting.find().lean();
    this.cache.clear();
    settings.forEach(s => {
      this.cache.set(s.key, s);
    });
    this.cacheExpiry = Date.now() + this.CACHE_TTL;
  }

  public clearCache() {
    this.cacheExpiry = 0;
    this.cache.clear();
  }
}

export const settingsService = new SettingsService();
