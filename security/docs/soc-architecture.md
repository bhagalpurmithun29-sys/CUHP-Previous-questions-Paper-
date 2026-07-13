# Security Operations Center (SOC) Architecture

## Overview
The CUHP SOC platform provides centralized threat detection, incident management, and vulnerability tracking. It is designed to be vendor-neutral, leveraging standard logging formats to easily integrate with SIEMs like Splunk, Datadog Security, or ELK.

## DevSecOps Integration
Security is shifted left into the CI/CD pipeline. `devsecops/pipeline-hooks.sh` enforces SAST, Dependency Scanning, Container Scanning (e.g., Trivy), and Infrastructure Policy Validation (OPA).

## Analytics & Tracking
The SOC tracks critical KPIs:
- **MTTD (Mean Time to Detect)**
- **MTTR (Mean Time to Respond)**
- **Security Health Score**
