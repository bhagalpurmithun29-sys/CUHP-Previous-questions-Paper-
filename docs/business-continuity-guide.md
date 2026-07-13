# Business Continuity Plan (BCP)

## Recovery Objectives
- **Recovery Point Objective (RPO)**: 1 Hour (Maximum acceptable data loss).
- **Recovery Time Objective (RTO)**: 4 Hours (Maximum acceptable downtime during catastrophic regional failure).

## High Availability
The platform relies on Kubernetes horizontal scaling across Availability Zones (AZ) and Managed DB Replica Sets. Single-zone failures will not result in downtime.

## Backup Testing
- Automated integrity validation runs nightly.
- Table-top Disaster Recovery exercises occur quarterly.
