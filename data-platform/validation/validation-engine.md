# End-to-End Validation Engine

## 1. Overview
The Validation Engine runs automated, cross-module integration tests to ensure that an event at the source (MongoDB) correctly propagates all the way to the presentation layer (Executive Dashboard) without data loss, corruption, or privacy violations.

## 2. Core Validation Workflows

### 2.1 Operational Data Flow Validation
* **Test**: Inject a synthetic "Question Paper Uploaded" event into the Event Bus.
* **Assertions**:
  - Event schema validated by Registry.
  - Search Index updated within SLA (< 2 seconds).
  - ETL pipeline extracts event and loads into Staging.
  - Data Quality rule validates the Staging record.
  - DW Dimension/Fact tables update.

### 2.2 Analytics & KPI Validation
* **Test**: Query the Semantic Layer for a calculated metric (e.g., `Total Uploads`).
* **Assertions**:
  - The Semantic Layer value matches the raw SQL count of the DW Fact table.
  - The resulting KPI score on the Executive Dashboard matches the Semantic Layer.

### 2.3 Privacy & Compliance Validation
* **Test**: Apply a "Data Deletion Request" (DSAR) for a synthetic user.
* **Assertions**:
  - The user's record is dropped from the Operational DB.
  - The user's PII is masked or dropped from the DW.
  - The Knowledge Graph purges edges related to the user.
  - *Crucially*: Ensure the `Analytics Validation` confirms that aggregate metrics (e.g., "Total University Downloads") did *not* change, even though the specific PII was purged.
