import { calendarRepository } from '../../repositories/calendar.repository';

class EventService {
  async getEvents(user: any, query: any) {
    const startDate = query.start ? new Date(query.start as string) : new Date(new Date().setDate(1)); // Start of month default
    const endDate = query.end ? new Date(query.end as string) : new Date(new Date().setMonth(new Date().getMonth() + 1));

    return calendarRepository.getEventsForDateRange(user, startDate, endDate);
  }

  async createEvent(userId: string, data: any) {
    data.creatorId = userId;
    // In full app: validate dates, permissions, etc.
    return calendarRepository.createEvent(data);
  }

  async updateEvent(id: string, data: any) {
    return calendarRepository.updateEvent(id, data);
  }

  async deleteEvent(id: string) {
    return calendarRepository.deleteEvent(id);
  }
}

export const eventService = new EventService();
