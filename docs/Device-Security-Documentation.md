# Enterprise Mobile Authentication, Device Management & Trusted Device Security Platform

## 1. Folder Tree

```text
frontend/src/features/device-security/
├── components/
│   ├── ActiveSessions.tsx
│   ├── BiometricSetup.tsx
│   ├── DeviceDetails.tsx
│   ├── DeviceNotificationSettings.tsx
│   ├── LoginHistory.tsx
│   ├── SecurityAlerts.tsx
│   ├── SessionRevocation.tsx
│   └── TrustedDevices.tsx
├── hooks/
│   └── useDeviceSecurity.ts
└── pages/
    └── DeviceSecurityPage.tsx

backend/src/
├── controllers/
│   └── device.controller.ts
├── repositories/
│   └── device.repository.ts
├── routes/
│   └── device.routes.ts
└── services/
    └── device-security/
        ├── sessionManagement.service.ts
        ├── trustedDevice.service.ts
        └── webauthn.service.ts
```

## 2. Architecture

- **Session Management**: `SessionManagementService` tracks active sessions mapped to a `userId`. Users can revoke individual external sessions or globally wipe out all "other" sessions natively.
- **WebAuthn Integration**: `WebAuthnService` stubs the FIDO2 compliant flow. The backend handles generating `challenge` parameters, while the `useDeviceSecurity` hook connects them to the browser's native `navigator.credentials.create()` API for biometric binding (FaceID, TouchID).
- **Device Security Dashboard**: The `DeviceSecurityPage` offers tabs spanning active sessions, login histories, and biometrics, providing an interactive `ActiveSessions` block directly parsing the device, browser, and geographic approximate of current connections.

## 3. Acceptance Checklist

- [x] Generated Backend REST controllers parsing Device and Session operations natively.
- [x] Implemented `SessionManagementService` with multi-session revocation logic.
- [x] Built the `DeviceSecurityPage` featuring an `ActiveSessions` dashboard.
- [x] Created `useDeviceSecurity` hook tying WebAuthn bindings to TanStack Query.
- [x] Exported stubs for granular Trust / Login History reporting.
