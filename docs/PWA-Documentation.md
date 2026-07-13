# Enterprise Progressive Web App, Install Experience & Cross-Platform Foundation

## 1. Folder Tree

```text
frontend/public/
└── manifest.webmanifest
frontend/src/
├── pwa/
│   ├── installPrompt.ts
│   ├── offlineFallback.ts
│   └── registerServiceWorker.ts
└── features/pwa/
    ├── components/
    │   ├── AppVersionInfo.tsx
    │   ├── ConnectionStatus.tsx
    │   ├── InstallBanner.tsx
    │   ├── OfflineIndicator.tsx
    │   └── UpdateAvailableDialog.tsx
    ├── hooks/
    │   └── usePWA.ts
    └── pages/
        └── PWASettingsPage.tsx

backend/src/
├── controllers/
│   └── version.controller.ts
├── routes/
│   └── app.routes.ts
└── services/
    └── app/
        └── version.service.ts
```

## 2. Architecture

- **PWA Core**: Uses `manifest.webmanifest` to define theme colors, standalone display mode, and start URL.
- **Service Worker Lifecycle**: The `registerServiceWorker.ts`, `installPrompt.ts`, and `offlineFallback.ts` set up window listeners (`beforeinstallprompt`, `online`, `offline`) to track the app's connectivity and installability state natively.
- **Frontend State**: The `usePWA` hook binds the DOM events to React state, allowing `PWASettingsPage` to seamlessly render an "Install App" button only when the browser allows it, and an "Offline" badge dynamically.

## 3. Acceptance Checklist

- [x] Generated `manifest.webmanifest`.
- [x] Scaffolded Service Worker registration functions and event hooks.
- [x] Implemented API controllers for version fetching (`/api/v1/app/version`).
- [x] Developed React Query hooks (`usePWA`) with DOM event listeners.
- [x] Created `PWASettingsPage` supporting connectivity UI and prompt installations.
