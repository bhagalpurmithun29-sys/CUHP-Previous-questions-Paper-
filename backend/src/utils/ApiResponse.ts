import { Response } from 'express';

export class ApiResponse<T> {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public data: T | null;

  constructor(statusCode: number, data: T | null, message = 'Success') {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

/**
 * Utility helper to send a structured API response.
 * Supports both object-style: sendResponse({ res, statusCode, data, message })
 * and positional-style: sendResponse(res, statusCode, data, message)
 */
export function sendResponse<T>(
  resOrOptions: Response | { res: Response; statusCode: number; data?: T | null; message?: string },
  statusCode?: number,
  data?: T | null,
  message?: string
): void {
  if (resOrOptions && typeof resOrOptions === 'object' && 'res' in resOrOptions) {
    const opts = resOrOptions as { res: Response; statusCode: number; data?: T | null; message?: string };
    const sc = opts.statusCode;
    opts.res.status(sc).json(new ApiResponse<T>(sc, opts.data ?? null, opts.message ?? 'Success'));
  } else {
    const res = resOrOptions as Response;
    const sc = statusCode!;
    res.status(sc).json(new ApiResponse<T>(sc, data ?? null, message ?? 'Success'));
  }
}
