# GRC Architecture

## Design
The Governance, Risk, and Compliance (GRC) module abstracts away specific regulatory frameworks (e.g., SOC2, ISO27001) in favor of a universal **Control Library**. These controls map dynamically to institutional requirements.

## Audit Automation
Instead of manual screenshots, the platform integrates via `audit/evidence/collector.ts` to automatically query the SOC, release management, and API Gateway for configuration validations, achieving Continuous Compliance.
