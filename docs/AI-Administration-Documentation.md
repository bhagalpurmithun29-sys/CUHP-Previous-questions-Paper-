# Enterprise AI Administration Dashboard & Platform Operations Center

## 1. Folder Tree

```text
frontend/src/features/ai-admin/
├── components/
│   ├── ConfigurationCenter.tsx
│   ├── OperationalAlerts.tsx
│   ├── PlatformOverview.tsx
│   └── SystemStatus.tsx
├── hooks/
│   └── useAIAdministration.ts
└── pages/
    └── AIAdministrationDashboardPage.tsx

backend/src/
├── controllers/
│   └── aiAdmin.controller.ts
├── repositories/
│   └── admin.repository.ts
├── routes/
│   └── aiAdmin.routes.ts
└── services/
    └── aiAdmin/
        ├── alert.service.ts
        ├── configuration.service.ts
        ├── healthMonitoring.service.ts
        └── platformOverview.service.ts
```

*(Note: Stubs for components like `ProviderOverview`, `RAGHealth`, `GatewayHealth` were conceptually merged into `SystemStatus` and `ConfigurationCenter` to create a denser, unified operations dashboard layout).*

## 2. Architecture

- **Single Pane of Glass**: The AI Platform Operations Center aggregates metrics from the Gateway, RAG vector store, and Safety systems to provide Super Admins a unified view.
- **Polling Architecture**: The frontend `useAIAdministration` hook uses `refetchInterval: 15000` to automatically poll the `/health` and `/alerts` endpoints every 15 seconds, ensuring the dashboard functions as a live Network Operations Center (NOC) screen.
- **Dynamic Configuration Management**: The `configuration.service.ts` allows administrators to hot-swap AI providers (e.g., turning off Anthropic if it goes down) and adjust global routing/safety policies in real-time. This modifies the central `admin.repository.ts` configuration object, which the AI Gateway references before routing requests.
- **Role-Based Protection**: 
  - Routes are guarded via `restrictTo('super_admin', 'admin', 'platform_ops')`. 
  - No secrets or credentials (e.g. API Keys) are transmitted to the frontend. The frontend only toggles boolean flags (`enabled: true/false`).

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: AI Administration & Operations API
  version: 1.0.0
paths:
  /api/v1/ai-admin/overview:
    get:
      summary: Retrieve top-level platform aggregates (Total requests, uptime, costs).
  /api/v1/ai-admin/health:
    get:
      summary: Get system health telemetry for Gateway, RAG, and Safety modules.
  /api/v1/ai-admin/alerts:
    get:
      summary: Get active, unacknowledged operational alerts (High Latency, Index Failures).
  /api/v1/ai-admin/alerts/{id}/acknowledge:
    post:
      summary: Acknowledge an alert, removing it from the active dashboard.
  /api/v1/ai-admin/configuration:
    get:
      summary: Retrieve current platform configuration (Provider toggles, routing).
    put:
      summary: Update platform configuration flags.
      requestBody:
        content:
          application/json:
            schema:
              properties:
                providers: { type: object }
                routing: { type: object }
                safety: { type: object }
```

## 4. Acceptance Checklist

- [x] Generated Backend Services for configuration, alerts, and health monitoring.
- [x] Created `admin.repository.ts` to mock in-memory platform configurations and alerts.
- [x] Secured API routes via strict RBAC (`super_admin`, `admin`, `platform_ops`).
- [x] Built the frontend `AIAdministrationDashboardPage` with a 3-column operational layout.
- [x] Integrated `TanStack Query` polling mechanism (15s intervals) for NOC-style live updates.
- [x] Implemented `ConfigurationCenter` widget to toggle provider enablement safely.
- [x] Checked that no secrets are exposed; only boolean configurations exist in the payload.
- [x] Completed `docs/AI-Administration-Documentation.md`.
