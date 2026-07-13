# Forecasting Framework

## 1. Overview
The Forecasting Framework standardizes how future trends are calculated based on historical DW metrics. It is designed to be model-agnostic, wrapping time-series libraries (e.g., Prophet, ARIMA) behind a standard interface.

## 2. Core Forecast Definitions

### 2.1 Repository & Storage Forecasting
* **Repository Growth Forecast**: Predicts the number of new Question Papers uploaded per semester, accounting for seasonal spikes near exams.
* **Storage Growth Forecast**: Projects S3 storage utilization in TBs for budget planning.

### 2.2 Activity Forecasting
* **Student Activity Forecast**: Predicts MAU and peak concurrent users to aid in proactive auto-scaling.
* **Faculty Activity Forecast**: Projects moderation queue sizes based on historical upload patterns.

### 2.3 Operational Forecasting
* **AI Usage Forecast**: Predicts token consumption and RAG query volume to forecast OpenAI/LLM costs.
* **OCR Workload Forecast**: Predicts page processing volumes to optimize background worker scaling.
* **Infrastructure Demand Forecast**: Composite metric predicting overall compute required across all clusters.

## 3. Time-Series Strategy
* **Seasonality Detection**: Automatically detects academic semester cycles (e.g., peaks in Nov/Dec and Apr/May).
* **Trend Projection**: Identifies underlying YoY growth irrespective of seasonal spikes.
* **Prediction Bounds (Confidence)**: Every forecast returns `yhat` (expected), `yhat_lower` (p10), and `yhat_upper` (p90).
