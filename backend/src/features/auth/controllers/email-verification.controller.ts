import { Request, Response } from 'express';
import { EmailVerificationService } from '../services/email-verification.service';
import { ResendVerificationRequestDTO } from '../dtos/verify-email.dto';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';

export class EmailVerificationController {
  /**
   * @route   GET /api/v1/auth/verify-email?token=xyz
   * @desc    Verify a user's email address using the token sent to their inbox
   * @access  Public
   */
  static verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const rawToken = req.query.token as string;
    const ipAddress = req.ip || 'unknown';

    const result = await EmailVerificationService.verifyEmail(rawToken, ipAddress);

    sendResponse({
      res,
      statusCode: 200,
      message: result.message,
      data: { success: result.success }
    });
  });

  /**
   * @route   POST /api/v1/auth/verify-email/resend
   * @desc    Invalidate old token and resend a new verification email
   * @access  Public
   */
  static resendVerification = catchAsync(async (req: Request, res: Response) => {
    const dto: ResendVerificationRequestDTO = req.body;
    const ipAddress = req.ip || 'unknown';

    const result = await EmailVerificationService.resendVerification(dto, ipAddress);

    sendResponse({
      res,
      statusCode: 200,
      message: result.message,
      data: { success: result.success }
    });
  });
}
