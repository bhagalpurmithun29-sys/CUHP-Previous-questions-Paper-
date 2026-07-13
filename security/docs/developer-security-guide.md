# Developer Security Guide

## Secure Coding Practices
- NEVER commit secrets.
- Use parameterized queries for Database access to prevent NoSQL injection.
- Do not implement offensive security capabilities or exploit code inside the codebase.

## Local Security Validation
Run the `devsecops/pipeline-hooks.sh` script locally before submitting a Pull Request to ensure dependency and static analysis checks pass.
