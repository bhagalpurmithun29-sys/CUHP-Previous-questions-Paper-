import { IStorageProvider, FileMetadata } from './storage.interface';
import { StorageProviderFactory } from './storage.factory';
import { AppError } from '../../utils/AppError';

/**
 * A higher-level abstraction layer that the rest of the application interacts with.
 * It uses the Factory to instantiate the correct provider under the hood.
 */
export class StorageService {
  private provider: IStorageProvider;

  constructor() {
    this.provider = StorageProviderFactory.getDefaultProvider();
  }

  /**
   * Validate file signature/mimetype before uploading
   */
  private validateFile(mimeType: string, sizeBytes: number) {
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB
    const ALLOWED_MIMES = ['application/pdf', 'image/jpeg', 'image/png']; // Placeholder for future expansions

    if (sizeBytes > MAX_SIZE) {
      throw new AppError('File size exceeds the 20MB maximum limit', 400);
    }

    if (!ALLOWED_MIMES.includes(mimeType)) {
      throw new AppError('Invalid file type. Only PDF and Image formats are allowed', 400);
    }
  }

  async uploadFile(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata> {
    this.validateFile(mimeType, file.length);
    return await this.provider.upload(file, filename, mimeType);
  }

  async deleteFile(storagePath: string): Promise<boolean> {
    return await this.provider.delete(storagePath);
  }

  async replaceFile(oldStoragePath: string, file: Buffer, newFilename: string, mimeType: string): Promise<FileMetadata> {
    this.validateFile(mimeType, file.length);
    return await this.provider.replace(oldStoragePath, file, newFilename, mimeType);
  }

  async fileExists(storagePath: string): Promise<boolean> {
    return await this.provider.exists(storagePath);
  }

  getPublicUrl(storagePath: string): string {
    return this.provider.getPublicUrl(storagePath);
  }

  async getSignedUrl(storagePath: string, expiresInSeconds: number = 3600): Promise<string> {
    return await this.provider.getSignedUrl(storagePath, expiresInSeconds);
  }
}

// Export singleton instance for easy app-wide usage
export const storageService = new StorageService();
