# Search Framework

## 1. Overview
The Search Framework orchestrates the processing of user queries, selecting the best retrieval strategy (Keyword, Semantic, or Federated) and combining the results into a unified, ranked list.

## 2. Retrieval Strategies

### 2.1 Keyword Search (Lexical)
* **Engine**: Elasticsearch / OpenSearch.
* **Use Case**: Exact matches (e.g., searching for a specific `Course Code` like "CS101" or a `Faculty Name`).
* **Features**: Autocomplete, Spell Correction, and Query Suggestions (e.g., "Did you mean...?").

### 2.2 Semantic Search
* **Engine**: Vector Database (e.g., Pinecone, Milvus) powered by LLM embeddings.
* **Use Case**: Concept and intent-aware search. If a user searches "machine learning", it successfully returns papers tagged with "artificial intelligence" or "neural networks", even if the exact keyword is missing.

### 2.3 Federated Discovery
* **Use Case**: When a query requires data from disparate, non-indexed systems (e.g., querying a live third-party university library API alongside the local Question Bank). The Federated engine fans out the query and merges the results.

## 3. Filtering & Faceting
* Results must be filterable by standard facets: `Date`, `Department`, `Subject`, and `Content Type` (e.g., Question Paper vs. Syllabus).
* Facets update dynamically based on the current result set.
