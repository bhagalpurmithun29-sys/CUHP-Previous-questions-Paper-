# BI Architecture Documentation

## 1. Objective
Build a provider-neutral BI architecture with reusable visualization components, interacting securely with the Analytical APIs exposed by the Data Warehouse.

## 2. Architecture Layers

### 2.1 Presentation Layer (Frontend)
A React/Vue-based dashboarding application. It utilizes a generic `Widget` wrapper that accepts a standard JSON payload format to render charts.
### 2.2 Analytical API Layer (Backend)
Serves data to the presentation layer. It translates REST/GraphQL queries into optimized SQL queries against the Data Warehouse Data Marts.
### 2.3 Caching Layer (Redis)
Caches exact query payloads based on a hash of the dashboard state (filters, date range) to achieve <100ms load times for executives.

## 3. API Design
- `POST /api/v1/bi/query` - Executes a dynamic analytical query.
- `GET /api/v1/bi/dashboards/{id}` - Retrieves dashboard layout and saved widget configurations.
- `POST /api/v1/bi/export` - Triggers an asynchronous export job (PDF/CSV).

## 4. Security & Permissions (RBAC)
- **Super Administrator**: Can build global dashboards and alter system defaults.
- **Executives**: Read-only access to all dashboards, drill-downs, and exports.
- **Department Heads**: Row-level security restricts their Academic Dashboard to their specific department.
- **Data Analysts**: Can create custom "Saved Views" and build ad-hoc reports.

## 5. Performance Optimizations
- **Lazy Loading**: Widgets below the fold do not request data until they intersect the viewport.
- **Incremental Refresh**: Dashboards polling for real-time operational data use lightweight `updated_since` queries rather than full refreshes.
