# Search Developer Guide

## 1. Introduction
This guide provides technical instructions for developers extending the Enterprise Search platform, focusing on adding new data sources, modifying ranking algorithms, and integrating with the Semantic and Lexical engines.

## 2. Integrating a New Data Source
When introducing a new entity to the CUHP ecosystem (e.g., `Research Papers`), developers must map it to the search indices.

### 2.1 Lexical Mapping (Elasticsearch/OpenSearch)
1. **Define the Mapping**: Create a strict schema definition for the new entity, specifying which fields are full-text searchable (e.g., `title`, `abstract`) and which are filterable exact-match keywords (e.g., `department_id`, `author_id`).
2. **Configure Analyzers**: Apply the custom `cuhp_academic_analyzer` which handles standard stop words and tokenizes academic prefixes.

### 2.2 Semantic Mapping (Vector Database)
1. **Chunking Strategy**: For long-form text (like PDFs), implement a chunking strategy (e.g., 512 tokens with a 50-token overlap) before embedding.
2. **Embedding Pipeline**: Route the chunks through the AI Platform's embedding model (e.g., `text-embedding-3-small`) and store the resulting vectors alongside the metadata payload.

## 3. Modifying the Ranking Engine
The Ranking Engine combines scores from multiple systems. Developers can adjust weights in the configuration file (`ranking_config.yaml`).
* **Lexical Weight (w1)**: Default 0.4
* **Semantic Weight (w2)**: Default 0.4
* **Popularity Boost (w3)**: Default 0.1
* **Freshness Boost (w4)**: Default 0.1

*Formula*: `Final Score = (Lexical * w1) + (Semantic * w2) + (Popularity * w3) + (Freshness * w4)`

## 4. Query Engine Integration
* Use the unified `/api/v1/search` endpoint from frontends. The backend query engine abstracts the complexity of federating the query out to the respective data stores and executing the scoring formula.
