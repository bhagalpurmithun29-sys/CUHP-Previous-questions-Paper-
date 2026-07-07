import { Types } from 'mongoose';
import { LoginSession } from '../../../models/loginSession.model';
import { Request } from 'express';
import useragent from 'useragent'; // Assuming this gets added later
import requestIp from 'request-ip'; // Assuming this gets added later

export class SessionService {
  /**
   * Creates a new LoginSession document in the database
   */
  static async createSession(userId: string, req: Request): Promise<string> {
    const agent = useragent.parse(req.headers['user-agent']);
    const ip = requestIp.getClientIp(req) || 'unknown';

    const session = await LoginSession.create({
      userId: new Types.ObjectId(userId),
      device: agent.device.toString(),
      browser: agent.toAgent(),
      platform: agent.os.toString(),
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
