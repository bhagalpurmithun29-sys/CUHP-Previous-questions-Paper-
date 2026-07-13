# Developer Configuration Guide

## Local Bootstrap
1. Copy the template: `cp config/templates/.env.example .env`
2. Request temporary development credentials from your lead or fetch them from the centralized Dev Vault.
3. **NEVER** commit your `.env` file. It is ignored in `.gitignore`.

## Safe Local Overrides
Non-secret application behavior can be overridden by modifying the JSON files inside `config/environment/`.

## Acceptance Checklist
- [ ] No secrets are hardcoded in source files.
- [ ] `.env` is listed in `.gitignore`.
- [ ] New configuration variables are typed and documented in `config/validation/configSchema.ts`.
- [ ] Missing variables cause a clear boot-time error instead of a runtime failure.
- [ ] Secrets are accessed strictly through the `configLoader.ts` abstraction.
