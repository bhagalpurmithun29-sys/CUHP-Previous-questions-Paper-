# Enterprise Integration Operations Manual

## 1. Centralized Command Center
Operations manages the platform not as 14 isolated apps, but as a single ecosystem.
* **Runbooks**: Located in `data-platform/runbooks/`. Step-by-step guides for standard procedures (e.g., "How to execute a full Enterprise Search re-index").
* **Playbooks**: Located in `data-platform/playbooks/`. Incident response plans for when things break (e.g., "Kafka Event Bus outage", "Data Warehouse OOM error").

## 2. Operations: Validating the Stack
* **Incremental Validation**: The Validation Engine runs synthetic transactions every 5 minutes (a "Heartbeat" test) to ensure the Operational -> Analytical flow is healthy.
* **Analytics Freshness**: Operations monitors a global dashboard tracking the "Freshness" of the Executive Dashboards. If the DW pipeline stalls, the Dashboards will serve stale data. Operations must intercept this and display a "Data Stale" warning banner on the Executive UI.

## 3. Auditing & Certification
* When a major release occurs, Operations clicks `Generate Certification` in the admin portal.
* The system tracks `Analytics Validation Started` and `Certification Generated`. 
* Once the CDO signs off, the `Platform Approved` event triggers the final CI/CD pipeline to push the code to Production.
