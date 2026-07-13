# Enterprise Communication Analytics, Collaboration Intelligence & Engagement Platform

## 1. Folder Tree

```text
frontend/src/features/communication-analytics/
├── components/
│   ├── AnnouncementAnalytics.tsx
│   ├── CalendarAnalytics.tsx
│   ├── CollaborationMetrics.tsx
│   ├── DepartmentReports.tsx
│   ├── ExecutiveDashboard.tsx
│   ├── ExportReports.tsx
│   ├── MessagingAnalytics.tsx
│   ├── NotificationAnalytics.tsx
│   ├── OverviewCards.tsx
│   └── ReminderAnalytics.tsx
├── hooks/
│   └── useCommunicationAnalytics.ts
└── pages/
    └── CommunicationAnalyticsDashboard.tsx

backend/src/
├── controllers/
│   └── communicationAnalytics.controller.ts
├── repositories/
│   └── communicationAnalytics.repository.ts
├── routes/
│   └── communicationAnalytics.routes.ts
└── services/
    └── analytics/
        ├── engagement.service.ts
        └── reporting.service.ts
```

## 2. Architecture

- **Data Aggregation**: The backend `communicationAnalyticsRepository` acts as an aggregation layer over existing data stores (`Notification`, `Reminder`, `Task`, `Message`) to produce privacy-aware metrics.
- **Reporting Services**: `EngagementAnalyticsService` applies Date range and demographic filters without retrieving PII (Personally Identifiable Information).
- **Frontend Layer**: `CommunicationAnalyticsDashboard` is heavily reliant on fetching bulk summarized metrics. The UI focuses on high-level KPIs (`OverviewCards`) and supports CSV/PDF Export functionality.

## 3. Acceptance Checklist

- [x] Implemented API controllers for cross-platform analytics retrieval.
- [x] Defined RBAC (`SUPER_ADMIN`, `ADMIN`, `MODERATOR`) on the Analytics routes.
- [x] Developed React Query hooks (`useCommunicationAnalytics`).
- [x] Created `OverviewCards` to digest key insights.
- [x] Scaffolding ready for `Recharts`-based data visualizations.
