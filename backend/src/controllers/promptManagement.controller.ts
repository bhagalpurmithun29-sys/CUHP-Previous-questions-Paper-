import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { promptRepositoryService } from '../services/promptManagement/promptRepository.service';
import { versionControlService } from '../services/promptManagement/versionControl.service';
import { promptTestingService } from '../services/promptManagement/promptTesting.service';
import { templateService } from '../services/promptManagement/template.service';
import { approvalService } from '../services/promptManagement/approval.service';

export class PromptManagementController {
  getAllPrompts = catchAsync(async (req: Request, res: Response) => {
    const prompts = await promptRepositoryService.getAllPrompts();
    res.status(200).json(new ApiResponse(200, prompts, 'Prompts retrieved'));
  });

  getPromptById = catchAsync(async (req: Request, res: Response) => {
    const prompt = await promptRepositoryService.getPromptById(req.params.id);
    res.status(200).json(new ApiResponse(200, prompt, 'Prompt retrieved'));
  });

  createPrompt = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const prompt = await promptRepositoryService.createPrompt(req.body, userId);
    res.status(201).json(new ApiResponse(201, prompt, 'Prompt created'));
  });

  updatePrompt = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const prompt = await promptRepositoryService.updatePrompt(req.params.id, req.body, userId);
    res.status(200).json(new ApiResponse(200, prompt, 'Prompt updated'));
  });

  publishVersion = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { versionId } = req.body;
    const prompt = await versionControlService.publishVersion(req.params.id, versionId, userId);
    res.status(200).json(new ApiResponse(200, prompt, 'Version published'));
  });

  rollbackVersion = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { versionId } = req.body;
    const prompt = await versionControlService.rollbackVersion(req.params.id, versionId, userId);
    res.status(200).json(new ApiResponse(200, prompt, 'Rolled back to version'));
  });

  requestApproval = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { versionId } = req.body;
    const prompt = await approvalService.requestApproval(req.params.id, versionId, userId);
    res.status(200).json(new ApiResponse(200, prompt, 'Approval requested'));
  });

  approveVersion = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const { versionId } = req.body;
    const prompt = await approvalService.approveVersion(req.params.id, versionId, userId);
    res.status(200).json(new ApiResponse(200, prompt, 'Version approved'));
  });

  testPrompt = catchAsync(async (req: Request, res: Response) => {
    const { content, variables } = req.body;
    const result = await promptTestingService.testPrompt(content, variables);
    res.status(200).json(new ApiResponse(200, result, 'Test execution completed'));
  });

  extractVariables = catchAsync(async (req: Request, res: Response) => {
    const { content } = req.body;
    const variables = templateService.extractVariables(content);
    res.status(200).json(new ApiResponse(200, variables, 'Variables extracted'));
  });
}

export const promptManagementController = new PromptManagementController();
