# Enterprise Secrets Management & Configuration Governance

## Overview
The CUHP Question Bank utilizes a provider-agnostic Secrets Management platform ensuring that sensitive credentials are never hardcoded or committed to source control.

## Secrets Management Strategy
- **External Vault Integration**: Secrets are stored in a secure enterprise vault (e.g., AWS Secrets Manager, Azure Key Vault, HashiCorp Vault).
- **Kubernetes Injection**: We utilize the `ExternalSecrets` operator to dynamically sync secrets from the vault into Kubernetes `Secret` objects at runtime.
- **Runtime Injection**: Secrets are mounted into application pods strictly as Environment Variables or in-memory volumes.

## Configuration Governance
- **Validation**: `zod` schema validation enforces that the application fails to start if required variables are missing or malformed (Fail-Fast principle).
- **Immutability**: Runtime configurations are `Object.freeze()`'d to prevent accidental or malicious runtime mutation.
- **Environment Overrides**: Non-sensitive variables are managed via JSON configs and ConfigMaps.

## Secret Rotation Workflow
1. Secrets are rotated in the Vault.
2. `ExternalSecrets` Operator fetches the updated secret on its `refreshInterval`.
3. CI/CD Pipeline or CronJob executes a rolling restart of the application pods to consume the new variables safely without downtime.
