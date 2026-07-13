# Enterprise Review Comments, Discussion Threads & Academic Collaboration Workspace

## 1. Folder Tree

```text
frontend/src/features/reviews/
├── components/
│   ├── ActivityTimeline.tsx
│   ├── AttachmentPanel.tsx
│   ├── CommentEditor.tsx
│   ├── DiscussionPanel.tsx
│   ├── InlinePDFComments.tsx
│   ├── MentionAutocomplete.tsx
│   ├── ResolutionStatus.tsx
│   ├── ThreadList.tsx
│   └── ThreadView.tsx
├── hooks/
│   └── useReviewWorkspace.ts
└── pages/
    └── ReviewWorkspacePage.tsx

backend/src/
├── controllers/
│   └── review.controller.ts
├── models/
│   ├── ReviewComment.model.ts
│   └── ReviewThread.model.ts
├── repositories/
│   └── review.repository.ts
├── routes/
│   └── review.routes.ts
└── services/
    └── reviews/
        └── discussion.service.ts
```

## 2. Architecture

- **Contextual Threads**: `ReviewThread` attaches directly to specific entity IDs (`resourceId`) like Question Papers or single Questions via `targetType`.
- **Review Workspace UI**: The `ReviewWorkspacePage` simulates a split-pane view with a document on the left and the `DiscussionPanel` on the right, providing contextual conversations.
- **Comment Data Model**: Stores rich-text markdown `content`, an array of user `mentions`, and maintains an edit `history`.
- **Thread Lifecycles**: Threads have strict statuses (OPEN, RESOLVED, REOPENED) to support rigorous moderation workflows.

## 3. Acceptance Checklist

- [x] Generated ReviewThread and ReviewComment Data Models.
- [x] Implemented DiscussionService and ReviewRepository.
- [x] Setup robust ReviewController and REST endpoints.
- [x] Developed React Query hooks (`useReviewWorkspace`).
- [x] Built the `ReviewWorkspacePage` interface.
- [x] Scaffolded deep collaboration components (InlinePDFComments, MentionAutocomplete).
