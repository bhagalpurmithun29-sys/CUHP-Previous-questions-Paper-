# Operations Guide

## Routine Maintenance
- **Patching**: Managed at the compute layer via golden images or managed services.
- **Scaling**: Modify `instance_count` or `auto_scaling` variables in the environment's `terraform.tfvars`.

## Acceptance Checklist
- [ ] Infrastructure code is formatted (`terraform fmt`).
- [ ] Configuration is validated (`terraform validate`).
- [ ] No hardcoded secrets exist in the codebase.
- [ ] Remote state is stored securely and locked (e.g., S3 + DynamoDB, or Azure Blob + Leases).
- [ ] Encryption at rest is enabled for all databases and storage buckets.
- [ ] Encryption in transit is enforced (HTTPS/TLS).
- [ ] Least privilege IAM roles are configured.
- [ ] Network ACLs and Security Groups/Firewall rules only allow necessary traffic.
- [ ] Policy checks (e.g., Checkov, OPA) pass successfully.
