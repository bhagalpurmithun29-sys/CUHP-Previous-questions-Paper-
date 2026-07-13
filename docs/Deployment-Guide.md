# Deployment Guide

## Strategies
- **Development**: Direct deployment on push to `development` branch.
- **Staging**: Blue/Green deployment to ensure zero-downtime validation on push to `staging`.
- **Production**: Canary/Rolling updates triggered by a GitHub Release publication.

## Environments
1. **Development**: Continuously updated with the latest integration code.
2. **Staging**: A replica of production for E2E testing and QA sign-off.
3. **Production**: Highly available environment with strict access controls.

## Rollback
If a deployment fails or introduces critical bugs, trigger the **Rollback Environment** workflow manually. Provide the Environment and the stable Git Commit SHA to restore the previous state.
