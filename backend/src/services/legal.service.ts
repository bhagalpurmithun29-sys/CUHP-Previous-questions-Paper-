import { LegalPolicy, PolicyType } from '../models/legalPolicy.model';
import { UserConsent } from '../models/userConsent.model';
import { AppError } from '../utils/AppError';

export class LegalService {
  async getPublishedPolicies() {
    // Get latest published version for each policy type
    return await LegalPolicy.aggregate([
      { $match: { isPublished: true } },
      { $sort: { publishedAt: -1 } },
      { $group: {
          _id: '$type',
          policy: { $first: '$$ROOT' }
        }
      },
      { $replaceRoot: { newRoot: '$policy' } }
    ]);
  }

  async getPolicyBySlug(slug: string) {
    const policy = await LegalPolicy.findOne({ slug, isPublished: true })
      .sort({ publishedAt: -1 });
    
    if (!policy) throw new AppError('Policy not found', 404);
    return policy;
  }

  async saveUserConsent(data: any, ipAddress?: string, userAgent?: string) {
    const { userId, guestId, consents } = data;

    if (!userId && !guestId) {
      throw new AppError('Either userId or guestId must be provided', 400);
    }

    const consentQuery = userId ? { userId } : { guestId };
    
    let userConsent = await UserConsent.findOne(consentQuery);

    if (!userConsent) {
      userConsent = new UserConsent({
        userId,
        guestId,
        consents: [],
        ipAddress,
        userAgent
      });
    }

    // Upsert consents
    for (const newConsent of consents) {
      const existingIdx = userConsent.consents.findIndex(
        c => c.policyType === newConsent.policyType && c.policyVersion === newConsent.policyVersion
      );

      if (existingIdx >= 0) {
        userConsent.consents[existingIdx].accepted = newConsent.accepted;
        userConsent.consents[existingIdx].timestamp = new Date();
      } else {
        userConsent.consents.push({
          policyType: newConsent.policyType,
          policyVersion: newConsent.policyVersion,
          accepted: newConsent.accepted,
          timestamp: new Date()
        });
      }
    }

    await userConsent.save();
    return userConsent;
  }

  async getUserConsent(userId?: string, guestId?: string) {
    if (!userId && !guestId) return null;
    const consentQuery = userId ? { userId } : { guestId };
    return await UserConsent.findOne(consentQuery);
  }

  // Admin CMS methods
  async createPolicy(data: any, userId: string) {
    const policy = await LegalPolicy.create({
      ...data,
      createdBy: userId,
      publishedAt: data.isPublished ? new Date() : undefined
    });
    return policy;
  }
}

export const legalService = new LegalService();
