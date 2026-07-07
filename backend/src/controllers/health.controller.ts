import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';

export const healthCheck = (req: Request, res: Response) => {
  return res.status(200).json(new ApiResponse(200, { uptime: process.uptime() }, 'Server is healthy'));
};
