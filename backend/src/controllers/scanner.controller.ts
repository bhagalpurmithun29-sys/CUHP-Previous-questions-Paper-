import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { uploadService } from '../services/document-scanner/upload.service';
import { imageProcessingService } from '../services/document-scanner/imageProcessing.service';
import { ocrPreprocessingService } from '../services/document-scanner/ocrPreprocessing.service';
import { scannerRepository } from '../repositories/scanner.repository';

export class ScannerController {
  
  uploadDocument = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    // In production, `req.file.buffer` would contain the image/PDF
    const fakeBuffer = Buffer.from('fake_image_data');
    const result = await uploadService.handleUpload(userId, fakeBuffer, req.body);
    res.status(200).json(new ApiResponse(200, result, 'Scan uploaded successfully'));
  });

  preprocessImage = catchAsync(async (req: Request, res: Response) => {
    const fakeBuffer = Buffer.from('fake_image_data');
    const enhanced = await imageProcessingService.enhanceImage(fakeBuffer, req.body);
    const ocrReady = await ocrPreprocessingService.preprocessForOcr(enhanced);
    const quality = await imageProcessingService.evaluateQuality(ocrReady);
    res.status(200).json(new ApiResponse(200, quality, 'Image preprocessed successfully'));
  });

  getStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await scannerRepository.getScanStatus(userId, req.query.scanId as string);
    res.status(200).json(new ApiResponse(200, result, 'Scan status retrieved'));
  });
}

export const scannerController = new ScannerController();
