# Enterprise Push Notifications, Background Sync & Mobile Event Delivery Platform

## 1. Folder Tree

```text
frontend/src/features/push/
├── components/
│   ├── BackgroundSyncStatus.tsx
│   ├── DeepLinkTester.tsx
│   ├── DeliveryPreferences.tsx
│   ├── NotificationHistory.tsx
│   ├── NotificationPreview.tsx
│   ├── PermissionManager.tsx
│   └── SubscriptionManager.tsx
├── hooks/
│   └── usePushNotifications.ts
└── pages/
    └── PushNotificationSettingsPage.tsx

backend/src/
├── controllers/
│   └── push.controller.ts
├── repositories/
│   └── pushNotification.repository.ts
├── routes/
│   └── push.routes.ts
└── services/
    └── push/
        ├── backgroundSync.service.ts
        ├── delivery.service.ts
        └── pushSubscription.service.ts
```

## 2. Architecture

- **`usePushNotifications`**: Exposes Web API `Notification.requestPermission()` to standard React Query states, making browser-level permissions easily digestible for UI components. It abstracts FCM/VAPID key subscriptions into simple mutations.
- **`DeliveryService`**: Dispatches structured payloads (including Deep Link `url` values) via the standard web push protocol, looping over all endpoints stored in `pushNotificationRepository` for a given `userId`.
- **`PushNotificationSettingsPage`**: Unified dashboard to test device-level deliveries and observe subscription statuses, heavily restricting sending until explicitly allowed by the user (`permissionStatus === 'granted'`).

## 3. Acceptance Checklist

- [x] Generated Push backend controllers (`subscribe`, `unsubscribe`, `test`).
- [x] Scaffolded Background Sync and Delivery logic endpoints.
- [x] Created custom frontend hook mapping `Notification.permission` to UI state.
- [x] Built the Settings Page with proper guardrails avoiding silent failures.
- [x] Exported stubs for Deep Link mapping and Subscription tables.
