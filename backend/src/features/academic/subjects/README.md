# Enterprise Subject Management System

## Architecture

This module manages the fifth and final tier in the core Academic Master Data hierarchy: the **Subject**. Subjects are mapped strictly to a parent **Semester**, which intrinsically provides linkage to the specific Course, Department, and School.

### Backend Components

- **Controller (`subject.controller.ts`)**: Provides complete REST API operations including pagination, details fetching, creation, modification, soft archiving, restoration, and soft deletion.
- **Service (`subject.service.ts`)**:
  - Enforces cross-collection relational validation (ensures provided `semesterId` exists).
  - Automatically derives and saves the `courseId`, `departmentId`, and `schoolId` based on the selected `semesterId`.
  - Ensures uniqueness of `subjectCode` globally across the database.
  - Ensures uniqueness of `subjectName` scoped strictly within a specific `courseId` (allowing multiple courses to share common generic subject names like "Mathematics I" without collision, so long as codes differ).
  - Calculates aggregated total hours (`lectureHours` + `tutorialHours` + `practicalHours`) automatically if omitted.
  - Provides naive circular dependency protection by ensuring a subject cannot assign itself as a prerequisite.
  - Generates comprehensive `AuthAuditLog` entries for strict administrative tracking.
- **Routes (`subject.routes.ts`)**: Clean integration with authentication and role-based permissions (`ADMIN`, `SUPER_ADMIN`).

### Frontend Components

- **Hooks**:
  - `useSubjects.ts` / `useSubject.ts`: Handles client-side API caching, optimistic queries, and invalidation upon mutations using TanStack Query.
- **Pages**:
  - `SubjectManagementPage.tsx`: Complex management dashboard featuring grid/table views and nested filters for Subject Type, Status, and complex text search.
  - `SubjectDetailsPage.tsx`: Specialized view focusing on the L-T-P (Lecture-Tutorial-Practical) distribution metrics and detailed linkage mapping.
- **Components**:
  - `SemesterSelector.tsx`: Abstracted select component for navigating the Course-Semester hierarchy when assigning a parent.
  - `PrerequisiteSelector.tsx`: Combobox component built with `Command` to facilitate mapping requisite subjects safely.
  - `SubjectForm.tsx`: Zod-validated input form with reactive elements that automatically total up contact hours as the user types.

## Design Highlights
- **Implicit Relational Mapping**: To prevent anomalous data (e.g. mapping a Subject to Semester A, but manually defining Course B), the API only takes `semesterId`, and derives all other relational bounds internally.
- **Duplication UX**: Provides a rapid "Duplicate" action in the UI, prepopulating a form with an existing subject's data for fast curriculum entry.

## Acceptance Checklist

- [x] Full CRUD operations available with Zod validation.
- [x] Implicit relational hierarchy maintained (Semester → Course → Department → School).
- [x] Unique validation for Subject Codes.
- [x] Duplicate Name validation scoped to the Course level.
- [x] Prerequisite self-assignment blocked.
- [x] Live L-T-P total hour calculations.
- [x] Integration with global `AuthAuditLog`.
- [x] High-performance dashboard with deep filtering capability.
