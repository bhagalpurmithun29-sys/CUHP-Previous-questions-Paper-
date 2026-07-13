# Transformation Library

## 1. Overview
The Transformation Library provides reusable components for modifying raw data into analytics-ready dimensions and facts.

## 2. Supported Transformations

### 2.1 Data Cleaning & Normalization
* **Trim/Uppercase**: Standardizes text fields (e.g., standardizing department codes to uppercase).
* **Date Parsing**: Converts ISO-8601 strings or Unix Epochs into standardized `YYYY-MM-DD` formats and maps them to `time_key` integers.
* **Null Handling**: Replaces NULLs with default dimensional keys (e.g., `-1`).

### 2.2 Enrichment & Business Rules
* **Lookup Enrichment**: Fetches descriptive attributes from secondary tables (e.g., converting a raw `courseId` into a fully denormalized `course_name` and `credits`).
* **Derived Metrics**: Calculates values like `days_to_approve` (Approval Date - Upload Date).

### 2.3 Fact Preparation
* **Key Generation**: Translates natural keys from the operational DB into Surrogate Keys using Dimension lookups.
* **Aggregation**: Pre-aggregates high-frequency events (e.g., multiple raw download events rolled up into a daily summary) before loading into the warehouse.

## 3. Data Validation Rules
Before data is loaded, transformations pass through a validation layer:
* **Schema Validation**: Ensures data matches the target table schema.
* **Duplicate Detection**: Hashes row contents to prevent inserting the same transaction twice.
