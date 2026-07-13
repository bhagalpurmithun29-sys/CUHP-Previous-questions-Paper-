# Traffic Management Operations Guide

## Modifying Rate Limits
1. Update `networking/rate-limiting/quota.yaml`.
2. Apply the configuration. The Gateway will automatically reload the policy caching layer.
3. Verify via `GET /gateway/status`.

## Initiating a Canary Release
1. Deploy the new service version (`v2-canary`).
2. Update `routing/virtual-service.yaml` to assign a 10% weight to `v2-canary`.
3. Monitor the Observability dashboards (Errors, Latency).
4. If successful, progressively shift weight to 100%.

## Troubleshooting Service Mesh
- Check `PeerAuthentication` if services return `503` or TLS handshake failures.
