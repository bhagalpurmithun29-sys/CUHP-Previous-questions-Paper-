# Model Registry & Monitoring

## 1. Overview
The Model Registry governs all machine learning models in production, tracking metadata, versions, and evaluation histories. It acts as the catalog for Data Scientists to manage ML assets.

## 2. Model Metadata
Every model artifact deployed must log:
- **Model ID**: Unique identifier (e.g., `storage_forecast_v1`).
- **Algorithm**: The underlying ML technique (e.g., `Prophet`, `XGBoost`).
- **Features Used**: The specific DW metrics/dimensions fed into the model.
- **Trained By**: Data Scientist UUID.
- **Trained On**: Timestamp.

## 3. Model Monitoring

### 3.1 Forecast Accuracy (Backtesting)
The `evaluation/` module continuously runs backtests. It compares the model's past predictions against the actual data that eventually arrived. 
* Primary Metric: MAPE (Mean Absolute Percentage Error) or RMSE (Root Mean Square Error).

### 3.2 Prediction Drift Detection
If the variance between predicted values and actual values exceeds a predefined threshold for 3 consecutive days, the model is flagged for "Drift".
* **Action**: Generates an alert for the Data Science team to retrain the model.

### 3.3 Confidence Tracking
Tracks the width of the confidence intervals (p10 to p90). If the bounds become excessively wide, the model's utility decreases, triggering a health alert.
