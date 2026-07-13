# Enterprise AI Usage Analytics & Intelligence Platform

## 1. Folder Tree

```text
frontend/src/features/ai-analytics/
├── components/
│   ├── CitationAnalytics.tsx
│   ├── DepartmentAnalytics.tsx
│   ├── EducationalImpact.tsx
│   ├── ExecutiveKPIs.tsx
│   ├── ExportReports.tsx
│   ├── FeatureAdoption.tsx
│   ├── RoleAnalytics.tsx
│   ├── SearchToChatMetrics.tsx
│   └── SessionAnalytics.tsx
├── hooks/
│   └── useAIAnalytics.ts
└── pages/
    └── AIAnalyticsDashboardPage.tsx

backend/src/
├── controllers/
│   └── aiAnalytics.controller.ts
├── repositories/
│   └── analytics.repository.ts
├── routes/
│   └── aiAnalytics.routes.ts
└── services/
    └── aiAnalytics/
        ├── engagementAnalytics.service.ts
        ├── executiveKPI.service.ts
        ├── reporting.service.ts
        └── usageAnalytics.service.ts
```

## 2. Architecture

- **Data Privacy**: The analytics pipeline strictly aggregates telemetry data. Raw conversational data, prompts, and PII are stripped before metrics hit the `analytics.repository.ts`.
- **Aggregation Layer**: MongoDB aggregation pipelines are used to group interactions by `role`, `department`, and `feature`.
- **Dashboards**: The frontend utilizes `recharts` for fast, declarative SVG charting.
- **Reporting Engine**: The `reporting.service.ts` supports asynchronous PDF and CSV export generation, allowing admins to extract system data for university stakeholders.
- **Role-Based Views**: Access to this dashboard is limited to `admin`, `executive`, and `department_head` roles via `restrictTo()` middleware. 

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: AI Analytics & Intelligence API
  version: 1.0.0
paths:
  /api/v1/ai-analytics/overview:
    get:
      summary: Get top-level usage aggregates (Total requests, Monthly Active Users).
  /api/v1/ai-analytics/features:
    get:
      summary: Get feature adoption breakdown (AI Chat vs Q&A).
  /api/v1/ai-analytics/roles:
    get:
      summary: Get usage split by user roles (Students vs Faculty).
  /api/v1/ai-analytics/departments:
    get:
      summary: Get usage volume segmented by academic departments.
  /api/v1/ai-analytics/education:
    get:
      summary: Get educational impact KPIs (e.g. Estimated hours saved).
  /api/v1/ai-analytics/export:
    post:
      summary: Trigger a background generation of an analytics report.
      requestBody:
        content:
          application/json:
            schema:
              properties:
                type: { type: string, enum: [USAGE, DEPARTMENT, EXECUTIVE] }
                filters: { type: object }
```

## 4. Acceptance Checklist

- [x] Generated AI Analytics backend controllers, services, and repository layers.
- [x] Extracted role and departmental insights using mocked aggregation hooks.
- [x] Built the `AIAnalyticsDashboardPage` with standard top-level filters (Date Range).
- [x] Integrated `recharts` for Visualizations (Bar Charts, Pie Charts).
- [x] Implemented `ExportReports` widget to trigger backend CSV/PDF report generation.
- [x] Protected routes explicitly enforcing `admin`, `executive`, and `department_head` roles.
- [x] Compiled `docs/AI-Analytics-Documentation.md` outlining the privacy-aware data processing pipeline.
