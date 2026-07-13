# CUHP Question Bank - Data Warehouse Folder Tree

This document outlines the directory structure of the Enterprise Data Warehouse & Dimensional Modeling platform.

```text
data-warehouse/
├── aggregates/           # Pre-computed aggregate tables (Daily, Monthly, Yearly)
├── architecture/         # High-level warehouse schema and architecture design
│   └── warehouse-schemas.md
├── dimensions/           # Star/Snowflake dimension models (SCD Type 1 & 2)
│   └── dimensional-models.md
├── documentation/        # Guides, manuals, and developer handbooks
│   ├── folder-tree.md
│   ├── architecture-documentation.md
│   ├── warehouse-operations-guide.md
│   ├── developer-handbook.md
│   └── acceptance-checklist.md
├── etl-staging/          # Landing zones and staging structures for raw ETL data
├── facts/                # Transactional and accumulating snapshot fact tables
│   └── fact-tables.md
├── governance/           # Warehouse-specific data governance and auditing rules
├── marts/                # Subject-specific data marts (Academic, AI, Operations)
│   └── data-mart-definitions.md
├── optimization/         # Indexing recommendations, partitioning strategies
├── query-layer/          # Views, materialized views, and API abstraction layers
└── snapshots/            # Periodic historical snapshots of operational data
```

## Module Overview

- **dimensions**: Contains Conformed Dimensions like Student, Faculty, Course, and Time.
- **facts**: Contains Fact tables like Downloads, AI Usage, and Repository Activity.
- **marts**: Domain-specific aggregations (Academic Analytics, AI Analytics).
- **optimization**: Guidelines for partitioning and materializing data for BI tools.
