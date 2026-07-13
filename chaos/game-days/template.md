# Game Day Scenario: Regional Database Outage

## Pre-Requisites
- [ ] Staging Environment provisioned.
- [ ] Synthetic load generator active.
- [ ] `Site Reliability Team` approvals logged.

## Hypothesis
If the primary MongoDB node is forcefully terminated, the Replica Set will elect a new primary within 10 seconds without dropping more than 5% of in-flight requests.

## Execution
1. Trigger `fault-injection/db-node-kill.yaml`.
2. Monitor `observability/dashboards`.
3. Record Time to Recovery (TTR).

## Post-Mortem & Lessons Learned
- *To be filled by the Observer after execution.*
