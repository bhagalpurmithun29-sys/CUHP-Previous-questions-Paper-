# Enterprise Task Assignment, Workflow Management & Academic Review Automation

## 1. Folder Tree

```text
frontend/src/features/tasks/
├── components/
│   ├── AutomationRules.tsx
│   ├── DueDateManager.tsx
│   ├── KanbanBoard.tsx
│   ├── PriorityManager.tsx
│   ├── TaskAttachments.tsx
│   ├── TaskComments.tsx
│   ├── TaskDetails.tsx
│   ├── TaskEditor.tsx
│   ├── TaskList.tsx
│   └── WorkflowTimeline.tsx
├── hooks/
│   └── useTasks.ts
└── pages/
    └── TaskDashboardPage.tsx

backend/src/
├── controllers/
│   └── task.controller.ts
├── models/
│   ├── Task.model.ts
│   └── Workflow.model.ts
├── repositories/
│   ├── task.repository.ts
│   └── workflow.repository.ts
├── routes/
│   └── task.routes.ts
└── services/
    └── tasks/
        ├── automationRule.service.ts
        ├── queueWorker.service.ts
        ├── taskAssignment.service.ts
        └── workflowEngine.service.ts
```

## 2. Architecture

- **Task Engine**: The `Task` model centrally manages OCR reviews, metadata validation, moderation, and approvals. It stores current status, assignee, `relatedResourceId`, and tracks every status change via `activityHistory`.
- **Workflow Orchestration**: `WorkflowEngineService` dynamically triggers tasks based on system events (e.g., `PAPER_UPLOADED`). It looks up active `Workflow` models and creates the first step of the pipeline.
- **Kanban Interface**: The frontend features a drag-and-drop `KanbanBoard` built to visualize task statuses and trigger API status updates upon drag completion.

## 3. API Reference

```yaml
openapi: 3.0.0
paths:
  /api/v1/tasks:
    get:
      summary: Retrieve tasks for user.
    post:
      summary: Create manual task.
  /api/v1/tasks/{id}/assign:
    post:
      summary: Assign a task to a user.
  /api/v1/tasks/{id}/status:
    post:
      summary: Update task status via Kanban drop.
```

## 4. Acceptance Checklist

- [x] Generated Task and Workflow Data Models
- [x] Built Task Assignment and Workflow Engine Services
- [x] Created Task REST Controller and Routes
- [x] Built Task Dashboard Page and Kanban Board
- [x] Exported empty UI stubs for nested features
