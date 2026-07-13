# CI/CD Pipelines

## Overview
The CUHP Question Bank CI/CD pipelines automate the building, testing, security auditing, and deployment of the platform across multiple environments using GitHub Actions.

## Workflows
- **Build (`build.yml`)**: Compiles code and runs type checks on PRs.
- **Test (`test.yml`)**: Executes unit and integration tests; enforces Quality Gates.
- **Lint (`lint.yml`)**: Ensures consistent code formatting via ESLint and Prettier.
- **Security (`security.yml`)**: Runs dependency audits, Checkov (for IaC), and Snyk.
- **Docker (`docker.yml`)**: Builds and tags immutable container images.

## Quality Gates
Pipelines fail if:
1. Test coverage is below 80%.
2. High-severity vulnerabilities are found in dependencies.
3. Linting or Type-checking errors occur.
