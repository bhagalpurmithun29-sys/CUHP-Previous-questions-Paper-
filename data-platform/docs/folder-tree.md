# CUHP Question Bank - Data Platform Folder Tree

This document outlines the directory structure and purpose of the enterprise data platform modules for the CUHP Question Bank project.

```text
data-platform/
├── architecture/         # High-level architecture, enterprise data models, and diagrams
│   ├── enterprise-data-model.md
│   └── architecture-documentation.md
├── classification/       # Data classification schemas (e.g., Public, Internal, Confidential)
├── docs/                 # General documentation, manuals, guides, and checklists
│   ├── folder-tree.md
│   ├── data-governance-guide.md
│   ├── operations-manual.md
│   └── acceptance-checklist.md
├── governance/           # Governance templates, policies, and steering committee assets
│   └── governance-templates.md
├── lifecycle/            # Data lifecycle policies (Creation, Retention, Archival, Deletion)
├── lineage/              # Data lineage tracing and provenance models
├── master-data/          # Master data definitions (Students, Faculty, Courses, etc.)
├── metadata/             # Business, Technical, and Operational metadata standards
│   └── metadata-standards.md
├── ownership/            # Data ownership and stewardship matrices
├── schemas/              # Reusable enterprise schema abstractions and registry placeholders
├── standards/            # Data standards (Naming conventions, Identifiers, Versioning)
└── taxonomy/             # Taxonomies and controlled vocabularies for reference data
```

## Module Overview

- **architecture**: Defines the provider-neutral blueprint supporting operational databases, analytical stores, and future data lake integration.
- **governance**: Houses policies for Data Ownership, Data Stewardship, Classification, Retention Rules, Data Quality, and Access Policies.
- **master-data**: Encompasses core entities: Students, Faculty, Departments, Courses, Programs, Subjects, Academic Sessions, Question Papers, Repositories, AI Knowledge Assets.
- **metadata**: Standards for Business, Technical, and Operational Metadata, including Schema Registry placeholders.
- **standards**: Centralizes Naming Standards, Identifiers, Versioning, Reference Data, and Controlled Vocabularies.
- **lifecycle**: Manages data phases from Creation to Updates, Archival, Retention, and Deletion.
