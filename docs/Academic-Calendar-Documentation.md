# Enterprise Academic Calendar, Events & University Scheduling Platform

## 1. Folder Tree

```text
frontend/src/features/calendar/
├── components/
│   ├── CalendarFilters.tsx
│   ├── CalendarView.tsx
│   ├── DayView.tsx
│   ├── EventCard.tsx
│   ├── EventEditor.tsx
│   ├── ICSManager.tsx
│   ├── MonthView.tsx
│   ├── ReminderSettings.tsx
│   ├── UpcomingEvents.tsx
│   └── WeekView.tsx
├── hooks/
│   └── useAcademicCalendar.ts
└── pages/
    ├── AcademicCalendarPage.tsx
    └── EventDetailsPage.tsx

backend/src/
├── controllers/
│   └── calendar.controller.ts
├── models/
│   └── CalendarEvent.model.ts
├── repositories/
│   └── calendar.repository.ts
├── routes/
│   └── calendar.routes.ts
└── services/
    └── calendar/
        ├── event.service.ts
        ├── ics.service.ts
        └── schedule.service.ts
```

## 2. Architecture

- **Event Engine**: The `CalendarEvent` model natively supports `isRecurring` logic, multiple `reminders`, timezone settings, and targets like `Departments` and `Courses` for RBAC-filtered event broadcasting.
- **Interoperability**: The `IcsService` enables standard `.ics` exports to easily sync academic schedules with Google Calendar or Apple Calendar.
- **UI Architecture**: `AcademicCalendarPage` dynamically loads events using React Query. `MonthView` calculates the appropriate layout grid dynamically to place events on their respective days.

## 3. Acceptance Checklist

- [x] Generated CalendarEvent Data Model
- [x] Built Event and ICS Services
- [x] Created Calendar Controller and Routes
- [x] Implemented React Query hooks (`useAcademicCalendar`)
- [x] Built the central `AcademicCalendarPage` and `MonthView` grid
- [x] Exported empty UI stubs for secondary calendar views (WeekView, DayView, etc.)
