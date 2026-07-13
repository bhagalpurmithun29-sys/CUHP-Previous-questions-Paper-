# Open Policy Agent (OPA) Rules Placeholder
package cuhp.security

default allow = false

# Ensure all containers run as non-root
deny[msg] {
  input.kind == "Deployment"
  not input.spec.template.spec.securityContext.runAsNonRoot
  msg = "Containers must not run as root (Privilege Escalation Prevention)"
}
