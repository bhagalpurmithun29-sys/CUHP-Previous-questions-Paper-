# Decision Intelligence APIs

## 1. Objective
Design analytical APIs for recommendations, decision scenarios, simulations, impact analysis, and feedback collection, ensuring seamless integration with the frontend BI Dashboards.

## 2. API Endpoints

### 2.1 Recommendations
- `GET /api/v1/decisions/recommendations` - Fetches the ranked list of active recommendations tailored to the user's RBAC scope (e.g., Department Head only sees their department's recommendations).
- `GET /api/v1/decisions/recommendations/{id}/explain` - Returns the plain-text evidence summary, supporting KPIs, and confidence score.

### 2.2 Simulation & Impact
- `POST /api/v1/decisions/simulate` - Submits a JSON payload of policy/capacity overrides and triggers a background simulation. Returns a `job_id`.
- `GET /api/v1/decisions/simulate/{job_id}/results` - Fetches the impact analysis and expected outcomes of the simulation.

### 2.3 Feedback Loop
- `POST /api/v1/decisions/recommendations/{id}/feedback` - Submits user feedback (Accept, Reject, Snooze) along with optional textual context.

## 3. Permissions (RBAC)
- **Super Administrator**: Access to all endpoints and global simulations.
- **Executive Users**: View top-level institutional recommendations and run strategic simulations.
- **Department Heads**: View and provide feedback on recommendations scoped to their specific departments.
- **Data Analysts**: Can configure new business rules in the Decision Engine.
