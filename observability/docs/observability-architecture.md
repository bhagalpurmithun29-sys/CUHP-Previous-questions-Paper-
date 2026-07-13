# Observability Architecture

## Standards
This platform adopts **OpenTelemetry (OTel)** standards to prevent vendor lock-in, enabling telemetry routing to Datadog, Prometheus/Grafana, or New Relic via simple configuration changes.

## Core Pillars
1. **Logging**: Structured JSON logging via Winston, with strict PII and credential redaction middleware.
2. **Metrics**: OTel/Prometheus meters tracking RPS, error rates, DB queries, and latency histograms.
3. **Tracing**: Distributed tracing via HTTP headers (`x-correlation-id`) ensuring trace continuity across microservices.
4. **Health Probes**: Strict separation of `/health/live` (process availability) and `/health/ready` (dependency availability).

## Security & Access
- All operational dashboards (Grafana, Kibana, etc.) are strictly isolated behind SSO for Admin/Operations roles.
- Audit logs track alerts acknowledged and configuration changes.
