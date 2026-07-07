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
