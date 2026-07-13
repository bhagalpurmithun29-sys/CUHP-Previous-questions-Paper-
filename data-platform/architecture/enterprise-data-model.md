# Enterprise Data Model

## 1. Overview
The CUHP Question Bank Enterprise Data Model defines the core entities, relationships, and data abstractions required to support the entire academic platform, including operational systems, analytical workloads, and the AI platform.

The model is provider-neutral and designed to integrate seamlessly with MongoDB (document model) while supporting export/synchronization to relational models or data lakes.

## 2. Master Data Domains

### 2.1 Academic Organization Domain
* **Departments**: Academic units (e.g., Computer Science, Mathematics).
* **Programs**: Degree programs offered by departments (e.g., B.Tech, M.Sc).
* **Courses**: Curricular definitions of study units.
* **Subjects**: Distinct knowledge areas mapped to courses.
* **Academic Sessions**: Time-bound operational periods (e.g., Fall 2026, Spring 2027).

### 2.2 Personnel Domain
* **Students**: Enrolled individuals utilizing the platform for study and contribution.
* **Faculty**: Academic staff responsible for teaching, reviewing, and moderating question papers.
* *Note: Managed via a unified User identity model with role-based extensions.*

### 2.3 Core Application Domain
* **Question Papers**: The primary intellectual asset, encompassing metadata, file references, and validation state.
* **Repositories**: Logical groupings of papers, governed by access control policies.

### 2.4 Artificial Intelligence Domain
* **AI Knowledge Assets**: Vectorized representations, extracted text, chunked documents, and conversational context tailored for the RAG (Retrieval-Augmented Generation) pipeline.

## 3. Data Abstractions & Schemas

### Reusable Abstraction: Metadata Envelope
All enterprise entities should be wrapped in or inherit a standard metadata envelope for governance and lifecycle tracking.

```json
{
  "entityId": "uuid",
  "entityType": "string",
  "data": { ... core attributes ... },
  "metadata": {
    "createdBy": "userId",
    "createdAt": "timestamp",
    "updatedBy": "userId",
    "updatedAt": "timestamp",
    "version": "integer",
    "status": "enum (DRAFT, ACTIVE, ARCHIVED, DELETED)"
  },
  "governance": {
    "ownerId": "departmentId | userId",
    "stewardId": "userId",
    "classification": "enum (PUBLIC, INTERNAL, CONFIDENTIAL)",
    "retentionPolicyId": "uuid"
  }
}
```

## 4. Entity Relationships

* **Department** `1:N` **Program**
* **Program** `1:N` **Course**
* **Course** `1:N` **Subject**
* **Subject** `1:N` **Question Paper**
* **Academic Session** `1:N` **Question Paper**
* **Faculty** `1:N` (Moderates/Owns) **Question Paper**
* **Student** `1:N` (Contributes) **Question Paper**
* **Question Paper** `1:N` **AI Knowledge Assets**

## 5. Persistence Strategy
* **Operational Store**: NoSQL Document Database (MongoDB) for flexible schemas and fast read/write.
* **Analytical Store**: Data exported/synced via ETL to a columnar or relational analytical store for executive dashboards and reporting.
* **Vector Store**: Dedicated vector database (e.g., Pinecone/Milvus/Mongo Atlas Vector Search) for AI Knowledge Assets.
