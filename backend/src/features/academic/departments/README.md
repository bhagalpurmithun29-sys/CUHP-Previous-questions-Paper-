# Enterprise Department Management System

## Architecture

This module handles the second tier in the Academic Master Data hierarchy: the **Department**. Departments strictly belong to a parent **School** and serve as the container for **Courses**.

### Backend Components

- **Controller (`department.controller.ts`)**: Defines REST endpoints for fetching paginated departments, retrieving a specific department with its parent school populated, creating, updating, archiving, restoring, and safely soft-deleting departments.
- **Service (`department.service.ts`)**: The business logic layer.
  - Validates existence and active status of the assigned `schoolId`.
  - Ensures uniqueness of `departmentCode` globally and `departmentName` within the same School.
  - Ensures a department is not deleted if it has active courses mapped to it.
  - Integrates with the `AuthAuditLog` collection to produce an immutable trail for (`DEPARTMENT_CREATED`, `DEPARTMENT_UPDATED`, etc.).
- **Routes (`department.routes.ts`)**: 
  - Read routes (`GET /`) are open to authenticated users.
  - Write operations are tightly restricted to `UserRole.ADMIN` and `UserRole.SUPER_ADMIN`.
- **Integration**: Mounted inside the root routes as `/api/v1/departments`.

### Frontend Components

- **Hooks**: 
  - `useDepartments.ts`: Uses TanStack Query to manage fetching with complex filters (Search, Status, School Mapping) and creation.
  - `useDepartment.ts`: Manages single entity operations including Update, Archive, Restore, and Delete with cache invalidation rules that sync back to the main directory.
- **Pages**:
  - `DepartmentManagementPage.tsx`: The primary dashboard with a split View (Table vs Grid), integrated search/filtering, parent school filters, and a slide-down creation form (powered by Framer Motion).
  - `DepartmentDetailsPage.tsx`: Detail view focusing on mapping relationships (School -> Department -> Courses).
- **Widgets**:
  - `SchoolSelector.tsx`: An isolated, cached dropdown component that loads active Schools for mapping during creation/editing.
  - `DepartmentForm.tsx`: A robust Zod-validated form handling required parent school assignments.
  - `DepartmentTable.tsx` / `DepartmentCard.tsx`: Display components with quick actions.
  - `DeleteDepartmentDialog.tsx`: Safely guards the destructive delete action with an alert dialog emphasizing downstream dependencies.
  - `DepartmentFilters.tsx` & `DepartmentStatistics.tsx`: UI modules for high-level administration tracking.

## Performance Enhancements

- **Deep Population Strategy**: When querying departments, `schoolId` is populated with a lean projection (`schoolName schoolCode status`) to prevent over-fetching.
- **Server-side Pagination**: Filtering and sorting are entirely processed via Mongoose to maintain linear scalability.
- **Client Caching**: TanStack Query minimizes refetching of static School lists (via `SchoolSelector`).

## Acceptance Checklist

- [x] Full CRUD operations available with Zod validation.
- [x] Hard requirement enforced: Every Department must belong to a School.
- [x] Safeguards preventing deletion of Departments containing active Courses.
- [x] Search, Filter, and Sort capabilities implemented server-side.
- [x] Archive / Restore workflows implemented.
- [x] Audit tracking via `AuthAuditLog` system established.
- [x] UI responsive and accessible (WCAG 2.2 AA).
