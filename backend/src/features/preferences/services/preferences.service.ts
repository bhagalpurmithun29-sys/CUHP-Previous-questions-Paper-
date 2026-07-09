import { PreferencesRepository } from '../repositories/preferences.repository';
import { UpdatePreferencesDto } from '../dtos/preferences.dto';

export class PreferencesService {
  static async getPreferences(userId: string) {
    return PreferencesRepository.getByUserId(userId);
  }

  static async updatePreferences(userId: string, updateData: UpdatePreferencesDto) {
    return PreferencesRepository.update(userId, updateData as any);
  }

  static async resetPreferences(userId: string) {
    return PreferencesRepository.reset(userId);
  }
}
