import { Request, Response } from 'express';
import { PasswordResetService } from '../services/password-reset.service';
import { ForgotPasswordRequestDTO, ResetPasswordRequestDTO } from '../dtos/password-reset.dto';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';

export class PasswordResetController {
  /**
   * @route   POST /api/v1/auth/forgot-password
   * @desc    Request a password reset link
   * @access  Public
   */
  static forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const dto: ForgotPasswordRequestDTO = req.body;
    const ipAddress = req.ip || 'unknown';

    const result = await PasswordResetService.requestPasswordReset(dto, ipAddress);

    sendResponse({
      res,
      statusCode: 200,
      message: result.message,
      data: { success: result.success }
    });
  });

  /**
   * @route   POST /api/v1/auth/reset-password
   * @desc    Reset password using the secure token
   * @access  Public
   */
  static resetPassword = catchAsync(async (req: Request, res: Response) => {
    const dto: ResetPasswordRequestDTO = req.body;
    const ipAddress = req.ip || 'unknown';

    const result = await PasswordResetService.executePasswordReset(dto, ipAddress);

    sendResponse({
      res,
      statusCode: 200,
      message: result.message,
      data: { success: result.success }
    });
  });
}
