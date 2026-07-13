import { CalendarEvent, ICalendarEvent } from '../models/CalendarEvent.model';

class CalendarRepository {
  async getEventsForDateRange(user: any, startDate: Date, endDate: Date) {
    const query: any = {
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
        { startDate: { $lte: startDate }, endDate: { $gte: endDate } } // Event spanning across
      ]
    };

    // Personal scope mapping
    if (user.role === 'STUDENT' || user.role === 'FACULTY') {
       query.$or = [
         { eventType: 'UNIVERSITY_EVENT' },
         { eventType: 'HOLIDAY' },
         { creatorId: user._id },
         { targetDepartments: user.department },
       ];
    }

    return CalendarEvent.find(query).sort({ startDate: 1 }).lean();
  }

  async createEvent(data: Partial<ICalendarEvent>) {
    return CalendarEvent.create(data);
  }

  async getEventById(id: string) {
    return CalendarEvent.findById(id).lean();
  }

  async updateEvent(id: string, data: Partial<ICalendarEvent>) {
    return CalendarEvent.findByIdAndUpdate(id, { $set: data }, { new: true });
  }

  async deleteEvent(id: string) {
    return CalendarEvent.findByIdAndDelete(id);
  }
}

export const calendarRepository = new CalendarRepository();
