import { Request, Response } from 'express';
import { questionPaperService } from '../services/paper.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export class QuestionPaperController {
  
  public uploadDraft = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const result = await questionPaperService.saveDraft(req.body, req.file, userId);
    res.status(201).json(new ApiResponse(201, result, 'Draft saved successfully'));
  });

  public submitUpload = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    const result = await questionPaperService.submitUpload(req.body, req.file!, userId);
    res.status(201).json(new ApiResponse(201, result, 'Paper submitted successfully'));
  });

  public updatePaper = catchAsync(async (req: Request, res: Response) => {
    const result = await questionPaperService.updatePaper(req.params.id, req.body, req.file);
    res.status(200).json(new ApiResponse(200, result, 'Paper updated successfully'));
  });

  public deletePaper = catchAsync(async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = (req as any).user?.id || (req as any).user?._id?.toString();
    await questionPaperService.deletePaper(req.params.id, userId);
    res.status(200).json(new ApiResponse(200, null, 'Paper deleted successfully'));
  });

  public getStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await questionPaperService.getUploadStatus(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Status retrieved successfully'));
  });

  public getProcessingStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await questionPaperService.getUploadStatus(req.params.id); // Reusing getUploadStatus for simplicity in this architecture
    res.status(200).json(new ApiResponse(200, {
      status: result.status,
      ocrStatus: (result as any).ocrStatus || 'PENDING'
    }, 'Processing status retrieved successfully'));
  });

  public getProcessingResult = catchAsync(async (req: Request, res: Response) => {
    // Ideally this would fetch the detailed metadata/OCR text.
    const result = await questionPaperService.getUploadStatus(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Processing result retrieved successfully'));
  });
}

export const paperController = new QuestionPaperController();
