# Operations & Acceptance Checklist

## Operations Documentation
- **Rolling Updates**: `helm upgrade cuhp-app ./helm --set image.tag=<new_tag>`
- **Rollback**: `helm rollback cuhp-app <revision>`
- **Scaling Override**: `kubectl scale deployment backend-api --replicas=5`

## Acceptance Checklist
- [ ] Dockerfiles use slim/alpine base images.
- [ ] Dockerfiles run under non-root users.
- [ ] Startup, Liveness, and Readiness probes are configured.
- [ ] Kubernetes manifests define resource `requests` and `limits`.
- [ ] Horizontal Pod Autoscaler (HPA) limits are sane.
- [ ] Secrets are NOT hardcoded (using `secretKeyRef` or external vault integration).
- [ ] Local development overrides (`docker-compose.dev.yml`) support hot-reloading.
