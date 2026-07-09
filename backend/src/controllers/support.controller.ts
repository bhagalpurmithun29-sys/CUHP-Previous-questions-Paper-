import { Request, Response } from 'express';
import { supportService } from '../services/support.service';
import { catchAsync } from '../utils/catchAsync';
import { ApiResponse } from '../utils/ApiResponse';

export const createTicket = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id; // Optional if guest
  const data = await supportService.createTicket(req.body, userId);
  res.status(201).json(new ApiResponse(201, data, 'Ticket created successfully'));
});

export const getTickets = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userRole = req.user?.role;
  const data = await supportService.getTickets(req.query, userId, userRole);
  res.status(200).json(new ApiResponse(200, data, 'Tickets fetched successfully'));
});

export const getTicketById = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const userRole = req.user?.role;
  const data = await supportService.getTicketById(req.params.id, userId, userRole);
  res.status(200).json(new ApiResponse(200, data, 'Ticket fetched successfully'));
});

export const addReply = catchAsync(async (req: Request, res: Response) => {
  const data = await supportService.addReply(req.params.id, req.body, req.user);
  res.status(200).json(new ApiResponse(200, data, 'Reply added successfully'));
});

export const assignTicket = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.body.assignedTo || req.user?.id;
  const data = await supportService.assignTicket(req.params.id, adminId);
  res.status(200).json(new ApiResponse(200, data, 'Ticket assigned successfully'));
});

export const closeTicket = catchAsync(async (req: Request, res: Response) => {
  const data = await supportService.closeTicket(req.params.id);
  res.status(200).json(new ApiResponse(200, data, 'Ticket closed successfully'));
});
