# Warehouse Architecture Documentation

## 1. Objective
Build a scalable analytical architecture separated from operational databases, supporting future cloud-native analytical platforms without vendor lock-in.

## 2. Platform Architecture Context
The EDW integrates with:
- **Data Governance**: Enforces row-level security and data masking (e.g., PII in Dim_Student).
- **Repository Platform**: Source of truth for Fact_Uploads and Fact_Downloads.
- **AI Platform**: Consumes AI-ready analytical datasets (e.g., usage patterns).
- **BI Dashboards**: Exposes Data Marts via secure read-only APIs to BI tools.

## 3. Storage and Compute Separation
To remain provider-neutral and scalable, the architecture dictates the separation of storage from compute.
- **Storage Layer**: Raw and processed data is stored in object storage (e.g., S3-compatible) using open columnar formats like Apache Parquet or Apache Iceberg.
- **Compute Layer**: Ephemeral or serverless query engines (e.g., Presto, Trino, Spark SQL) query the storage layer on-demand.

## 4. Query Optimization Strategy
### 4.1 Partitioning
Fact tables are partitioned by `time_key` (typically Year and Month) to optimize temporal queries which constitute 90% of BI workloads.
### 4.2 Materialized Views
Data Mart definitions rely on Materialized Views that are refreshed asynchronously overnight to ensure instant load times on Executive Dashboards.
### 4.3 Indexing Recommendations
If backed by a relational MPP (Massively Parallel Processing) database:
- Use Clustered Columnstore Indexes on all Fact tables.
- Use B-Tree indexes on surrogate keys in Dimension tables.

## 5. Security and Permissions (RBAC)
- **Super Administrator**: Full control over schema changes and user provisioning.
- **BI Team**: Read/Write access to Data Marts and Materialized Views.
- **Data Analysts**: Read-only access to Core Warehouse (Facts and Dimensions).
- **Executive Read-only Users**: Read-only access restricted to specific Aggregates and Marts.
