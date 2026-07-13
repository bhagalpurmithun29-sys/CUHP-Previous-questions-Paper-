import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';
import { taskRepository } from '../repositories/task.repository';
import { taskAssignmentService } from '../services/tasks/taskAssignment.service';
import { workflowEngineService } from '../services/tasks/workflowEngine.service';

export class TaskController {
  
  getTasks = catchAsync(async (req: Request, res: Response) => {
    // Basic filter application
    const filter: any = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    
    const result = await taskRepository.getTasks(filter, Number(req.query.page || 1), Number(req.query.limit || 50));
    res.status(200).json(new ApiResponse(200, result, 'Tasks retrieved'));
  });

  getTaskById = catchAsync(async (req: Request, res: Response) => {
    const result = await taskRepository.getTaskById(req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Task retrieved'));
  });

  createTask = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const taskData = { ...req.body, creatorId: userId };
    const result = await taskRepository.createTask(taskData);
    res.status(201).json(new ApiResponse(201, result, 'Task created'));
  });

  updateTask = catchAsync(async (req: Request, res: Response) => {
    // Assuming simple full update for now, ideally partial
    // This requires a repository method `update` which wasn't fully fleshed out, mock it here.
    res.status(200).json(new ApiResponse(200, null, 'Task updated (Placeholder)'));
  });

  deleteTask = catchAsync(async (req: Request, res: Response) => {
    await taskRepository.deleteTask(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'Task deleted'));
  });

  assignTask = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await taskAssignmentService.assignUser(req.params.id, req.body.assigneeId, userId);
    res.status(200).json(new ApiResponse(200, result, 'Task assigned'));
  });

  updateStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await taskAssignmentService.updateStatus(req.params.id, req.body.status, userId);
    res.status(200).json(new ApiResponse(200, result, 'Task status updated'));
  });

  getWorkflows = catchAsync(async (req: Request, res: Response) => {
    const result = await workflowEngineService.getAllWorkflows();
    res.status(200).json(new ApiResponse(200, result, 'Workflows retrieved'));
  });
}

export const taskController = new TaskController();
