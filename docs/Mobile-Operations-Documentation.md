# Enterprise Mobile Operations Dashboard, Monitoring & Incident Management Platform

## 1. Folder Tree

```text
frontend/src/features/mobile-operations/
├── components/
│   ├── BackgroundSyncHealth.tsx
│   ├── DeviceCompatibilityOverview.tsx
│   ├── IncidentCenter.tsx
│   ├── OfflineSyncHealth.tsx
│   ├── OperationalAlerts.tsx
│   ├── PWAHealth.tsx
│   ├── PlatformHealthOverview.tsx
│   ├── PushNotificationHealth.tsx
│   ├── ServiceStatus.tsx
│   └── VersionAdoptionDashboard.tsx
├── hooks/
│   └── useMobileOperations.ts
└── pages/
    └── MobileOperationsDashboardPage.tsx

backend/src/
├── controllers/
│   └── mobileOperations.controller.ts
├── repositories/
│   └── mobileOperations.repository.ts
├── routes/
│   └── mobileOperations.routes.ts
└── services/
    └── mobile-operations/
        ├── incidentManagement.service.ts
        ├── operationsMonitoring.service.ts
        └── platformHealth.service.ts
```

## 2. Architecture

- **Incident State Tracking**: The platform incorporates the `IncidentManagementService` to track outages and severe synchronization anomalies natively within the CUHP system.
- **Service Monitoring**: Maps out component-level health (e.g. Offline Sync vs Push Delivery) via the `PlatformHealthService`, surfaced on the dashboard via `ServiceStatus`.
- **Role Permissions**: Accessible exclusively to `OPERATIONS`, `SUPER_ADMIN`, and `ADMIN` users to protect telemetry metrics from exposure to standard students or faculty.

## 3. Acceptance Checklist

- [x] Generated standard REST controllers for Operational SLA metrics and Incident creation.
- [x] Built the `MobileOperationsDashboardPage` featuring top-level KPI scorecards.
- [x] Implemented `PlatformHealthOverview` and `IncidentCenter` visual interfaces.
- [x] Created `useMobileOperations` bridging mutations for incident escalation.
- [x] Exported stubs for Background Sync bounds, Web Push tracking, and Version Adoption matrices.
