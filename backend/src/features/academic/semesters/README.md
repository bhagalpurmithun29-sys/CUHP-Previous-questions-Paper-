# Enterprise Semester Management System

## Architecture

This module manages the fourth tier in the Academic Master Data hierarchy: the **Semester**. Semesters strictly belong to a parent **Course** (and implicitly to a Department and School). They act as the primary temporal container for **Subjects** and **Question Papers**.

### Backend Components

- **Controller (`semester.controller.ts`)**: Provides REST endpoints for fetching paginated semesters, fetching specific semesters, creating, updating, archiving, restoring, and executing soft deletes.
- **Service (`semester.service.ts`)**: 
  - Validates that the provided `courseId` exists and is active.
  - Ensures a `semesterNumber` cannot exceed the `totalSemesters` defined on the parent Course.
  - Prevents duplicate `semesterNumber` assignments within the same Course.
  - Handles the `isCurrentSemester` toggle: If a semester is marked as current, the service atomistically unsets the flag on any other semester within the same Course.
  - Computes `isOdd` automatically based on the `semesterNumber`.
  - Ensures a semester cannot be deleted if it has active `Subjects` mapped to it.
  - Dispatches logs to `AuthAuditLog` to record (`SEMESTER_CREATED`, `SEMESTER_UPDATED`, etc.).
- **Routes (`semester.routes.ts`)**: 
  - Read routes (`GET /`) are open to authenticated users.
  - Write operations are tightly restricted to `UserRole.ADMIN` and `UserRole.SUPER_ADMIN`.
- **Integration**: Mounted inside the root routes as `/api/v1/semesters`.

### Frontend Components

- **Hooks**: 
  - `useSemesters.ts`: Wraps TanStack Query to manage fetches with complex filters (Search, Status, Course Mapping, Current Flag) and pagination.
  - `useSemester.ts`: Handles individual record mutations (Update, Archive, Restore, Delete) with cache invalidation strategies.
- **Pages**:
  - `SemesterManagementPage.tsx`: The primary dashboard featuring Grid/Table views, dynamic filtering, and a Framer Motion-powered slide-down creation form.
  - `SemesterDetailsPage.tsx`: Detail view that visualizes the academic timeline and maps the relational lineage (Course -> Semester -> Subjects).
- **Widgets**:
  - `CourseSelector.tsx`: An isolated dropdown component connecting to the Course API for mapping.
  - `SemesterForm.tsx`: A Zod-validated client form handling complex temporal configurations (Academic Year, Session, Start/End Dates, Current Semester Toggle).
  - `SemesterTable.tsx` / `SemesterCard.tsx`: Display components optimized for data-dense academic records, complete with visual Badges for current semesters.
  - `DeleteSemesterDialog.tsx`: Safely guards the destructive delete action with a clear warning regarding downstream Subject dependencies.

## Performance Enhancements

- **Deep Population Strategy**: When querying semesters, `courseId` is populated with a lean projection, which recursively populates `departmentId` and `schoolId` to present a full lineage without massive overhead.
- **Atomic Updates**: Managing the `isCurrentSemester` flag involves a single `updateMany` operation before saving the target document.

## Acceptance Checklist

- [x] Full CRUD operations available with Zod validation.
- [x] Hard requirement enforced: Every Semester must belong to a Course.
- [x] Limit check enforced: Semester number cannot exceed Course's total semesters.
- [x] Current Semester toggle logic implemented (only one per course).
- [x] Safeguards preventing deletion of Semesters containing active Subjects.
- [x] Timeline / Date mapping (Academic Year, Session, Start/End Dates).
- [x] Archive / Restore workflows implemented.
- [x] Audit tracking via `AuthAuditLog` system established.
- [x] UI responsive and accessible (WCAG 2.2 AA).
