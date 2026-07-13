# Enterprise AI Safety, Guardrails, Access Control & Content Moderation

## 1. Folder Tree

```text
frontend/src/features/ai-safety/
├── components/
│   ├── BlockedRequests.tsx
│   ├── CitationCompliance.tsx
│   ├── GuardrailRules.tsx
│   ├── ModerationQueue.tsx
│   ├── OutputValidation.tsx
│   ├── PolicyOverview.tsx
│   └── SafetyEvents.tsx
├── hooks/
│   └── useAISafety.ts
└── pages/
    └── AISafetyDashboardPage.tsx

backend/src/
├── controllers/
│   └── aiSafety.controller.ts
├── repositories/
│   └── policy.repository.ts
├── routes/
│   └── aiSafety.routes.ts
└── services/
    └── aiSafety/
        ├── guardrailEngine.service.ts
        ├── moderation.service.ts
        ├── outputValidation.service.ts
        ├── permissionEnforcement.service.ts
        └── promptValidation.service.ts
```

## 2. Architecture

- **Gateway Interception**: The AI Safety module sits at the Gateway layer. EVERY prompt and generated output must pass through the `GuardrailEngine` before executing or being returned to the user.
- **Service Segregation**:
  - `promptValidation.service.ts`: Detects injection attacks (e.g., "ignore previous instructions") via Regex/heuristics.
  - `outputValidation.service.ts`: Ensures the generated text contains valid repository citations (when `requiresCitations` is true) and does not output restricted info.
  - `permissionEnforcement.service.ts`: Pre-flight check before hitting the RAG layer; validates that the `userId` has appropriate RBAC access to the requested `documentIds`.
  - `moderation.service.ts`: If output validation fails but is recoverable, it's pushed to the queue. An Admin must manually approve or reject the payload.
- **Security Audit Logs**: All blocked requests, missing citations, and unauthorized attempts are logged into `policy.repository.ts` as Security Events for compliance tracking.

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: AI Safety & Guardrails API
  version: 1.0.0
paths:
  /api/v1/ai-safety/validate-request:
    post:
      summary: Validates an incoming prompt against safety policies and RBAC.
      requestBody:
        content:
          application/json:
            schema:
              properties:
                prompt: { type: string }
                documentIds: { type: array, items: { type: string } }
  /api/v1/ai-safety/validate-response:
    post:
      summary: Validates an outgoing AI response (checks citations, limits).
      requestBody:
        content:
          application/json:
            schema:
              properties:
                responseText: { type: string }
                context: { type: object }
  /api/v1/ai-safety/policies:
    get:
      summary: Get active guardrail policies
  /api/v1/ai-safety/events:
    get:
      summary: Get recent security audit logs (Blocked attempts, injections)
  /api/v1/ai-safety/moderation:
    get:
      summary: Get pending AI outputs requiring human moderation
  /api/v1/ai-safety/moderate:
    post:
      summary: Approve or Reject a moderated output
      requestBody:
        content:
          application/json:
            schema:
              properties:
                itemId: { type: string }
                resolution: { type: string, enum: [APPROVED, REJECTED] }
```

## 4. Security Operations Guide

- **Dashboard**: The `AISafetyDashboardPage` is restricted to `admin` and `moderator` roles.
- **Monitoring Events**: The right panel (Security & Audit Logs) polls every 10 seconds. Red dots indicate blocked attacks. Orange dots indicate flagged responses missing citations.
- **Moderation Queue**: If an AI response attempts to hallucinate or cannot provide a citation when required, it stops at the Moderation Queue. A human must click "Approve Output" to release it to the user, or "Reject & Block" to scrub it.
- **Active Guardrails**: Shows the currently enforced rules. The `Anti-Injection Guard` is priority 1 and operates before the prompt reaches the LLM.

## 5. Acceptance Checklist

- [x] Implemented Pre-flight prompt validation (Input Guardrails).
- [x] Implemented Post-flight response validation (Output Guardrails).
- [x] Context/Document level permission enforcement.
- [x] Required citation checks configured (Missing Evidence flags).
- [x] Human-in-the-loop Moderation Queue (Approve/Reject).
- [x] Security Events logging mechanism (Blocked/Flagged tracking).
- [x] Dashboard UI built with Tailwind v4, accessible, and reactive.
- [x] APIs secured by RBAC (`protect` and `restrictTo('admin', 'moderator')`).
