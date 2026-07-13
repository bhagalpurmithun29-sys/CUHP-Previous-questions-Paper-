# Search Architecture Documentation

## 1. Objective
Design a provider-neutral search architecture supporting structured, semi-structured, and unstructured information sources, unifying Lexical, Semantic, and Graph-based retrieval.

## 2. Architecture Components

### 2.1 The Retrieval Engine (Routing)
When a query hits `/api/v1/search`, the query parser identifies the intent.
* If it contains an exact entity (e.g., "CS101"), it heavily weights the **Lexical Index** (Elasticsearch).
* If it is a natural language question (e.g., "papers about machine learning algorithms"), it heavily weights the **Semantic Vector Store**.

### 2.2 The Ranking Engine
Results from all indices (Lexical, Semantic, Federated) are merged. The Ranking engine applies business logic:
1. **Relevance**: BM25 (Lexical) + Cosine Similarity (Semantic).
2. **Freshness**: Newer Question Papers receive a slight score boost.
3. **Popularity**: Highly downloaded papers receive a score boost.

### 2.3 The Indexing Pipeline (Separation of Concerns)
* Indexing logic is strictly separated from retrieval logic.
* **Incremental Updates**: A Kafka consumer listens to the Event Bus (e.g., `QuestionPaperApproved` event) and pushes the new document to the Elasticsearch and Vector indices in near real-time.

## 3. Security & Permissions (RBAC)
Search results apply Row-Level Security (RLS) dynamically.
* **Super Administrator / Researchers**: Unrestricted search across all metadata.
* **Students**: Can only search approved, published Question Papers.
* **Faculty**: Can search Draft and In-Review papers within their own department.
