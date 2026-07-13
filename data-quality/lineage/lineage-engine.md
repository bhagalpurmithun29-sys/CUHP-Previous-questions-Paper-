# Lineage & Trust Engine

## 1. Data Lineage Engine
Data lineage tracks the origin, transformations, and final destination of data, ensuring auditability and compliance.

### 1.1 Lineage Levels
* **Source Tracking**: Identifies the exact MongoDB collection or API endpoint where data originated.
* **Pipeline Lineage**: Tracks which Airflow/Dagster job and specific task extracted and loaded the data.
* **Transformation Tracking**: Documents the SQL/dbt models that modified the data.
* **Report Lineage**: Maps the final DW table/view to the specific BI Dashboard widget consuming it.

### 1.2 Lineage Graph
The engine builds a Directed Acyclic Graph (DAG) stored in a graph database or metadata catalog (e.g., DataHub, Amundsen) mapping `Source -> Staging -> Dimension/Fact -> Mart -> Dashboard`.

## 2. Trust Score Engine
The Trust Score is a quantifiable metric (0-100) assigned to datasets to indicate reliability to Data Analysts and Executives.

### 2.1 Score Calculation
The Trust Score is a weighted composite of:
- **Validation Status (40%)**: Pass rate of quality rules attached to the table.
- **Freshness (30%)**: Time since the last successful ETL load.
- **Completeness (20%)**: Percentage of non-null values in critical columns.
- **Lineage Health (10%)**: Absence of errors in upstream dependencies.

### 2.2 Certification Status
* **Gold / Certified**: Trust Score > 95, manually reviewed by a Data Steward. Safe for Executive Dashboards.
* **Silver / Verified**: Trust Score > 85, automated validation passed. Safe for ad-hoc analysis.
* **Bronze / Raw**: Uncertified data. Used at the analyst's own risk.
