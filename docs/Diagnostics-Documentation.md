# Enterprise Device Diagnostics, Compatibility Validation & Platform Health Assessment Platform

## 1. Folder Tree

```text
frontend/src/features/device-diagnostics/
├── components/
│   ├── BrowserCapabilities.tsx
│   ├── CameraDiagnostics.tsx
│   ├── CompatibilityReport.tsx
│   ├── MicrophoneDiagnostics.tsx
│   ├── NetworkDiagnostics.tsx
│   ├── OfflineDiagnostics.tsx
│   ├── PWADiagnostics.tsx
│   ├── StorageDiagnostics.tsx
│   ├── SystemOverview.tsx
│   └── WebAuthnDiagnostics.tsx
├── hooks/
│   └── useDeviceDiagnostics.ts
└── pages/
    └── DeviceDiagnosticsPage.tsx

backend/src/
├── controllers/
│   └── diagnostics.controller.ts
├── repositories/
│   └── diagnostics.repository.ts
├── routes/
│   └── diagnostics.routes.ts
└── services/
    └── device-diagnostics/
        ├── compatibility.service.ts
        └── platformHealth.service.ts
```

## 2. Architecture

- **Capability Sniffing**: Uses standard web APIs like `navigator.onLine`, `'serviceWorker' in navigator`, and `window.matchMedia('(display-mode: standalone)')` inside the UI lifecycle.
- **Reporting Loop**: `DeviceDiagnosticsPage` asynchronously probes the client, packaging an object containing booleans for critical features (IndexedDB, PushApi), and posts it to `/api/v1/diagnostics/report`.
- **RBAC Segmentation**: The `diagnostics.routes.ts` file ensures only Administrative roles can view aggregated compatibility matrices across the fleet.

## 3. Acceptance Checklist

- [x] Generated standard REST controllers for capability aggregation.
- [x] Built the `DeviceDiagnosticsPage` capturing local environment variables.
- [x] Implemented `SystemOverview` visualizing PWA status and IndexedDB.
- [x] Created `useDeviceDiagnostics` hooking into reporting APIs.
- [x] Exported stubs for Camera, Microphone, and WebAuthn checks.
