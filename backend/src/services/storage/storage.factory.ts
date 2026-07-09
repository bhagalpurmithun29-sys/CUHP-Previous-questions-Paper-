import { IStorageProvider } from './storage.interface';
import { LocalStorageProvider } from './providers/local.provider';
import { CloudinaryStorageProvider } from './providers/cloudinary.provider';
import { S3StorageProvider } from './providers/s3.provider';
import { GCSStorageProvider } from './providers/gcs.provider';
import { AzureStorageProvider } from './providers/azure.provider';
import { AppError } from '../../utils/AppError';

export enum StorageProviderType {
  LOCAL = 'LOCAL',
  CLOUDINARY = 'CLOUDINARY',
  S3 = 'S3',
  GCS = 'GCS',
  AZURE = 'AZURE'
}

export class StorageProviderFactory {
  /**
   * Retrieves the singleton instance of the requested storage provider
   */
  static getProvider(type: StorageProviderType | string): IStorageProvider {
    switch (type.toUpperCase()) {
      case StorageProviderType.LOCAL:
        return new LocalStorageProvider();
      case StorageProviderType.CLOUDINARY:
        return new CloudinaryStorageProvider();
      case StorageProviderType.S3:
        return new S3StorageProvider();
      case StorageProviderType.GCS:
        return new GCSStorageProvider();
      case StorageProviderType.AZURE:
        return new AzureStorageProvider();
      default:
        throw new AppError(`Storage provider ${type} is not supported`, 500);
    }
  }

  /**
   * Automatically selects the provider based on current environment configuration.
   * Defaults to LOCAL if not specified in .env
   */
  static getDefaultProvider(): IStorageProvider {
    const providerType = process.env.STORAGE_PROVIDER || StorageProviderType.LOCAL;
    return this.getProvider(providerType);
  }
}
