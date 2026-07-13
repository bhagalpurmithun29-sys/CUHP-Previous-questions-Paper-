# Data Quality Architecture Documentation

## 1. Objective
Design a provider-neutral DataOps architecture supporting automated validation, profiling, and lineage tracking to establish absolute trust in the CUHP Data Platform.

## 2. Architecture Integration

### 2.1 ETL/ELT Integration
The Validation Framework is deeply integrated into the Orchestration layer. 
* **Pre-flight Checks**: Before a pipeline moves data into production tables, the data is staged and validated.
* **Circuit Breakers**: If a Critical Quality Rule fails (e.g., > 5% of records are duplicates), the pipeline halts and alerts Operations.

### 2.2 Metadata Catalog & Lineage
Lineage data is extracted by parsing the pipeline definition files (e.g., Airflow DAGs) and SQL queries (e.g., dbt manifest.json). This metadata is pushed to a central Metadata Catalog where it can be queried via API.

### 2.3 BI & Predictive Integration
Trust Scores are exposed to BI Dashboards. Every dashboard includes a visual indicator (e.g., a "Gold Shield") signifying the certification status of the underlying data.

## 3. API Design
- `GET /api/v1/data-quality/reports/{dataset_id}` - Fetch profiling reports and drift stats.
- `GET /api/v1/data-quality/lineage/{dataset_id}` - Returns the DAG of upstream dependencies.
- `GET /api/v1/data-quality/trust/{dataset_id}` - Returns Trust Score and Certification status.
- `POST /api/v1/data-quality/certify` - Allows Data Stewards to manually approve a dataset.

## 4. Security & Permissions (RBAC)
- **Data Governance Team**: Defines Quality Rules, Data Quality SLAs, and Drift Thresholds.
- **Data Stewards**: Reviews near-duplicates, handles anomaly alerts, and manually Certifies datasets.
- **Data Engineering**: Integrates rules into pipelines and conducts Root Cause Analysis on failures.
- **Analysts/Executives**: Read-only access to Trust Scores and Lineage graphs.
