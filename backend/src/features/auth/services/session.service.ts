import { Types } from 'mongoose';
import { LoginSession } from '../../../models/loginSession.model';
import { Request } from 'express';

// Use built-in parsing since ua-parser-js / request-ip are not guaranteed
function parseUserAgent(ua: string | undefined): { device: string; browser: string; platform: string } {
  if (!ua) return { device: 'Unknown', browser: 'Unknown', platform: 'Unknown' };
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const isChrome = /Chrome/i.test(ua);
  const isFirefox = /Firefox/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !isChrome;
  const browser = isChrome ? 'Chrome' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : 'Unknown';
  const platform = /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Unknown';
  return { device: isMobile ? 'Mobile' : 'Desktop', browser, platform };
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

export class SessionService {
  /**
   * Creates a new LoginSession document in the database
   */
  static async createSession(userId: string, req: Request): Promise<string> {
    const ua = req.headers['user-agent'];
    const { device, browser, platform } = parseUserAgent(ua);
    const ip = getClientIp(req);

    const session = await LoginSession.create({
      userId: new Types.ObjectId(userId),
      device,
      browser,
      platform,
      ip,
      active: true,
      loginAt: new Date(),
      lastActivity: new Date()
    });

    return session._id.toString();
  }

  /**
   * Updates the lastActivity timestamp of a session
   */
  static async updateActivity(sessionId: string): Promise<void> {
    await LoginSession.updateOne(
      { _id: new Types.ObjectId(sessionId) },
      { $set: { lastActivity: new Date() } }
    );
  }

  /**
   * Ends a specific session
   */
  static async endSession(sessionId: string): Promise<void> {
    await LoginSession.updateOne(
      { _id: new Types.ObjectId(sessionId) },
      { 
        $set: { 
          active: false,
          logoutAt: new Date()
        } 
      }
    );
  }

  /**
   * Ends all active sessions for a user
   */
  static async endAllSessions(userId: string): Promise<void> {
    await LoginSession.updateMany(
      { userId: new Types.ObjectId(userId), active: true },
      { 
        $set: { 
          active: false,
          logoutAt: new Date()
        } 
      }
    );
  }
}
