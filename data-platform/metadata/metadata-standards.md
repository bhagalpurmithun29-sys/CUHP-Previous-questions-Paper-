# Metadata Standards

## 1. Overview
This document defines the metadata taxonomy and schema standards for the CUHP Question Bank platform. Standardized metadata ensures searchability, governance compliance, and high-quality inputs for the RAG-based AI platform.

## 2. Metadata Categories

### 2.1 Business Metadata
Defines the context, business meaning, and academic categorization of the data.
* **Fields**:
  * `title`: Descriptive name of the asset.
  * `description`: Academic context or syllabus coverage.
  * `keywords`: Tags from the Controlled Vocabulary.
  * `department`: Linked Department ID.
  * `course`: Linked Course ID.
  * `subject`: Linked Subject ID.
  * `academicSession`: Linked Session ID (e.g., "Fall 2026").
  * `difficultyLevel`: Enum (BEGINNER, INTERMEDIATE, ADVANCED).

### 2.2 Technical Metadata
Defines the structural, formatting, and storage properties of the data.
* **Fields**:
  * `fileFormat`: MIME type (e.g., `application/pdf`).
  * `fileSize`: Size in bytes.
  * `checksum`: SHA-256 hash for integrity validation.
  * `storageUri`: Path/URI in the object store (e.g., S3).
  * `vectorDimension`: (For AI Assets) Size of the embedding array.
  * `embeddingModel`: (For AI Assets) Model used (e.g., `text-embedding-3-small`).

### 2.3 Operational Metadata
Defines the lifecycle, lineage, and audit trail of the data.
* **Fields**:
  * `createdBy`: User ID of the uploader/creator.
  * `createdAt`: ISO-8601 timestamp.
  * `updatedBy`: User ID of the last modifier.
  * `updatedAt`: ISO-8601 timestamp.
  * `version`: Monotonically increasing integer.
  * `status`: Enum (DRAFT, IN_REVIEW, PUBLISHED, ARCHIVED).
  * `accessCount`: Number of times accessed (Analytics).

## 3. Schema Registry Placeholder

To ensure compatibility across microservices, schemas are managed centrally.

### Example: Schema Registry Definition (JSON Schema)
```json
{
  "$id": "https://schema.cuhp.edu/metadata/v1.0.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "DocumentMetadata",
  "type": "object",
  "properties": {
    "businessMetadata": { "$ref": "#/definitions/businessMetadata" },
    "technicalMetadata": { "$ref": "#/definitions/technicalMetadata" },
    "operationalMetadata": { "$ref": "#/definitions/operationalMetadata" }
  },
  "required": ["businessMetadata", "technicalMetadata", "operationalMetadata"]
}
```

## 4. Naming Standards and Identifiers
* **Identifiers**: All entities use UUIDv4 for primary keys. Avoid sequential integers to prevent enumeration attacks.
* **Naming**:
  * Tables/Collections: `snake_case`, plural (e.g., `question_papers`).
  * JSON Keys: `camelCase` (e.g., `academicSession`).
  * Enums: `UPPER_SNAKE_CASE` (e.g., `IN_REVIEW`).

## 5. Controlled Vocabulary & Reference Data
All tags and categories must resolve against a central Reference Data Management (RDM) service. Free-text tagging is disabled for core metadata fields to prevent data fragmentation.
