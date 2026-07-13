# Operations Runbook

## Handling Alerts
- **APIHighErrorRate**: Check logs for specific endpoint failures. Verify Database health.
- **HighLatency**: Investigate tracing to find bottlenecks (DB slow queries or external API delays).
- **DatabaseDown**: Verify Mongo connection string, check cloud provider status, and initiate DR protocol if necessary.

## Health Degradation
If `/health/ready` fails, Kubernetes will automatically stop routing traffic to the affected pod until it recovers.
