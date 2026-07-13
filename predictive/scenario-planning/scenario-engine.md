# Scenario Engine & What-If Analysis

## 1. Overview
The Scenario Engine allows Executive Users to model different futures based on varying input parameters, driving proactive decision support.

## 2. Baseline Scenarios

### 2.1 Expected Scenario (Base Case)
* Uses historical trends and identified seasonality directly from the Data Warehouse.
* No external variables are adjusted.

### 2.2 Best-case Scenario
* Projects maximum upper-bound growth metrics.
* Models the impact of higher-than-expected user adoption (e.g., +20% DAU).
* Useful for stress-testing capacity planning.

### 2.3 Worst-case Scenario
* Projects lower-bound growth.
* Useful for minimum budget forecasting and resource allocation.

## 3. What-If Analysis (Sensitivity)
The `what-if` module accepts dynamic parameter overrides.
* **Example**: "What if the AI token cost increases by 10% next quarter and usage increases by 50%?"
* The engine recalculates the target KPI (e.g., Budget) based on the model's sensitivity to those specific variables.
