# Enterprise Reminder, Scheduling Automation & Intelligent Event Orchestration Platform

## 1. Folder Tree

```text
frontend/src/features/reminders/
├── components/
│   ├── DeliveryHistory.tsx
│   ├── EscalationRules.tsx
│   ├── RecurringRules.tsx
│   ├── ReminderEditor.tsx
│   ├── ReminderList.tsx
│   ├── ReminderTemplates.tsx
│   ├── ScheduleBuilder.tsx
│   └── UserPreferences.tsx
├── hooks/
│   └── useReminders.ts
└── pages/
    └── ReminderDashboardPage.tsx

backend/src/
├── controllers/
│   └── reminder.controller.ts
├── models/
│   └── Reminder.model.ts
├── repositories/
│   └── reminder.repository.ts
├── routes/
│   └── reminder.routes.ts
└── services/
    └── reminders/
        └── reminder.service.ts
```

## 2. Architecture

- **Engine Core**: The `Reminder` model holds definitions for background scheduling execution. It handles `escalationLevel`s, `snooze` states, and supports targeting by `targetUserId`.
- **Scheduler Worker**: A queue worker (implementation to be expanded with Redis/BullMQ) continuously polls for `SCHEDULED` reminders where `scheduledTime <= now`.
- **Frontend Actions**: `ReminderList` dynamically renders actionable reminders supporting inline `snooze` and `mark done` mutations via React Query to immediately re-sync data.

## 3. Acceptance Checklist

- [x] Built the `Reminder` Mongoose Model supporting Snooze, Escalate, and Delivery methods.
- [x] Generated `reminderRepository` and `reminderService` for CRUD operations.
- [x] Designed API endpoints and REST `ReminderController`.
- [x] Implemented React frontend with a functional `ReminderDashboardPage` and `ReminderList`.
- [x] Exposed `useReminders` hook for data fetching and status mutation.
