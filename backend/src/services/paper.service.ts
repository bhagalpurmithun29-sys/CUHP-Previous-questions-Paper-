import { QuestionPaperRepository } from '../repositories/paper.repository';
import { AppError } from '../utils/AppError';
import crypto from 'crypto';
import { PaperApprovalStatus, StorageProvider } from '../interfaces/paper.interface';
import { Types } from 'mongoose';
import { storageService } from './storage/storage.service';

export class QuestionPaperService {
  private repository = new QuestionPaperRepository();

  private generatePaperId(): string {
    return `QP-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  }

  private generateChecksum(buffer: Buffer): string {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }

  async saveDraft(data: any, file: Express.Multer.File | undefined, userId: string) {
    let storageMetadata: any = null;
    
    if (file) {
      storageMetadata = await storageService.uploadFile(
        file.buffer, 
        file.originalname, 
        file.mimetype
      );
    }

    const payload = {
      ...data,
      paperId: this.generatePaperId(),
      uploaderId: new Types.ObjectId(userId),
      approvalStatus: PaperApprovalStatus.DRAFT,
      storageProvider: storageMetadata ? storageMetadata.storageProvider : StorageProvider.LOCAL,
      originalFileName: storageMetadata ? storageMetadata.originalName : 'draft.pdf',
      storedFileName: storageMetadata ? storageMetadata.originalName : 'draft.pdf',
      storagePath: storageMetadata ? storageMetadata.storagePath : '',
      fileUrl: storageMetadata ? storageMetadata.publicUrl : '',
      fileType: storageMetadata ? storageMetadata.mimeType : 'application/pdf',
      fileSize: storageMetadata ? storageMetadata.sizeBytes : 0,
      checksum: storageMetadata ? storageMetadata.checksum : 'draft-checksum',
      sha256Hash: storageMetadata ? storageMetadata.sha256 : 'draft-hash',
    };

    return await this.repository.create(payload);
  }

  async submitUpload(data: any, file: Express.Multer.File, userId: string) {
    if (!file) throw new AppError('PDF file is required for final submission', 400);

    const storageMetadata = await storageService.uploadFile(
      file.buffer, 
      file.originalname, 
      file.mimetype
    );

    const payload = {
      ...data,
      paperId: this.generatePaperId(),
      uploaderId: new Types.ObjectId(userId),
      approvalStatus: PaperApprovalStatus.PENDING,
      storageProvider: storageMetadata.storageProvider,
      originalFileName: storageMetadata.originalName,
      storedFileName: storageMetadata.originalName,
      storagePath: storageMetadata.storagePath,
      fileUrl: storageMetadata.publicUrl,
      fileType: storageMetadata.mimeType,
      fileSize: storageMetadata.sizeBytes,
      checksum: storageMetadata.checksum,
      sha256Hash: storageMetadata.sha256,
    };

    return await this.repository.create(payload);
  }

  async updatePaper(id: string, data: any, file?: Express.Multer.File) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new AppError('Question paper not found', 404);

    let updateData = { ...data };

    if (file) {
      if (existing.storagePath) {
        await storageService.deleteFile(existing.storagePath);
      }
      
      const storageMetadata = await storageService.uploadFile(
        file.buffer, 
        file.originalname, 
        file.mimetype
      );
      
      updateData = {
        ...updateData,
        originalFileName: storageMetadata.originalName,
        storedFileName: storageMetadata.originalName,
        storagePath: storageMetadata.storagePath,
        fileUrl: storageMetadata.publicUrl,
        fileSize: storageMetadata.sizeBytes,
        checksum: storageMetadata.checksum,
        sha256Hash: storageMetadata.sha256,
      };
    }

    // If it was a draft and is now submitted
    if (data.submit) {
      updateData.approvalStatus = PaperApprovalStatus.PENDING;
    }

    return await this.repository.update(id, updateData);
  }

  async deletePaper(id: string, userId: string) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new AppError('Question paper not found', 404);

    if (existing.uploaderId.toString() !== userId) {
      // In a real app we check if user is ADMIN too
      throw new AppError('Unauthorized to delete this paper', 403);
    }

    if (existing.storagePath) {
      await storageService.deleteFile(existing.storagePath);
    }

    return await this.repository.delete(id);
  }

  async getUploadStatus(id: string) {
    const paper = await this.repository.findById(id);
    if (!paper) throw new AppError('Question paper not found', 404);

    return {
      status: paper.approvalStatus,
      isDeleted: paper.isDeleted,
      checksum: paper.checksum
    };
  }
}

export const questionPaperService = new QuestionPaperService();
