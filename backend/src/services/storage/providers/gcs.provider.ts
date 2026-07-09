import { IStorageProvider, FileMetadata } from '../storage.interface';
import { AppError } from '../../../utils/AppError';

/**
 * Placeholder for Google Cloud Storage Provider implementation
 */
export class GCSStorageProvider implements IStorageProvider {
  async upload(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata> {
    throw new AppError('Google Cloud Storage Provider is not implemented yet', 501);
  }

  async delete(storagePath: string): Promise<boolean> {
    throw new AppError('Google Cloud Storage Provider is not implemented yet', 501);
  }

  async replace(oldStoragePath: string, file: Buffer, newFilename: string, mimeType: string): Promise<FileMetadata> {
    throw new AppError('Google Cloud Storage Provider is not implemented yet', 501);
  }

  async exists(storagePath: string): Promise<boolean> {
    throw new AppError('Google Cloud Storage Provider is not implemented yet', 501);
  }

  getPublicUrl(storagePath: string): string {
    throw new AppError('Google Cloud Storage Provider is not implemented yet', 501);
  }

  async getSignedUrl(storagePath: string, expiresInSeconds?: number): Promise<string> {
    throw new AppError('Google Cloud Storage Provider is not implemented yet', 501);
  }
}
