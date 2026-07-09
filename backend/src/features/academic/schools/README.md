# Enterprise School Management System

## Architecture

This module handles the top-tier entity in the Academic Master Data hierarchy: the **School**. It provides a robust interface for administrators to perform CRUD operations, track history, and maintain the integrity of the academic tree (e.g. preventing the deletion of a school that still has active departments).

### Backend Components

- **Controller (`school.controller.ts`)**: Defines REST endpoints for fetching paginated schools, retrieving a specific school with its relational statistics, creating, updating, archiving, restoring, and safely soft-deleting schools.
- **Service (`school.service.ts`)**: The business logic layer. 
  - Validates uniqueness of `schoolCode` and `schoolName`.
  - Ensures a school is not deleted if it has active departments.
  - Generates immutable audit trails in the `AuthAuditLog` collection whenever a school is created, updated, archived, restored, or deleted.
- **Routes (`school.routes.ts`)**: 
  - `GET /` and `GET /:id` are protected via JWT.
  - All write operations require `UserRole.ADMIN` or `UserRole.SUPER_ADMIN`.
- **Integration**: Mounted inside the root routes as `/api/v1/schools`.

### Frontend Components

- **Hooks**: 
  - `useSchools.ts`: Wraps TanStack Query to fetch paginated/filtered school lists and handles the creation mutation.
  - `useSchool.ts`: Fetches a single school by ID, and handles update, archive, restore, and delete mutations with proper cache invalidation.
- **Pages**:
  - `SchoolManagementPage.tsx`: The primary dashboard with a split View (Table vs Grid), integrated search/filtering, statistics cards, and a slide-down creation form (powered by Framer Motion).
  - `SchoolDetailsPage.tsx`: A read-only detail view of a specific school, displaying its properties and aggregated statistics (like department count).
- **Widgets**:
  - `SchoolForm.tsx`: A highly robust form validated client-side with Zod + React Hook Form.
  - `SchoolTable.tsx` / `SchoolCard.tsx`: Display components with dropdown actions.
  - `DeleteSchoolDialog.tsx`: Safely guards the destructive delete action with an alert dialog.
  - `SchoolFilters.tsx`: Handles sorting, filtering, and search state.
  - `SchoolStatistics.tsx`: Visual dashboard widgets summarizing system counts.

## Performance Enhancements

- Server-side pagination, sorting, and text indexing (`schoolName`, `schoolCode`) ensures performance at scale.
- Client-side data caching with TanStack query mitigates redundant API calls when switching tabs or coming back to the directory.
- Mongoose `.lean()` execution trims object hydration overhead.

## Acceptance Checklist

- [x] Full CRUD operations available with Zod validation.
- [x] Search, Filter, and Sort capabilities implemented server-side.
- [x] Table and Grid view layouts toggleable by users.
- [x] Archive / Restore workflows.
- [x] Safeguards preventing deletion of Schools containing Departments.
- [x] Integration with the `AuthAuditLog` system to track changes.
- [x] Responsive layout using Tailwind CSS.
- [x] Accessible UI utilizing Radix UI primitives.
