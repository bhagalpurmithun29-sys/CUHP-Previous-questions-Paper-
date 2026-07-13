# Analytics Dependency Maps

## 1. Overview
The Dependency Maps track how the 14+ Data Platform modules rely on each other. If one module goes offline, these maps instantly identify downstream impact.

## 2. Core Dependencies

### 2.1 The Analytical Flow
`MongoDB` -> `CDC/ETL` -> `Data Warehouse` -> `Semantic Layer` -> `BI Dashboards` & `Reporting`

### 2.2 The Intelligence Flow
`Data Warehouse` -> `Predictive Analytics` -> `Decision Support Engine` -> `Executive Dashboards`

### 2.3 The Discovery Flow
`MongoDB` -> `Event Bus` -> `Search Indexing` -> `Knowledge Graph` -> `Semantic Search API`

### 2.4 The Governance Flow (Orthogonal)
`Data Quality`, `Metadata Catalog`, and `Privacy Engine` do not sit in a linear path. They wrap around the Analytical and Intelligence flows, injecting checks (e.g., Trust Scores, Consent Validation) at every boundary transition.

## 3. Failure Domain Mapping
* **If DW is offline**: BI Dashboards, Executive Dashboards, and Predictive Analytics fail. 
* **Mitigation**: Search Engine and Operational UI remain online. Dashboards fall back to cached Redis states.
