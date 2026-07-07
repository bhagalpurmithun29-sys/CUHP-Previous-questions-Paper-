import { Response } from 'express';

interface ApiResponseParams<T> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
  pagination,
}: ApiResponseParams<T>) => {
  const success = statusCode >= 200 && statusCode < 300;
  
  res.status(statusCode).json({
    success,
    message,
    data: data || null,
    errors: null,
    pagination,
    timestamp: new Date().toISOString(),
    // requestId could be added via a middleware
  });
};
