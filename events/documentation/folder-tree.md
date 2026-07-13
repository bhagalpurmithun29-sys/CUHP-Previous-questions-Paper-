# CUHP Question Bank - Enterprise Event Platform Folder Tree

```text
events/
├── catalog/              # Event Catalog (Producer/Consumer registry, documentation)
│   └── event-catalog.md
├── dead-letter/          # Unprocessable message handling and DLQ monitoring
├── documentation/        # Guides, manuals, and architecture blueprints
│   ├── folder-tree.md
│   ├── architecture-documentation.md
│   ├── developer-guide.md
│   ├── operations-manual.md
│   └── acceptance-checklist.md
├── event-bus/            # Core messaging abstraction layers (agnostic of Kafka/RabbitMQ)
│   └── event-framework.md
├── governance/           # Compatibility rules, ownership, schema registries
├── monitoring/           # Event throughput, latency, lag, and success rates
├── publishers/           # Libraries and interfaces for event producers
├── replay/               # Mechanisms to rewind consumer offsets and replay historical events
├── routing/              # Topic, Priority, Broadcast, and Selective delivery definitions
├── schemas/              # JSON/Avro schema definitions for Domain Events
│   └── schema-definitions.md
├── subscribers/          # Libraries and interfaces for event consumers
└── versioning/           # Event versioning and schema evolution policies
```

## Module Overview
The Event-Driven Architecture (EDA) module decouples microservices by using asynchronous events. It abstracts away the underlying message broker (e.g., Apache Kafka, RabbitMQ) to prevent vendor lock-in.
