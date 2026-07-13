# Predictive Analytics Guide & Operations Manual

## 1. Analytics Guide: Model Development Lifecycle
1. **Explore**: Data Scientists pull historical facts from the DW.
2. **Train**: Develop a forecasting model in an isolated Jupyter environment.
3. **Register**: Commit the model artifact and log metadata to the `Model Registry`.
4. **Deploy**: Operations mounts the artifact into the scoring container.
5. **Evaluate**: The model runs in "Shadow Mode", predicting outcomes without surfacing them to the UI, while accuracy is evaluated over 30 days.
6. **Promote**: If accuracy SLA is met, the model is promoted to Production.

## 2. Operations: Model Refresh & Recommendations
* **Incremental Refresh**: Models are not retrained from scratch daily. They utilize incremental learning or are completely retrained on a monthly schedule.
* **Recommendations Pipeline**: 
  - The `recommendations/` module scans the output of the Forecasts daily.
  - If the `Storage Growth Forecast` (p90 upper bound) crosses the physical capacity threshold within 60 days, it generates a `Capacity Planning Recommendation`.
  - This recommendation triggers an alert to Platform Operations.

## 3. Operations: Dealing with Drift
* When the `monitoring/` module detects Prediction Drift, the model is automatically downgraded to "Needs Retraining".
* Operations must manually override the forecast on Dashboards with a static baseline until Data Scientists deploy a new model version.
