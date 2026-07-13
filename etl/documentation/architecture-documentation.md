# ETL/ELT Architecture Documentation

## 1. Objective
Design a provider-neutral pipeline architecture supporting batch, incremental, and event-driven data processing for the CUHP Data Platform.

## 2. ELT vs ETL Strategy
* **ETL (Extract, Transform, Load)**: Used when integrating disparate sources (Mobile platform logs, API payloads) where data needs heavy cleansing and normalization in-flight before it hits the warehouse staging layer.
* **ELT (Extract, Load, Transform)**: Used for high-volume database replication (CDC). Data is extracted and loaded exactly as-is into a Staging schema in the data warehouse, then transformed using powerful in-database SQL (e.g., dbt).

## 3. Core Components

### 3.1 Data Orchestrator
A workflow engine (like Apache Airflow, Dagster, or Prefect) that defines DAGs. It handles:
- Workflow Scheduling
- Dependency Management (Pipeline Chaining)
- Retry Policies and Alerting

### 3.2 CDC Engine
A log-based capture mechanism (like Debezium) monitoring source databases. It places change events onto a message bus.

### 3.3 Reconciliation Engine
An independent module that runs daily. It queries the source MongoDB collections and the target Warehouse Fact tables, performing Hash Validation and Record Counts to detect any dropped messages or pipeline failures.

## 4. Administrative API
RESTful endpoints to manage pipelines:
- `POST /api/v1/orchestration/trigger/{pipeline_id}`
- `GET /api/v1/orchestration/status/{run_id}`
- `GET /api/v1/cdc/offsets`
- `GET /api/v1/reconciliation/reports/latest`

## 5. Security & Permissions
- **Super Administrator**: Full system access.
- **Data Engineering Team**: Can create, deploy, and trigger pipelines.
- **Platform Operations**: Can monitor pipeline health and restart failed tasks.
- **Read-only Analysts**: Can view data freshness and reconciliation reports.
