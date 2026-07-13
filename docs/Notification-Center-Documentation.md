# Enterprise Notification Center & Multi-Channel Delivery

## 1. Folder Tree

```text
frontend/src/features/notifications/
├── components/
│   ├── NotificationBell.tsx
│   ├── NotificationCard.tsx
│   ├── NotificationFilters.tsx
│   ├── NotificationHistory.tsx
│   ├── NotificationList.tsx
│   ├── NotificationPreferences.tsx
│   └── UnreadCounter.tsx
├── hooks/
│   └── useNotifications.ts
└── pages/
    └── NotificationCenterPage.tsx

backend/src/
├── controllers/
│   └── notification.controller.ts
├── models/
│   ├── Notification.model.ts (Updated/Existing)
│   └── NotificationPreference.model.ts
├── repositories/
│   └── notification.repository.ts
├── routes/
│   └── notification.routes.ts
└── services/
    └── notifications/
        ├── delivery.service.ts
        ├── notification.service.ts
        ├── preference.service.ts
        └── queueWorker.service.ts
```

## 2. Architecture

- **Data Models**: Employs `Notification` for storing actual alerts and `NotificationPreference` for storing delivery channels (`inApp`, `email`, `push`). Opt-out categories prevent noise for users.
- **Queue Worker Architecture**: Notifications are decoupled from direct sync requests. When a module triggers an event (e.g. Paper Uploaded), it pushes to the `QueueWorkerService`, which independently resolves user preferences and determines which `DeliveryService` channels to invoke.
- **Real-Time Polling**: The frontend uses `useNotifications` to poll for the `unreadCount` every 30 seconds to power the `NotificationBell`.
- **Channels**: In-App acts as the primary record of truth. Email and Push are supported as external delivery channels (implemented as placeholders for external integrations like SendGrid or Firebase).

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: Notification Center API
  version: 1.0.0
paths:
  /api/v1/notifications:
    get:
      summary: Retrieve a paginated list of notifications for the authenticated user.
      parameters:
        - in: query
          name: unreadOnly
          schema: { type: boolean }
        - in: query
          name: archived
          schema: { type: boolean }
  /api/v1/notifications/unread-count:
    get:
      summary: Get the unread notification count to populate the bell counter.
  /api/v1/notifications/read-all:
    put:
      summary: Mark all unread notifications as read.
  /api/v1/notifications/{id}/read:
    put:
      summary: Mark a specific notification as read.
  /api/v1/notifications/{id}/archive:
    put:
      summary: Move a notification to the archived state.
  /api/v1/notifications/{id}:
    delete:
      summary: Permanently delete a notification.
  /api/v1/notifications/preferences:
    get:
      summary: Retrieve the user's delivery preferences.
    put:
      summary: Update delivery preferences (Email, Push, In-App).
```

## 4. Acceptance Checklist

- [x] Implemented Multi-channel Preference Models and Delivery Services.
- [x] Generated Backend REST APIs mapped to the Notification Controller.
- [x] Built the `NotificationCenterPage` layout.
- [x] Integrated `NotificationBell` with background polling.
- [x] Added `NotificationFilters` (All, Unread, Archived).
- [x] Implemented `NotificationPreferences` toggle panel for channel management.
- [x] Simulated background Queue Worker service for dispatching.
- [x] Secured routes restricting access to only the authenticated user's data.
- [x] Created `docs/Notification-Center-Documentation.md`.
