# Executive Intelligence APIs

## 1. Objective
Design analytical APIs specifically tailored for executive dashboards, board reports, scorecards, and strategic initiatives. These APIs aggregate data from the underlying Semantic and Reporting layers.

## 2. API Endpoints
* `GET /api/v1/executive/dashboards/{domain}` - Fetches the highly aggregated JSON structure for a specific dashboard (e.g., `academic`, `finops`).
* `GET /api/v1/executive/scorecards/{level}` - Returns the Balanced Scorecard metrics filtered by Institutional or Department level.
* `GET /api/v1/executive/initiatives/status` - Returns milestone tracking for strategic goals.
* `POST /api/v1/executive/reports/board-pack` - Triggers the background generation of a presentation-ready Board Report PDF.

## 3. Permissions (RBAC)
* **Vice Chancellor / Executive Committee / Board Members**: Full read access to all Institutional scorecards and dashboards.
* **Registrar / Dean**: Full read access to Academic and Operations dashboards.
* **Department Head**: Access strictly limited to Department-level scorecards via Row-Level Security (RLS).
* **Super Administrator**: Can configure layout and KPI mappings, but cannot alter the underlying data.
