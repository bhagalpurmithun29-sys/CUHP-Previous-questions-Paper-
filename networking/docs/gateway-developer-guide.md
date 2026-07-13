# API Gateway Developer Guide

## Registering New APIs
When deploying a new microservice:
1. Define the upstream service in the `gateway-config.yaml`.
2. Ensure you configure specific Rate Limits based on the endpoint's computation cost.
3. Validate connection pooling and timeouts (max 2 seconds per try).

## Acceptance Checklist
- [ ] All external API endpoints are routed via the API Gateway.
- [ ] Circuit Breakers are configured for any downstream dependencies.
- [ ] Internal microservices DO NOT accept plain-text HTTP (mTLS Strictly enforced).
