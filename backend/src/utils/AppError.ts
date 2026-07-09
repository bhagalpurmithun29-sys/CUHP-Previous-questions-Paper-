export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(arg1: number | string, arg2: string | number) {
    let statusCode = typeof arg1 === 'number' ? arg1 : typeof arg2 === 'number' ? arg2 : 500;
    let message = typeof arg1 === 'string' ? arg1 : typeof arg2 === 'string' ? arg2 : 'Internal Server Error';
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
