# Architecture Documentation

## 1. Overview
The Advanced Analytics platform sits on top of the Data Warehouse. Instead of exposing raw data marts, it acts as a semantic layer, centralizing business logic, definitions, and access control.

## 2. Semantic Layer (Metrics Framework)
* **Definition Store**: Metrics and KPIs are defined as code or configuration (e.g., using a framework like Cube.js or dbt Semantic Layer).
* **Aggregate Caching**: Pre-computes heavily accessed composite KPIs overnight and caches them in Redis to ensure sub-second scorecard rendering.

## 3. Background Processing & Alerting
* **Alert Engine**: A background cron worker evaluates KPIs against their defined Thresholds/Goals every hour.
* **Notification Routing**: If a threshold is breached (e.g., Uptime drops below 99.9%), it publishes a `ThresholdBreached` event to the Enterprise Event Bus, which routes it to the Notifications module.

## 4. Security & Permissions (RBAC)
- **Super Administrator**: System-wide configuration.
- **Executive Users**: Global view of all Scorecards and Benchmarks.
- **Department Heads**: Limited to Scorecards filtered by their `department_id`.
- **Data Analysts**: Ability to define new Goals and view Variance Analysis.
- **Faculty**: Personal Scorecards only.
