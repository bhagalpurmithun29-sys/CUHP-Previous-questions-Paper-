import { Announcement, IAnnouncement } from '../models/Announcement.model';
import { Types } from 'mongoose';

class AnnouncementRepository {
  async create(data: Partial<IAnnouncement>): Promise<IAnnouncement> {
    return Announcement.create(data);
  }

  async findById(id: string): Promise<IAnnouncement | null> {
    return Announcement.findById(id).populate('authorId', 'firstName lastName email role');
  }

  async update(id: string, data: Partial<IAnnouncement>): Promise<IAnnouncement | null> {
    return Announcement.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await Announcement.findByIdAndDelete(id);
    return res !== null;
  }

  async findForUser(user: any, filter: any = {}, page = 1, limit = 20) {
    const query: any = {
      status: 'PUBLISHED',
      ...filter
    };

    // Apply role/department filters based on user
    if (user.role !== 'SUPER_ADMIN' && user.role !== 'ADMIN') {
      const orConditions: any[] = [{ targetRoles: { $size: 0 }, targetDepartments: { $size: 0 }, targetSchools: { $size: 0 } }];
      
      orConditions.push({ targetRoles: user.role });
      
      if (user.department) orConditions.push({ targetDepartments: user.department });
      if (user.school) orConditions.push({ targetSchools: user.school });
      
      query.$or = orConditions;
    }

    const skip = (page - 1) * limit;

    const [announcements, total] = await Promise.all([
      Announcement.find(query)
        .sort({ isPinned: -1, publishAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('authorId', 'firstName lastName')
        .lean(),
      Announcement.countDocuments(query)
    ]);

    return { announcements, total, page, totalPages: Math.ceil(total / limit) };
  }

  async acknowledge(announcementId: string, userId: string): Promise<IAnnouncement | null> {
    return Announcement.findByIdAndUpdate(
      announcementId,
      {
        $addToSet: { acknowledgedBy: new Types.ObjectId(userId) },
        $inc: { readCount: 1 }
      },
      { new: true }
    );
  }

  async getScheduledAnnouncements(): Promise<IAnnouncement[]> {
    return Announcement.find({
      status: 'SCHEDULED',
      publishAt: { $lte: new Date() }
    });
  }

  async getExpiredAnnouncements(): Promise<IAnnouncement[]> {
    return Announcement.find({
      status: 'PUBLISHED',
      expireAt: { $lte: new Date() }
    });
  }
}

export const announcementRepository = new AnnouncementRepository();
