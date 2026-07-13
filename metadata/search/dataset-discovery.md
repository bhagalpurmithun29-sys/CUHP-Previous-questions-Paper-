# Dataset Discovery Framework

## 1. Overview
The Dataset Discovery framework provides the search and exploration interface for the Metadata Catalog. It is powered by Enterprise Search (e.g., Elasticsearch or OpenSearch) to provide millisecond-latency results across thousands of assets.

## 2. Search Capabilities

### 2.1 Keyword & Semantic Search
Users can search using business terms (e.g., "Student performance last semester"). The engine maps these terms using the Business Glossary to surface the relevant `Fact_Downloads` and `Dim_Student` tables.

### 2.2 Faceted Search & Filtering
Analysts can narrow down results using dynamic facets:
* **Certification Filter**: Filter by Gold/Certified only.
* **Owner Search**: Show all datasets owned by a specific department or user.
* **Tag-based Search**: Filter by tags (e.g., `PII`, `Financial`, `AI-Ready`).
* **Source Type**: Filter by MongoDB, PostgreSQL, S3, or Snowflake.

### 2.3 Lineage-Aware Search
If a user searches for a downstream dashboard, the search results can also optionally include the upstream DW tables that feed that dashboard, allowing analysts to trace the data's origin.

## 3. Usage Analytics
The Discovery Engine tracks user queries to improve relevance:
* **Most Viewed Datasets**: Pushed to the top of search results.
* **Search Success Rate**: Tracks if a user clicked a result after searching. If low, signals a missing dataset or poor glossary tagging.
