# Search Developer Guide & Operations Manual

## 1. Developer Guide: Adding a New Index
When a new domain concept is introduced (e.g., `StudyMaterial`), developers must:
1. Define the Entity in the `knowledge-graph/` relationships.
2. Update the ETL pipeline to push `StudyMaterialCreated` events to the Event Bus.
3. Add a Kafka Consumer in the `indexing/` module to ingest the event and write the text payload to Elasticsearch (Lexical) and the embedding API (Semantic).

## 2. Operations: Search Result Caching
* **Caching**: The autocomplete endpoint (`/api/v1/search/autocomplete`) and common query results are cached in Redis for high throughput.
* **Cache Invalidation**: Cache TTL is 5 minutes. Real-time accuracy is sacrificed slightly for sub-10ms response times.

## 3. Operations: Analytics & Continuous Improvement
Operations must monitor the `Zero Result Searches` dashboard.
* If a high volume of users search for a term that yields 0 results (e.g., "Generative AI"), it indicates a gap in the ontology.
* **Action**: Operations should map "Generative AI" as a synonym to "Machine Learning" in the Ontology definitions, instantly fixing the search gap without requiring new content uploads.
