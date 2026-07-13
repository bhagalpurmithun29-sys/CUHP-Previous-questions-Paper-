# Operations Runbook - Security Operations

## Triage Process
1. Alert is generated via `threat-detection/rules.yml`.
2. Incident is automatically created via `POST /security/incidents`.
3. SOC Analyst classifies severity and assigns status `INVESTIGATING`.
4. Follow the corresponding `security/playbooks/*.md`.

## Auditing
Any update to incident status, threat detection configuration, or policy updates are written directly to the centralized Audit Log.
