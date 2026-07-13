# Pipeline Framework

## 1. Overview
The pipeline framework defines the abstractions for moving data into the CUHP Data Warehouse. It supports Batch, Incremental, and Near Real-time (CDC) loads.

## 2. Pipeline Types

### 2.1 Batch Pipelines
Designed for large-volume, non-time-sensitive data (e.g., nightly snapshots).
* **Execution**: Scheduled via DAGs (Directed Acyclic Graphs).
* **Strategy**: Full extract from source, transform in memory or staging, load to target.

### 2.2 Incremental Pipelines
Extracts only records modified since the last successful run.
* **Tracking Mechanism**: Uses `updatedAt` timestamps stored in the `etl/metadata` layer (High-Water Mark / Checkpoint Tracking).

### 2.3 Near Real-time (CDC) Placeholder
Event-driven pipelines triggered by database transaction logs.
* **Execution**: Streaming framework (e.g., Kafka Streams, Flink) continuously polling CDC topics.

### 2.4 Backfill & Historical Jobs
Specialized pipelines designed to reload an entire dimension or fact table without disrupting current CDC offsets.

## 3. Orchestration
Orchestration logic is completely decoupled from transformation logic.
* **Dependency Management**: Parent-child relationships (e.g., Dim_Student must load before Fact_Uploads).
* **Retry Policies**: Exponential backoff for transient API or network failures.
* **Failure Recovery**: On failure, pipelines restart from the last successful checkpoint, not from the beginning.
