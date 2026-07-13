# Enterprise Prompt Management, Template Library & Version Control

## 1. Folder Tree

```text
frontend/src/features/prompt-management/
├── components/
│   ├── ApprovalWorkflow.tsx
│   ├── PerformanceMetrics.tsx
│   ├── PromptEditor.tsx
│   ├── PromptList.tsx
│   ├── PromptTester.tsx
│   ├── PromptVersionHistory.tsx
│   ├── TemplateLibrary.tsx
│   └── VariableManager.tsx
├── hooks/
│   └── usePromptManagement.ts
└── pages/
    └── PromptManagementPage.tsx

backend/src/
├── controllers/
│   └── promptManagement.controller.ts
├── repositories/
│   └── promptManagement.repository.ts
├── routes/
│   └── promptManagement.routes.ts
└── services/
    └── promptManagement/
        ├── approval.service.ts
        ├── promptRepository.service.ts
        ├── promptTesting.service.ts
        ├── template.service.ts
        └── versionControl.service.ts
```

## 2. Architecture

- **Centralized Storage**: All prompts (System, Task, RAG Context) across the entire platform must be queried from this centralized `promptManagement.repository.ts`. Application services should NOT contain hardcoded prompt templates.
- **Service Segregation**: 
  - `promptRepository.service.ts`: Handles CRUD operations for base prompt definitions.
  - `template.service.ts`: Extracts `{{variables}}` via regex and processes string interpolation.
  - `versionControl.service.ts`: Manages rollback capabilities and publishing, keeping older schemas in the array.
  - `approval.service.ts`: Facilitates the DRAFT -> REVIEW -> APPROVED -> PUBLISHED pipeline.
  - `promptTesting.service.ts`: Mock environment simulating AI execution to validate dynamic injections without burning real tokens.
- **Permissions**: Hard-locked to `Admin` role by default in `promptManagement.routes.ts`.

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: Prompt Management API
  version: 1.0.0
paths:
  /api/v1/prompt-management:
    get:
      summary: Get all prompts
    post:
      summary: Create a new prompt (starts in DRAFT status)
  /api/v1/prompt-management/test:
    post:
      summary: Test a prompt with injected variables
      requestBody:
        content:
          application/json:
            schema:
              properties:
                content: { type: string }
                variables: { type: object }
  /api/v1/prompt-management/extract-variables:
    post:
      summary: Parse content and return list of required {{variables}}
  /api/v1/prompt-management/{id}/publish:
    post:
      summary: Promote an APPROVED version to PUBLISHED.
  /api/v1/prompt-management/{id}/rollback:
    post:
      summary: Revert the `currentVersion` to an older PUBLISHED version.
  /api/v1/prompt-management/{id}/request-approval:
    post:
      summary: Move a DRAFT to REVIEW.
  /api/v1/prompt-management/{id}/approve:
    post:
      summary: Move a REVIEW to APPROVED.
```

## 4. Prompt Engineering Guide

1. **Variables**: Use double curly braces for interpolation. Example: `You are an AI assisting with {{subject_name}}.`
2. **Types**: Categorize prompts accurately (SYSTEM, TASK, RAG, TEMPLATE). The gateway will filter based on these flags.
3. **Drafting**: Create a draft. The system will auto-detect variables on the frontend. Use the `Prompt Tester` panel on the right side of the dashboard to simulate injection.
4. **Publishing**: Click 'Save Draft' -> 'Request Review' -> 'Approve' -> 'Publish' in the Version History list.

## 5. Acceptance Checklist

- [x] Provides a 3-column UI for prompt engineering, workflow, and testing.
- [x] Detects `{{variables}}` in real-time and populates the Tester inputs.
- [x] Includes a `PromptTestingService` that simulates AI responses for debugging.
- [x] Allows explicit versioning (Publish vs Rollback).
- [x] Fully protected API (accessible only to Admin/Prompt Engineer roles).
- [x] Tracks Performance Metrics (Usage, Latency, Approval Rate).
- [x] Strict state-machine workflow enforced (DRAFT -> REVIEW -> APPROVED -> PUBLISHED).
- [x] UI Styled with Tailwind v4, accessible, and theme compliant.
