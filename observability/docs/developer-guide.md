# Observability Developer Guide

## Usage
- **Logging**: Use `logger.info()`, `logger.error()`. NEVER use `console.log`.
- **Metrics**: Use `metrics.recordDbQuery()` wrapping repository functions.
- **Tracing**: Always pass `correlationId` to downstream HTTP requests or queue messages.

## Acceptance Checklist
- [ ] No passwords/tokens in logs.
- [ ] Correlation IDs attached to every log line within a request scope.
- [ ] External HTTP calls are instrumented for tracing.
- [ ] All new APIs include metric tracking.
