# Enterprise Data Handbook

## 1. Introduction
The Enterprise Data Handbook is the "Constitution" of the CUHP Data Platform. It defines the universal standards that all integrated modules must follow.

## 2. Universal Standards
* **Timestamps**: All timestamps across all modules (MongoDB, S3, Data Warehouse, Kafka) MUST be recorded in UTC, ISO-8601 format.
* **Identifiers**: All entities must use UUIDv4 for primary keys to ensure global uniqueness across distributed systems.
* **Naming Conventions**: 
  * Databases & Schemas: `snake_case`.
  * Event Names: `PascalCase` (e.g., `QuestionPaperUploaded`).
  * APIs: Kebab-case URLs (e.g., `/api/v1/data-platform`).

## 3. Deployment & Integration Policy
* No module can be deployed to production if it bypasses the `Data Quality Validation Engine`.
* No new dataset can be created in the DW without a corresponding entry in the `Metadata Catalog` containing a designated Data Owner.
