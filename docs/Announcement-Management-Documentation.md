# Enterprise Announcement, Circular & Notice Management System

## 1. Folder Tree

```text
frontend/src/features/announcements/
├── components/
│   ├── AnnouncementCard.tsx
│   ├── AnnouncementEditor.tsx
│   ├── AnnouncementFilters.tsx
│   ├── AnnouncementList.tsx
│   ├── AttachmentPanel.tsx
│   ├── PinnedAnnouncements.tsx
│   ├── PublishScheduler.tsx
│   └── ReadAcknowledgements.tsx
├── hooks/
│   └── useAnnouncements.ts
└── pages/
    ├── AnnouncementCenterPage.tsx
    └── CreateAnnouncementPage.tsx

backend/src/
├── controllers/
│   └── announcement.controller.ts
├── models/
│   └── Announcement.model.ts
├── repositories/
│   └── announcement.repository.ts
├── routes/
│   └── announcement.routes.ts
└── services/
    └── announcements/
        ├── acknowledgement.service.ts
        ├── announcement.service.ts
        ├── publishing.service.ts
        ├── queueWorker.service.ts
        └── scheduling.service.ts
```

## 2. Architecture

- **Data Models**: Central `Announcement` model supports complex arrays for `targetRoles`, `targetDepartments`, and `targetSchools`. It also tracks `acknowledgedBy` and `readCount`.
- **Targeted Visibility**: The backend `announcement.repository.ts` inspects the user's `$or` conditions to only surface notices intended for their specific roles or departments, ensuring precise role-based visibility.
- **Background Publishing**: `scheduling.service.ts` allows draft announcements to transition to `PUBLISHED` on a cron tick, which subsequently triggers the `queueWorker.service.ts` to push into the enterprise Notification Center.
- **Frontend Triage**: The `AnnouncementCenterPage` provides category filtering (Notices, Circulars, Alerts) and displays pinned announcements at the top with distinct visual boundaries. It also supports explicit user read acknowledgements.

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: Announcement Management API
  version: 1.0.0
paths:
  /api/v1/announcements:
    get:
      summary: Retrieve a paginated list of announcements matching the user's role and department.
      parameters:
        - in: query
          name: type
          schema: { type: string }
    post:
      summary: Create a new announcement (Admin/Faculty only).
  /api/v1/announcements/{id}:
    get:
      summary: Retrieve specific announcement details.
    put:
      summary: Update a draft announcement.
    delete:
      summary: Delete an announcement.
  /api/v1/announcements/{id}/publish:
    post:
      summary: Publish a draft announcement immediately.
  /api/v1/announcements/{id}/acknowledge:
    post:
      summary: Mark the announcement as acknowledged by the current user.
```

## 4. Acceptance Checklist

- [x] Implemented rich text Announcements Model and Repositories.
- [x] Generated Backend REST APIs mapped to the Announcement Controller.
- [x] Built the `AnnouncementCenterPage` public notice board.
- [x] Built the `CreateAnnouncementPage` for drafting and scheduling.
- [x] Integrated `ReadAcknowledgements` for visual read tracking.
- [x] Added `AnnouncementFilters` for rapid category triage.
- [x] Secured routes restricting creation to Admins and authorized roles.
- [x] Simulated background Queue Worker service for dispatching to the Notification Center.
- [x] Created `docs/Announcement-Management-Documentation.md`.
