import { Types } from 'mongoose';
import { UserRole } from '../../../enums/auth.enum';

export interface IJwtPayload {
  userId: string;
  role: UserRole;
  tokenVersion: number;
  sessionId: string;
}

export interface IDecodedToken extends IJwtPayload {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthUser {
  id: string;
  role: UserRole;
  tokenVersion: number;
  sessionId: string;
}
