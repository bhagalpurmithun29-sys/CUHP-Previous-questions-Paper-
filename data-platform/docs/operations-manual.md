# Operations Manual

## 1. Introduction
This manual provides instructions for the technical operations team to maintain the Data Architecture and Governance platform for the CUHP Question Bank.

## 2. Master Data Management Operations

### 2.1 Incremental Synchronization
The platform uses Change Data Capture (CDC) to synchronize Master Data updates to downstream services (e.g., Elasticsearch for search, Redis for caching, Data Warehouse for analytics).
* **Tooling**: Debezium / MongoDB Change Streams.
* **Monitoring**: Monitor the consumer lag on the Kafka topics/event buses handling the CDC stream. Alert if lag exceeds 5 minutes.

### 2.2 Metadata Caching Strategy
* **Read-Through**: API requests check Redis first. On miss, they query MongoDB, populate Redis, and return.
* **Write-Through/Invalidation**: On update to Master Data, the API automatically invalidates or updates the corresponding Redis key.
* **TTL**: Cache TTL is set to 24 hours to ensure eventual consistency if invalidation events are lost.

### 2.3 Background Validation
A cron-based worker runs nightly (at 02:00 AM UTC) to execute data quality checks across the entire MongoDB dataset.
* **Logs**: Output is directed to the central logging system (OpenTelemetry).
* **Alerts**: Any validation failure (e.g., orphaned references) triggers a Jira/OpsGenie ticket assigned to the Data Steward.

## 3. Data Governance Operations

### 3.1 Archival and Retention Execution
* **Daily Job**: `retention-enforcer-job` runs daily at 00:00 UTC.
* **Process**: Scans `operationalMetadata.createdAt` or `.updatedAt` against the entity's retention policy.
* **Action**: Moves `status` to `ARCHIVED` or performs a hard delete from the database.

### 3.2 Schema Evolution
If the business requires new metadata fields:
1. Define the new field in the Schema Registry.
2. Update the API validation schemas (e.g., Zod or JSON Schema).
3. Ensure the new field is backward-compatible (make it optional or provide a default value).
4. Run a batch script to backfill the field for existing records if required.

## 4. Disaster Recovery & Backups
* **Database Backups**: Automated nightly backups of MongoDB stored in immutable cloud storage.
* **Governance Audit Logs**: Shipped continuously to a secure, write-once-read-many (WORM) storage bucket.
