# Chaos Engineering & Fault Injection Architecture

## Safety-First Philosophy
Chaos experiments are executed via a custom abstraction that strictly parses target namespaces. It **denies** execution against `cuhp-prod` entirely unless an emergency override protocol is initiated by the Super Administrator.

## Validation Framework
The `recovery-validation/` modules automatically run assertions after a fault is injected. If the system fails to auto-recover within the expected RTO, a critical incident is opened, and the experiment halts via `emergencyStop` triggers.
