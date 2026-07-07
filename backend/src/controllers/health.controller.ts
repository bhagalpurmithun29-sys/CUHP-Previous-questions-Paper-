import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { sendResponse } from '../utils/ApiResponse';

export const healthCheck = (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  sendResponse({
    res,
    statusCode: 200,
    message: 'Health check passed',
    data: {
      status: 'success',
      version: '1.0.0',
      serverTime: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development'
    }
  });
};
