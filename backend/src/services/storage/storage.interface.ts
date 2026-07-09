export interface FileMetadata {
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  checksum: string;
  sha256: string;
  uploadedAt: Date;
  storageProvider: string;
  storagePath: string;
  publicUrl?: string;
}

export interface IStorageProvider {
  /**
   * Uploads a file buffer to the storage provider
   */
  upload(file: Buffer, filename: string, mimeType: string): Promise<FileMetadata>;

  /**
   * Deletes a file from the storage provider by its storage path/identifier
   */
  delete(storagePath: string): Promise<boolean>;

  /**
   * Replaces an existing file with a new one
   */
  replace(oldStoragePath: string, file: Buffer, newFilename: string, mimeType: string): Promise<FileMetadata>;

  /**
   * Checks if a file exists
   */
  exists(storagePath: string): Promise<boolean>;

  /**
   * Gets a public accessible URL for the file (if applicable)
   */
  getPublicUrl(storagePath: string): string;

  /**
   * Gets a time-limited signed URL for private access
   */
  getSignedUrl(storagePath: string, expiresInSeconds?: number): Promise<string>;
}
