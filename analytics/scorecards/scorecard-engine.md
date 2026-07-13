# Scorecard Engine

## 1. Overview
Scorecards provide a structured, at-a-glance view of performance against targets. They group KPIs by domain and visualize actuals vs. goals, including variance and trending status.

## 2. Scorecard Types

### 2.1 Executive Scorecard
* **Audience**: Vice-Chancellor, Board.
* **Format**: High-level traffic light indicators (Red/Amber/Green) for Uptime, Cost, and Overall Engagement.

### 2.2 Department Scorecards
* **Audience**: Department Heads (HODs).
* **Format**: Ranks the department against institutional benchmarks.
* **Metrics**: Curriculum Coverage Index, Faculty Contribution Index.

### 2.3 Operational Scorecards
* **Audience**: Platform Ops, Data Engineering.
* **Format**: SLA tracking.
* **Metrics**: Moderation Backlog Time, Pipeline Freshness, AI Latency.

## 3. Analytics Features

### 3.1 Variance Analysis
Automatically calculates the delta between the `Actual Value` and the `Target Goal`. Highlights negative variance in Red.

### 3.2 Trend Analysis
Analyzes the trailing 12 months (TTM) to determine the direction of the metric. Displays as a sparkline or directional arrow (e.g., "Up 5% Month-over-Month").

### 3.3 Benchmarking
- **Historical**: Compare Q3 2026 vs Q3 2025.
- **Departmental**: Compare "Computer Science" performance against the "University Average".
