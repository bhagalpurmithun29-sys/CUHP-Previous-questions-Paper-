# CUHP Question Bank - Infrastructure Architecture

## Overview
This document outlines the cloud-agnostic infrastructure architecture for the CUHP Question Bank. The architecture uses clear abstractions, allowing for deployment on AWS, Azure, or Google Cloud.

## Architecture Diagram (Text)

```text
+---------------------------------------------------------------+
|                      Cloud Provider                           |
|                                                               |
|  +-----------------------+      +--------------------------+  |
|  |       DNS / CDN       | ---> |       Load Balancer      |  |
|  +-----------------------+      +--------------------------+  |
|                                              |                |
|  +-------------------------------------------v-------------+  |
|  |                     Virtual Network                     |  |
|  |                                                         |  |
|  |  +--------------------+      +-----------------------+  |  |
|  |  |   Public Subnet    |      |    Private Subnet     |  |  |
|  |  | (NAT, Bastion, UI) |      | (App Servers, API)    |  |  |
|  |  +--------------------+      +-----------------------+  |  |
|  |                                          |              |  |
|  |                              +-----------v-----------+  |  |
|  |                              |  Managed Database     |  |  |
|  |                              +-----------------------+  |  |
|  +---------------------------------------------------------+  |
|                                                               |
|  +-----------------------+      +--------------------------+  |
|  |    Object Storage     |      |  Monitoring & Security   |  |
|  | (Backups, Uploads)    |      | (Logs, Metrics, IAM)     |  |
|  +-----------------------+      +--------------------------+  |
+---------------------------------------------------------------+
```

## Provisioning Guide
1. **Prerequisites**: Install Terraform (v1.5+), Cloud Provider CLI, and configure credentials.
2. **Bootstrap**: Run `infrastructure/scripts/bootstrap/init-backend.sh` to set up remote state storage.
3. **Deploy**: Navigate to the target environment (`infrastructure/terraform/environments/development`) and execute:
   - `terraform init`
   - `terraform plan`
   - `terraform apply`

## Environment Guide
- **Local Development**: Uses Docker Compose for local testing (not managed by Terraform).
- **Development**: Deployed to a dedicated cloud account/subscription. Scaled down resources.
- **Testing/QA**: Dedicated environment mirroring Development for QA testing.
- **Staging**: Production-like environment for final validation before launch.
- **Production**: High Availability (HA) configuration, Multi-AZ deployments, strict security rules.

## Disaster Recovery Preparation
- **RPO**: 1 hour (Database Point-in-Time Recovery enabled).
- **RTO**: 4 hours (Automated Terraform redeployment + DB restore).
- **Backup Strategy**: Daily snapshots of databases and block storage, retained for 30 days. Object storage versioning enabled for data resilience.
