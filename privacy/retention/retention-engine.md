# Retention Engine & Policies

## 1. Overview
The Retention Engine enforces automated data expiration based on configurable retention policies, preventing the unbounded growth of data and mitigating legal exposure.

## 2. Retention Categories
Data is classified into categories, each with a defined lifespan:
* **Academic Records (e.g., Question Papers)**: 10 Years from upload date.
* **Audit Logs & Telemetry**: 1 Year from creation.
* **Student Analytics Data**: 3 Years post-graduation.

## 3. Automated Expiration
* A background worker (e.g., Cron job running nightly) evaluates all records against their mapped Retention Category.
* If `current_date > (creation_date + retention_period)`, the record is flagged for the next phase in its Lifecycle (e.g., Archival or Purge).

## 4. Legal Hold & Exceptions
* **Legal Hold**: Overrides automated deletion. If a dataset or a specific user is placed under Legal Hold (e.g., due to an active audit or investigation), the Retention Engine suspends all archival/purge operations on that data.
* **Audit Evidence**: Any deletion that is blocked by a Legal Hold is logged as `Suspended Deletion` to maintain compliance evidence.
