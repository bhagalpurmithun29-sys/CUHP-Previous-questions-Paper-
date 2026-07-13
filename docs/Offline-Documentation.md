# Enterprise Offline Mode, Intelligent Data Synchronization & Conflict Resolution Platform

## 1. Folder Tree

```text
frontend/src/features/offline/
├── components/
│   ├── ConflictResolution.tsx
│   ├── OfflineMessages.tsx
│   ├── OfflineQueue.tsx
│   ├── OfflineRepository.tsx
│   ├── OfflineTasks.tsx
│   ├── StorageUsage.tsx
│   ├── SyncHistory.tsx
│   └── SyncStatus.tsx
├── hooks/
│   └── useOfflineSync.ts
└── pages/
    └── OfflineDashboardPage.tsx

backend/src/
├── controllers/
│   └── sync.controller.ts
├── repositories/
│   └── sync.repository.ts
├── routes/
│   └── sync.routes.ts
└── services/
    └── offline/
        ├── conflictResolution.service.ts
        └── sync.service.ts
```

## 2. Architecture

- **Sync Pipeline**: `SyncService` receives queued `offlineActions` from the frontend (which internally uses IndexedDB). It sequentially replays these actions, logging conflicts.
- **Conflict Strategy**: `ConflictResolutionService` defaults to a `Timestamp-based (Last-Write-Wins)` strategy between `clientData` and `serverData`. Unresolvable conflicts are returned to the user.
- **Frontend Dashboard**: `OfflineDashboardPage` consolidates all offline functionality (Storage usage, local tasks, conflict merging), providing a manual "Sync Now" trigger via `useOfflineSync`.

## 3. Acceptance Checklist

- [x] Defined `POST /sync/start` and associated sync replay endpoints.
- [x] Generated `ConflictResolutionService`.
- [x] Built the `OfflineDashboardPage` providing visual status checks.
- [x] Exported empty UI stubs for storage and offline queue specifics.
- [x] Integrated logic alongside existing auth models (sync is constrained per-user context).
