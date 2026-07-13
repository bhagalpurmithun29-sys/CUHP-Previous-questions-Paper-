# Prediction APIs

## 1. Objective
Design analytical APIs that serve forecasts, scenarios, and model metadata to frontend dashboards, ensuring the UI remains decoupled from ML orchestration logic.

## 2. API Endpoints

### 2.1 Forecast Retrieval
`GET /api/v1/predictive/forecasts/{target_metric}`
- **Params**: `horizon_days` (e.g., 90), `granularity` (daily/monthly).
- **Response**: Array of future dates containing `expected`, `lower_bound`, and `upper_bound` values.

### 2.2 Scenario Execution (What-If)
`POST /api/v1/predictive/scenarios/simulate`
- **Payload**: Base model ID, variables to override (e.g., `{"student_enrollment_growth": 0.15}`).
- **Response**: Simulated forecast output based on the adjusted variables.

### 2.3 Model Metadata & Health
`GET /api/v1/predictive/models/{model_id}/health`
- **Response**: Metadata including `last_trained`, `version`, `accuracy_mape`, and `drift_status`.

### 2.4 Recommendation Retrieval
`GET /api/v1/predictive/recommendations`
- **Response**: Array of actionable insights (e.g., "Increase DB Read Replicas before Dec 1st due to forecasted 300% load increase").
