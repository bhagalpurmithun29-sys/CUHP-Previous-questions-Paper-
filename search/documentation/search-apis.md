# Enterprise Search APIs

## 1. Objective
Provide unified, high-performance search endpoints abstracting the complexity of lexical, semantic, and federated retrieval.

## 2. Query APIs
* `GET /api/v1/search?q={query}` - Main search endpoint. Supports faceting via query params (e.g., `&department=science`).
* `GET /api/v1/search/autocomplete?q={partial_query}` - Fast, cached endpoint for type-ahead suggestions.
* `GET /api/v1/search/related/{document_id}` - Returns semantically similar documents based on vector distance.

## 3. Knowledge Graph APIs
* `GET /api/v1/graph/entities/{id}/explore` - Returns the localized sub-graph of relationships for a given node (e.g., all courses and papers linked to a specific Faculty member).

## 4. Indexing Administration APIs
* `POST /api/v1/search/index/sync` - Triggers an incremental index update from the Data Warehouse.
* `POST /api/v1/search/index/rebuild` - Triggers a full, destructive re-index (Super Admin only).
