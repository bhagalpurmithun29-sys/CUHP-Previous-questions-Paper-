# CDC Framework

## 1. Overview
The Change Data Capture (CDC) framework is responsible for capturing real-time row-level changes from operational databases (MongoDB, PostgreSQL) without placing excessive query load on the primary systems.

## 2. Detection Mechanisms

### 2.1 Insert Detection
* Captures new documents added to a collection.
* Pipeline action: `INSERT` into Staging.

### 2.2 Update Detection
* Captures modifications to existing documents.
* Generates a "before" and "after" state.
* Pipeline action: Handled according to SCD type (Type 1 overwrites, Type 2 inserts new).

### 2.3 Delete Detection
* Captures hard deletes.
* Pipeline action: Propagates a logical soft-delete (e.g., `is_deleted = true`) to the Data Warehouse to preserve historical facts.

## 3. Offset and Checkpoint Management
* **Offset Storage**: The framework maintains a persistent cursor (e.g., MongoDB Oplog timestamp or Kafka offset) indicating the last successfully processed change.
* **Idempotency**: Downstream ELT/ETL processes must be idempotent. If a CDC batch is replayed from a previous offset, it must not create duplicate records in the warehouse.
