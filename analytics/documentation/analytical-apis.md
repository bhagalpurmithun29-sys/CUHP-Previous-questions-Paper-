# Analytical APIs

## 1. Objective
Design dedicated REST/GraphQL APIs that abstract the underlying metric calculations, allowing UIs to simply request a "KPI" rather than constructing complex SQL.

## 2. Endpoints

### 2.1 KPI Retrieval
`GET /api/v1/analytics/kpis/{kpi_id}?date_range=...&department_id=...`
- Returns: Actual Value, Target Value, Variance (%), Trend Direction.

### 2.2 Scorecard Retrieval
`GET /api/v1/analytics/scorecards/{scorecard_id}`
- Returns: A nested JSON structure containing all KPIs linked to the requested scorecard, respecting the user's RBAC scope (e.g., only returning CS department data for the CS HOD).

### 2.3 Benchmark Retrieval
`GET /api/v1/analytics/benchmarks/{metric_id}/compare`
- Params: `baseline_dimension`, `target_dimension`.
- Returns: Comparative values and index score (e.g., 105 means 5% above benchmark).

### 2.4 Goal Tracking
`PUT /api/v1/analytics/goals/{goal_id}`
- Allows authorized users to update the target threshold for a specific period.
