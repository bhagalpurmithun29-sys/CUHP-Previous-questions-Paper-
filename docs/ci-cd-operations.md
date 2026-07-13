# CI/CD Operations & Acceptance Checklist

## Checklist
- [ ] Workflows are modular, utilizing composite actions where necessary.
- [ ] Secrets (Tokens, DB Passwords, Cloud Keys) are stored securely in GitHub Secrets and NEVER hardcoded.
- [ ] Infrastructure pipelines (`terraform apply`) run before application container deployments.
- [ ] Environments are protected (e.g., Production requires manual approval in GitHub settings).
- [ ] Container images are tagged immutably (using Git SHA) before publishing.
- [ ] Rollback pipeline is tested and functional.
