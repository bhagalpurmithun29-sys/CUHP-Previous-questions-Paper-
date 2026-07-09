import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterRequestDTO } from '../dtos/register.dto';
import { sendResponse } from '../../../utils/ApiResponse';
import catchAsync from '../../../utils/catchAsync';
import { LoginRequestDTO } from '../dtos/login.dto';
import { CookieUtil } from '../utils/cookie.util';

export class AuthController {
  /**
   * @route   POST /api/v1/auth/register
   * @desc    Register a new user account
   * @access  Public
   */
  static register = catchAsync(async (req: Request, res: Response) => {
    const userData: RegisterRequestDTO = req.body;
    const ipAddress = req.ip || 'unknown';

    // Business logic delegated to Service layer
    const result = await AuthService.register(userData, ipAddress);

    // Standardized API Response
    sendResponse({
      res,
      statusCode: 201,
      message: result.message,
      data: {
        user: result.user,
        requiresEmailVerification: result.requiresEmailVerification
      }
    });
  });

  /**
   * @route   POST /api/v1/auth/login
   * @desc    Authenticate user and get tokens
   * @access  Public
   */
  static login = catchAsync(async (req: Request, res: Response) => {
    const loginData: LoginRequestDTO = req.body;
    
    // Business logic
    const result = await AuthService.login(loginData, req);

    // Set secure HTTP-only cookie with the refresh token
    // The access token is returned in the JSON payload (to be kept in client memory)
    // The refresh token is NEVER exposed to the frontend JS
    if (result.refreshToken) {
      CookieUtil.setRefreshCookie(res, result.refreshToken);
    }

    sendResponse({
      res,
      statusCode: 200,
      message: result.message,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      }
    });
  });

  /**
   * @route   POST /api/v1/auth/login/mfa
   * @desc    Verify MFA token to complete login
   * @access  Public
   */
  static verifyMfa = catchAsync(async (req: Request, res: Response) => {
    const { mfaToken, code, isRecovery } = req.body;
    
    // Business logic
    const result = await AuthService.verifyMfaLogin(mfaToken, code, req, isRecovery);

    CookieUtil.setRefreshCookie(res, result.refreshToken!);

    sendResponse({
      res,
      statusCode: 200,
      message: result.message,
      data: {
        user: result.user,
        accessToken: result.accessToken,
      }
    });
  });
}
