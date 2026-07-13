# Enterprise Communication Administration Dashboard & Operations Center

## 1. Folder Tree

```text
frontend/src/features/communication-admin/
├── components/
│   ├── AnnouncementOverview.tsx
│   ├── CalendarOverview.tsx
│   ├── CommunicationKPIs.tsx
│   ├── ConfigurationCenter.tsx
│   ├── DeliveryOverview.tsx
│   ├── MessagingOverview.tsx
│   ├── NotificationOverview.tsx
│   ├── PlatformOverview.tsx
│   ├── ReminderOverview.tsx
│   └── SystemAlerts.tsx
├── hooks/
│   └── useCommunicationAdmin.ts
└── pages/
    └── CommunicationAdminDashboardPage.tsx

backend/src/
├── controllers/
│   └── communicationAdmin.controller.ts
├── repositories/
│   └── communicationAdmin.repository.ts
├── routes/
│   └── communicationAdmin.routes.ts
└── services/
    └── admin/
        └── operations.service.ts
```

## 2. Architecture

- **High-Level Abstraction**: The `CommunicationAdminController` aggregates data across `Notifications`, `Messages`, `Workspaces`, and `Reminders` without exposing PII. It utilizes `SUPER_ADMIN` and `ADMIN` roles exclusively.
- **Dynamic Configuration**: Exposes a `.put('/configuration')` endpoint allowing admins to throttle messaging limits, update cache lifetimes, and manage active `SystemAlerts`.
- **Frontend Dashboard**: `CommunicationAdminDashboardPage` provides a comprehensive split-tab layout bridging Analytics metrics with live Administrative overrides (e.g., Configuration Center, Delivery Monitoring).

## 3. Acceptance Checklist

- [x] Secured routes under high-level `ADMIN` tier.
- [x] Generated `communicationAdminRepository` for global metrics aggregation.
- [x] Set up `CommunicationAdminDashboardPage` tabbed navigation format.
- [x] Implemented `PlatformOverview` mapping out key KPIs (Delivery Health, Queue size, etc.).
- [x] Exported empty UI stubs for fine-grained component details.
