# CUHP Question Bank - ETL/ELT & Integration Folder Tree

```text
etl/
├── cdc/                  # Change Data Capture configs (Insert, Update, Delete detection)
│   └── cdc-framework.md
├── dead-letter/          # Dead-letter queue structures for failed events/rows
├── documentation/        # Guides, manuals, and architecture blueprints
│   ├── folder-tree.md
│   ├── architecture-documentation.md
│   ├── data-engineering-guide.md
│   ├── operations-manual.md
│   └── acceptance-checklist.md
├── elt/                  # Extract, Load, Transform (Target-side transforms)
├── etl/                  # Extract, Transform, Load (In-flight transforms)
├── metadata/             # Pipeline execution metadata (Execution times, offsets)
├── monitoring/           # Pipeline status, data freshness, and success rates
├── orchestration/        # Workflow scheduling (Airflow/Dagster/Prefect abstractions)
├── pipelines/            # Batch, Incremental, and Historical job definitions
│   └── pipeline-framework.md
├── reconciliation/       # Source vs Warehouse consistency checks and hashes
├── retries/              # Retry policies and failure recovery logic
├── schedulers/           # Cron definitions and dependency graphs
├── transformations/      # Data cleaning, enrichment, and business rules
│   └── transformation-library.md
└── validation/           # Schema, Null, and Duplicate detection checks
```

## Module Overview
This platform separates orchestration (scheduling, dependencies, retries) from execution (CDC, transformations). It supports data movement from Operational Databases, Repositories, AI Platforms, and Audit Logs into the Data Warehouse.
