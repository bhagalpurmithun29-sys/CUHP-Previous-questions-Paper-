# Enterprise Course Management System

## Architecture

This module handles the third tier in the Academic Master Data hierarchy: the **Course**. Courses strictly belong to a parent **Department** (and implicitly to a **School**), and serve as the container for **Semesters** and **Subjects**.

### Backend Components

- **Controller (`course.controller.ts`)**: Exposes REST endpoints for fetching paginated courses, retrieving a specific course, creating, updating, archiving, restoring, and safely soft-deleting courses.
- **Service (`course.service.ts`)**: 
  - Validates the existence and active status of the assigned `departmentId`.
  - Derives and attaches the `schoolId` implicitly based on the parent Department.
  - Ensures uniqueness of `courseCode` globally, and `courseName` within the same Department.
  - Ensures a course is not deleted if it has active `Semesters` mapped to it.
  - Integrates with the `AuthAuditLog` collection for full action traceability (`COURSE_CREATED`, `COURSE_UPDATED`, etc.).
- **Routes (`course.routes.ts`)**: 
  - Read routes (`GET /`) are open to authenticated users.
  - Write operations are tightly restricted to `UserRole.ADMIN` and `UserRole.SUPER_ADMIN`.
- **Integration**: Mounted inside the root routes as `/api/v1/courses`.

### Frontend Components

- **Hooks**: 
  - `useCourses.ts`: Uses TanStack Query to manage data fetching with complex filters (Search, Status, Department Mapping) and pagination.
  - `useCourse.ts`: Handles individual operations (Update, Archive, Restore, Delete) with precise cache invalidation.
- **Pages**:
  - `CourseManagementPage.tsx`: Primary dashboard supporting Grid and Table views, rich filtering, and rapid course creation.
  - `CourseDetailsPage.tsx`: Detailed breakdown showing structural mappings (School -> Department -> Course -> Semesters) and curriculum statistics.
- **Widgets**:
  - `DepartmentSelector.tsx`: An isolated dropdown component connecting to the Department API.
  - `CourseForm.tsx`: Zod-validated configuration for creating complex course setups (Durations, Semesters, Credits).
  - `CourseTable.tsx` / `CourseCard.tsx`: Reusable, responsive display components.
  - `DeleteCourseDialog.tsx`: Safely guards deletion, verifying no dependent active Semesters exist.

## Performance Enhancements

- **Deep Population Strategy**: When querying courses, both `departmentId` and `schoolId` are populated with a lean projection to prevent over-fetching.
- **Server-side Pagination**: Filtering and sorting are entirely processed via Mongoose.
- **Derived Architecture**: The `schoolId` is derived on the backend, reducing frontend request payloads and guaranteeing data integrity.

## Acceptance Checklist

- [x] Full CRUD operations available with Zod validation.
- [x] Hard requirement enforced: Every Course must belong to a Department.
- [x] Implicit derivation of `schoolId` implemented.
- [x] Safeguards preventing deletion of Courses containing active Semesters.
- [x] Rich metadata capabilities (Program Type, Degree Type, Durations, Semesters).
- [x] Archive / Restore workflows implemented.
- [x] Audit tracking via `AuthAuditLog` system established.
- [x] UI responsive and accessible (WCAG 2.2 AA).
