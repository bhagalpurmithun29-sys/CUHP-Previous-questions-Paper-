# Metadata Architecture Documentation

## 1. Objective
Design a provider-neutral metadata architecture supporting operational, analytical, and AI data assets, bridging the gap between raw data and business understanding.

## 2. Architecture Components

### 2.1 Metadata Ingestion (Push & Pull)
* **Pull (Crawlers)**: Automated background jobs extract schema changes from the DW, MongoDB, and Event Schema Registry nightly.
* **Push (API)**: ETL pipelines proactively push operational metadata (e.g., "Loaded 500 rows at 02:00 AM") via API to keep the catalog fresh in near real-time.

### 2.2 Storage Layer
* Metadata is stored in a graph database (to handle complex lineage relationships natively) or a dedicated Metadata backend (e.g., DataHub/Amundsen abstractions).

### 2.3 Search Layer
* The Graph/Metadata DB is continuously synchronized with Elasticsearch to power the Dataset Discovery features.

## 3. Administrative APIs
- `GET /api/v1/metadata/search?q=...` - Main discovery endpoint.
- `GET /api/v1/metadata/datasets/{id}` - Fetch full technical and business metadata.
- `POST /api/v1/metadata/glossary/terms` - Add a new business term.
- `PUT /api/v1/metadata/datasets/{id}/tags` - Update tags on a dataset.

## 4. Security & Permissions (RBAC)
- **Super Administrator**: Configures crawlers and search index settings.
- **Data Governance Team**: Curates the Business Glossary and manages high-level tags.
- **Data Stewards**: Edits metadata descriptions for their assigned datasets.
- **Business Analysts & Read-only**: Can search, view lineage, and read glossary terms.
