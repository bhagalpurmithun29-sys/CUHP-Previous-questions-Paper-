# Enterprise Mobile Administration Tools, Device Fleet Management & Remote Operations Platform

## 1. Folder Tree

```text
frontend/src/features/mobile-admin/
├── components/
│   ├── CrashReportsPlaceholder.tsx
│   ├── DeviceHealthOverview.tsx
│   ├── FleetOverview.tsx
│   ├── MaintenanceMode.tsx
│   ├── MobileFeatureFlags.tsx
│   ├── MobilePolicies.tsx
│   ├── PWADeploymentStatus.tsx
│   ├── RemoteConfiguration.tsx
│   └── VersionRollout.tsx
├── hooks/
│   └── useMobileAdministration.ts
└── pages/
    └── MobileAdminDashboardPage.tsx

backend/src/
├── controllers/
│   └── mobileAdmin.controller.ts
├── repositories/
│   └── mobileAdmin.repository.ts
├── routes/
│   └── mobileAdmin.routes.ts
└── services/
    └── mobile-admin/
        ├── fleetMonitoring.service.ts
        ├── mobilePolicy.service.ts
        └── remoteConfiguration.service.ts
```

## 2. Architecture

- **Remote Operations**: Administrators can toggle feature flags (e.g. `voiceAi`) and enforce storage quotas without redeploying the app, via `RemoteConfigurationService` mapping changes instantly to the global `MobileAdminRepository`.
- **Health Indicators**: `MobileAdminDashboardPage` injects a sticky system health badge populated via `fleetMonitoringService`, providing real-time visibility into the Offline Synchronization backend queue health.
- **Role Validation**: Enforced strict `SUPER_ADMIN` / `ADMIN` isolation within the `mobileAdmin.routes.ts`.

## 3. Acceptance Checklist

- [x] Generated Backend REST controllers handling policies and feature flags.
- [x] Implemented `MobileAdminRepository` capturing platform-wide PWA statuses.
- [x] Built the `MobileAdminDashboardPage` spanning fleet overview panels.
- [x] Created `useMobileAdministration` hook tracking config mutations.
- [x] Exported stubs for Maintenance Mode and Version Rollouts.
