# Cloud-Native Architecture Guide

## Overview
The CUHP Question Bank platform utilizes a fully containerized, microservices-ready architecture orchestrated by Kubernetes.

## Containerization
- **Multi-Stage Builds**: Dockerfiles are split into build and runtime stages, significantly reducing image bloat and attack surface.
- **Non-Root Runtime**: All containers execute as limited-privilege users (`appuser` / `nodejs`).
- **Health Probes**: Deep integration with Kubernetes via Liveness, Readiness, and Startup probes.

## Orchestration (Kubernetes)
- **Horizontal Scaling**: Handled automatically via Horizontal Pod Autoscaler (HPA) targeting 75-80% CPU thresholds.
- **Pod Disruption Budgets (PDB)**: Ensures minimum availability during voluntary disruptions (e.g., node upgrades).
- **Network Policies**: Restricts cross-namespace and cross-pod communication following least-privilege principles.

## Package Management
The `kubernetes/helm/cuhp-app` Helm chart abstracts the environment configurations, making blue/green deployments and rollback functionality seamless.
