import { IStorageProvider, FileMetadata } from '../storage.interface';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import crypto from 'crypto';
import { AppError } from '../../../utils/AppError';

export class CloudinaryStorageProvider implements IStorageProvider {
  private readonly providerName = 'CLOUDINARY';

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  private generateHash(buffer: Buffer): { checksum: string; sha256: string } {
    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    const checksum = crypto.createHash('md5').update(buffer).digest('hex');
    return { checksum, sha256 };
  }

  async upload(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata> {
    try {
      const { checksum, sha256 } = this.generateHash(file);
      
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: mimeType === 'application/pdf' ? 'image' : 'auto', // Cloudinary handles PDFs as multi-page images, 'raw' is for strict attachments
            folder: 'cuhp_question_bank',
            public_id: `${Date.now()}-${filename.split('.')[0].replace(/[^a-zA-Z0-9.-]/g, '_')}`
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!);
          }
        );
        uploadStream.end(file);
      });

      return {
        originalName: filename,
        mimeType,
        sizeBytes: result.bytes,
        checksum,
        sha256,
        uploadedAt: new Date(result.created_at),
        storageProvider: this.providerName,
        storagePath: result.public_id, // Cloudinary uses public_id
        publicUrl: result.secure_url
      };
    } catch (error) {
      throw new AppError('Failed to upload file to Cloudinary', 500);
    }
  }

  async delete(storagePath: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(storagePath);
      return result.result === 'ok';
    } catch (error) {
      throw new AppError('Failed to delete file from Cloudinary', 500);
    }
  }

  async replace(oldStoragePath: string, file: Buffer, newFilename: string, mimeType: string): Promise<FileMetadata> {
    await this.delete(oldStoragePath);
    return await this.upload(file, newFilename, mimeType);
  }

  async exists(storagePath: string): Promise<boolean> {
    try {
      const result = await cloudinary.api.resource(storagePath);
      return !!result;
    } catch (error) {
      return false;
    }
  }

  getPublicUrl(storagePath: string): string {
    return cloudinary.url(storagePath, { secure: true });
  }

  async getSignedUrl(storagePath: string, expiresInSeconds: number = 3600): Promise<string> {
    // Generates an authenticated download URL
    return cloudinary.utils.private_download_url(storagePath, 'pdf', {
      expires_at: Math.floor(Date.now() / 1000) + expiresInSeconds
    });
  }
}
