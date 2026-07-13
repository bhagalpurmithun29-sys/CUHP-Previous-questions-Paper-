# Predictive Architecture Documentation

## 1. Objective
Design an extensible prediction framework capable of supporting multiple forecasting and ML approaches without coupling the CUHP platform to a specific ML library or cloud service.

## 2. Decoupled Architecture
* **Data Layer**: Reads historical snapshots and facts directly from the Data Warehouse (Read-only).
* **Compute Layer**: Models execute in ephemeral, containerized workers (e.g., Python containers running scikit-learn or Prophet). This allows models to be written in Python while the rest of the CUHP platform remains in TypeScript.
* **Serving Layer**: The Analytical APIs read the pre-computed forecasts (stored back in the DW or Redis) and serve them to the BI Dashboards.

## 3. Background Generation
* Models are NOT run synchronously during an API request.
* Forecasts are generated overnight via background jobs triggered by the ETL Orchestrator.
* Predictions are cached and served instantly to Executive Users.

## 4. Integration Points
- **Data Warehouse**: Source of historical training data.
- **KPI Platform**: Forecasts are plotted against KPI Goals.
- **Event Streaming**: Publishes `RecommendationGenerated` events to notify Ops teams of capacity warnings.

## 5. Security & Permissions (RBAC)
- **Super Administrator**: Platform config.
- **Executive Users**: Read-only access to Scenarios and Forecasts.
- **Data Scientists**: Full write access to Model Registry and Model Versioning.
- **Department Heads / Analysts**: Can view Academic Planning Insights and run What-If simulations.
