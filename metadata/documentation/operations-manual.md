# Metadata Governance Guide & Operations Manual

## 1. Data Stewardship Workflow
* **Orphan Datasets**: If the auto-crawler detects a new table without an assigned owner, it flags it as an "Orphan".
* **Review Cycle**: Data Stewards must review their assigned datasets quarterly. They receive an automated alert to verify that the business descriptions and tags remain accurate.

## 2. Dataset Certification Workflow
1. A Business Analyst proposes that `Fact_Uploads` be certified as Gold.
2. The request routes to the Data Steward via the Approval Workflow.
3. The Steward reviews the Data Quality Trust Score. If > 95, they approve the certification.
4. The catalog updates the visual badge, and the `Dataset Certified` audit log is recorded.

## 3. Operations: Incremental Synchronization
* Full crawls of the DW are expensive. Operations configure Incremental Synchronization using Webhooks from the ETL Orchestrator. When a schema change is deployed via CI/CD, the deployment script pings the Metadata API to trigger a targeted update of just the modified tables.

## 4. Metadata Analytics Tracking
* Operations monitors the `Metadata Completeness` dashboard.
* **Goal**: 100% of tables must have a Data Owner. 90% of columns must have a business description mapped from the Business Glossary.
* **Alerting**: If completeness drops due to new un-documented schemas being merged, alerts are sent to Data Engineering to enforce documentation during code review.
