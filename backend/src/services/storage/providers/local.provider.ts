import { IStorageProvider, FileMetadata } from '../storage.interface';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { AppError } from '../../../utils/AppError';

export class LocalStorageProvider implements IStorageProvider {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');
  private readonly providerName = 'LOCAL';

  constructor() {
    // Ensure upload directory exists
    fs.mkdir(this.uploadDir, { recursive: true }).catch(console.error);
  }

  private generateHash(buffer: Buffer): { checksum: string; sha256: string } {
    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    const checksum = crypto.createHash('md5').update(buffer).digest('hex'); // Common checksum format
    return { checksum, sha256 };
  }

  async upload(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata> {
    try {
      const { checksum, sha256 } = this.generateHash(file);
      const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(this.uploadDir, uniqueFilename);
      
      await fs.writeFile(filePath, file);

      return {
        originalName: filename,
        mimeType,
        sizeBytes: file.length,
        checksum,
        sha256,
        uploadedAt: new Date(),
        storageProvider: this.providerName,
        storagePath: filePath,
        publicUrl: this.getPublicUrl(uniqueFilename)
      };
    } catch (error) {
      throw new AppError('Failed to upload file locally', 500);
    }
  }

  async delete(storagePath: string): Promise<boolean> {
    try {
      if (await this.exists(storagePath)) {
        await fs.unlink(storagePath);
        return true;
      }
      return false;
    } catch (error) {
      throw new AppError('Failed to delete local file', 500);
    }
  }

  async replace(oldStoragePath: string, file: Buffer, newFilename: string, mimeType: string): Promise<FileMetadata> {
    await this.delete(oldStoragePath);
    return await this.upload(file, newFilename, mimeType);
  }

  async exists(storagePath: string): Promise<boolean> {
    try {
      await fs.access(storagePath);
      return true;
    } catch {
      return false;
    }
  }

  getPublicUrl(filename: string): string {
    // In local dev, we serve the static files from /uploads route
    return `/uploads/${filename}`;
  }

  async getSignedUrl(storagePath: string, expiresInSeconds: number = 3600): Promise<string> {
    // Local provider doesn't truly support signed URLs without additional JWT wrapping on a route.
    // We return the standard path as a fallback placeholder.
    return `/api/downloads/signed/${path.basename(storagePath)}?expires=${Date.now() + expiresInSeconds * 1000}`;
  }
}
