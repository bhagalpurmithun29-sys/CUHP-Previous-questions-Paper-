# Enterprise Data Integration Framework

## 1. Overview
The Integration Framework serves as the conceptual glue, ensuring that isolated components (Data Warehouse, Event Bus, Search, Metadata, AI) communicate via standardized contracts rather than fragile point-to-point connections.

## 2. Integration Pathways

### 2.1 The Operational to Analytical Handshake
* **Path**: MongoDB -> Event Bus (Kafka) -> ETL (Dagster/Airflow) -> DW (S3/Iceberg).
* **Integration Rule**: The DW never polls MongoDB directly. All state changes flow through the Event Schema Registry, ensuring the DW and Search indices receive the exact same payload simultaneously.

### 2.2 The Analytical to Intelligence Handshake
* **Path**: DW -> Semantic Layer -> Reporting/Dashboards -> Executive AI Briefings.
* **Integration Rule**: Dashboards and AI Briefings *must not* write raw SQL against the DW. They must query the Semantic Layer APIs to ensure metrics (like "Download Count") are universally consistent.

### 2.3 The Governance & Privacy Overlay
* **Integration Rule**: Governance is not a silo. The `Privacy Engine` sits between the Semantic Layer and the UI. It intercepts API calls to ensure Data Masking and Consent Rules (from the `Consent Management` module) are applied *before* data reaches the `Executive Intelligence` or `Predictive Analytics` layers.

## 3. Reusable Abstractions
Instead of duplicating logic, modules use central internal APIs:
- `Data Quality API`: Used by ETL to validate rows before loading.
- `Metadata Catalog API`: Used by Search to enrich facet filters.
- `Decision Support API`: Used by Executive Dashboards to flag "Strategic Risks".
