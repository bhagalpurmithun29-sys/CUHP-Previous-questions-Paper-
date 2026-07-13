# Release Guide

## Release Management
We follow **Semantic Versioning** (vMAJOR.MINOR.PATCH).

1. Ensure the `main` branch is stable and all tests pass.
2. Trigger the `Release Management` workflow via GitHub Actions manual dispatch.
3. Input the semantic version (e.g., `v1.2.0`).
4. The workflow will:
   - Generate a `CHANGELOG.md` based on Git history.
   - Tag the repository.
   - Create a GitHub Release with notes.
5. Publishing the release automatically triggers the `Deploy Production` workflow.
