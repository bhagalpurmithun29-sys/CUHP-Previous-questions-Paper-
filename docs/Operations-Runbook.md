# Platform Operations Runbook

This runbook outlines operational procedures for the CUHP Question Bank AI Platform.

## 1. Incident: AI Gateway Timeout / High Latency
**Symptoms**: Users report long load times; the Orchestration Dashboard shows Gateway Health in red.
**Response**:
- Navigate to `/admin/platform`.
- Check if a specific downstream provider (e.g., Anthropic) is causing the delay under `System Status`.
- Use the **Feature Flags** to toggle `experimental-routing` to route traffic away from the degraded provider, or manually disable the provider in the AI Admin NOC.

## 2. Incident: Safety Guardrails Blocking Valid Queries
**Symptoms**: Users complain that legitimate questions are blocked by the safety engine.
**Response**:
- Navigate to `/admin/safety`.
- Review the `ModerationQueue`.
- If the heuristic is too aggressive, an admin can temporarily disable `strict-safety` via the Orchestration Dashboard Feature Flags until the prompt template is adjusted.

## 3. Maintenance: Vector DB Synchronization
**Procedure**:
If new question papers are ingested, trigger a manual sync via the `Run Full Validation` or `Sync Vector Index` buttons in the NOC to force an embedding queue flush.
