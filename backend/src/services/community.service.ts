import { User } from '../models/user.model';
import { ActivityLog } from '../models/activityLog.model';

export const BadgeThresholds = {
  Bronze: 100,
  Silver: 500,
  Gold: 1000,
  Platinum: 2500,
  Diamond: 5000,
  Legend: 10000
};

export class CommunityService {
  async getLeaderboard(type: string, limit: number = 20) {
    // Currently fetches Overall Leaderboard.
    // In future, filtering by Department/Course/Time can be done using aggregations on ActivityLogs or User fields.
    const query: any = { isDeleted: false, contributionScore: { $gt: 0 } };
    
    if (type === 'moderator') {
      query.role = 'MODERATOR';
    }

    const users = await User.find(query)
      .sort({ contributionScore: -1 })
      .limit(limit)
      .select('firstName lastName avatarUrl contributionScore badges achievements department course')
      .populate('department', 'name')
      .populate('course', 'name')
      .lean();

    return users.map((u: any, index) => ({
      ...u,
      rank: index + 1
    }));
  }

  async getHallOfFame() {
    const topContributors = await this.getLeaderboard('overall', 3);
    const topModerators = await this.getLeaderboard('moderator', 3);

    return {
      topContributors,
      topModerators
    };
  }

  async getPublicProfile(userId: string) {
    const user = await User.findOne({ _id: userId, isDeleted: false })
      .select('firstName lastName avatarUrl contributionScore badges achievements role department course createdAt')
      .populate('department', 'name')
      .populate('course', 'name')
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    // Fetch public contribution timeline
    const timeline = await ActivityLog.find({ userId: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('action entityType createdAt')
      .lean();

    return {
      user,
      timeline
    };
  }

  async awardPoints(userId: string, points: number, action: string, entityId: string) {
    const user = await User.findById(userId);
    if (!user) return;

    // Check if points already awarded for this specific action to prevent duplicates
    // This depends on ActivityLog or a specific PointsLedger
    const existingLog = await ActivityLog.findOne({ userId, action, entityId });
    if (existingLog) return; // Points already awarded

    user.contributionScore += points;

    // Recalculate Badges
    const newBadges: string[] = [];
    if (user.contributionScore >= BadgeThresholds.Legend) newBadges.push('Legend');
    else if (user.contributionScore >= BadgeThresholds.Diamond) newBadges.push('Diamond');
    else if (user.contributionScore >= BadgeThresholds.Platinum) newBadges.push('Platinum');
    else if (user.contributionScore >= BadgeThresholds.Gold) newBadges.push('Gold');
    else if (user.contributionScore >= BadgeThresholds.Silver) newBadges.push('Silver');
    else if (user.contributionScore >= BadgeThresholds.Bronze) newBadges.push('Bronze');

    if (newBadges.length > 0) {
      user.badges = newBadges;
    }

    await user.save({ validateBeforeSave: false });

    // Log the action
    await ActivityLog.create({
      userId,
      action,
      entityId,
      entityType: 'Reward',
      newValue: { pointsAwarded: points }
    });

    return user;
  }
}

export const communityService = new CommunityService();
