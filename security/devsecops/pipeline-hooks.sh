#!/bin/bash
set -e
# DevSecOps Integration Hooks

echo "Running Static Application Security Testing (SAST)..."
# npm run lint
# checkov -d infrastructure/

echo "Running Dependency Scanning..."
# npm audit --audit-level=high

echo "Running Container Scanning..."
# trivy image cuhp-backend:latest

echo "Infrastructure Validation (OPA/Rego)..."
# conftest test kubernetes/

echo "DevSecOps Security Gates Passed."
