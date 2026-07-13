# CUHP Question Bank - Enterprise Search Folder Tree

```text
search/
├── documentation/        # Guides, manuals, and developer handbooks
│   ├── folder-tree.md
│   ├── architecture-documentation.md
│   ├── search-apis.md
│   ├── search-developer-guide.md
│   ├── operations-manual.md
│   └── acceptance-checklist.md
├── entities/             # Extracted named entities (Courses, Faculty, Topics)
├── facets/               # Dynamic filtering (Date, Department, Subject)
├── federation/           # Federated routing to multiple data stores (DB, S3, Wiki)
├── indexing/             # Incremental and full re-index background workers
├── knowledge-graph/      # Graph models linking Academic and Repository assets
│   └── knowledge-graph-models.md
├── ontology/             # Academic taxonomy and synonym management
│   └── ontology-definitions.md
├── query-engine/         # Core search routing (Keyword vs Semantic)
│   └── search-framework.md
├── ranking/              # Relevance, Popularity, and AI-assisted sorting
├── relationships/        # Graph edge definitions (e.g., "Faculty TEACHES Course")
└── semantic/             # Embedding-based similarity and intent-aware search
```

## Module Overview
The Enterprise Search platform provides unified, intelligent information retrieval across the university's entire data ecosystem. It layers Semantic Discovery and a Knowledge Graph over traditional keyword search, ensuring highly relevant, intent-aware results.
