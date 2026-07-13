# Enterprise Collaboration Hub, Team Workspaces & Academic Knowledge Sharing Platform

## 1. Folder Tree

```text
frontend/src/features/workspaces/
├── components/
│   ├── KnowledgeBoard.tsx
│   ├── SharedBookmarks.tsx
│   ├── SharedResources.tsx
│   ├── WorkspaceActivityFeed.tsx
│   ├── WorkspaceAnnouncements.tsx
│   ├── WorkspaceMembers.tsx
│   ├── WorkspaceOverview.tsx
│   └── WorkspaceSearch.tsx
├── hooks/
│   └── useWorkspace.ts
└── pages/
    └── WorkspaceHomePage.tsx

backend/src/
├── controllers/
│   └── workspace.controller.ts
├── models/
│   └── Workspace.model.ts
├── repositories/
│   └── workspace.repository.ts
├── routes/
│   └── workspace.routes.ts
└── services/
    └── workspaces/
        └── workspace.service.ts
```

## 2. Architecture

- **Workspace Ecosystem**: The `Workspace` model aggregates `members`, `knowledgeBoards` (markdown notes), `sharedResources` (files/URLs), and an `activityFeed`.
- **Role Hierarchy**: Implements `OWNER`, `ADMIN`, `MODERATOR`, `MEMBER`, `GUEST` inside the workspace context, separate from global roles.
- **UI Structure**: `WorkspaceHomePage` implements a left-sidebar for navigation and a main tabbed container (`OVERVIEW`, `KNOWLEDGE_BOARD`, `RESOURCES`, `MEMBERS`) for deep collaboration.

## 3. Acceptance Checklist

- [x] Generated `Workspace` Mongoose Model with embedded sub-documents.
- [x] Created Service & Repository layers for Workspaces.
- [x] Secured routes and built controller methods.
- [x] Built the `WorkspaceHomePage` and `useWorkspace` React Query hook.
- [x] Generated stubs for Knowledge Board, Resources, and Member components.
