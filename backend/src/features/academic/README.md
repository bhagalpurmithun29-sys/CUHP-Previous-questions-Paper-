# Academic Master Data Platform

## Architecture

This module implements the core Academic Master Data hierarchy for the CUHP Question Bank platform. All other modules (like question paper submissions, student profiles, and search algorithms) rely on this foundational structure.

### Academic Hierarchy Map

`University (Implicit) -> School -> Department -> Course -> Semester -> Subject`

### Backend Components

- **Controllers**: `AcademicController` handles HTTP requests for all 5 tiers of the hierarchy, plus a unified Dashboard Overview and Tree view.
- **Services**: `AcademicService` encapsulates the business logic for creating entities, enforcing unique constraints, and eagerly populating the `$lookup` joins (using Mongoose `populate`) to build the recursive hierarchy tree.
- **Routes**: Mounted at `/api/v1/academic`. 
  - `GET` routes are protected for authenticated users (`protect`), facilitating dropdown menus across the site.
  - `POST`, `PUT`, `DELETE` operations are strictly guarded via `restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN)`.
- **Models Used**: Resuses existing models from `backend/src/models`:
  - `School.model.ts`
  - `Department.model.ts`
  - `Course.model.ts`
  - `Semester.model.ts`
  - `Subject.model.ts`

### Frontend Components

- **Hooks**: `useAcademic.ts` abstracts TanStack React Query mutations and queries, handling automated cache invalidation upon entity creation.
- **Pages**: `AcademicManagementPage.tsx` acts as the control panel, composing the managers and tree view.
- **Managers**:
  - `SchoolManager.tsx`
  - `DepartmentManager.tsx`
  - `CourseManager.tsx`
  - `SemesterManager.tsx`
  - `SubjectManager.tsx`
- **Widgets**:
  - `AcademicTree.tsx`: A recursive visual tree representing the data dependencies.
  - `BreadcrumbNavigation.tsx`: Standardized navigational aid.

## API Specification (Swagger)

```yaml
paths:
  /api/v1/academic:
    get:
      summary: Retrieve academic statistical overview
      tags: [Academic Data]
  /api/v1/academic/tree:
    get:
      summary: Retrieve deeply nested academic hierarchy tree
      tags: [Academic Data]
  /api/v1/academic/{entity}:
    get:
      summary: Retrieve list of schools/departments/courses/semesters/subjects
      tags: [Academic Data]
    post:
      summary: Create new entity (Admin Only)
      tags: [Academic Data]
```

## Performance Enhancements

- **Query Optimization**: The `/tree` API heavily leans on `.lean()` to drastically reduce overhead when building the multi-level hierarchy map.
- **State Management**: Using `react-query` ensures that the hierarchy dropdowns are cached client-side and only re-fetched when mutations execute.

## Acceptance Checklist

- [x] CRUD logic established for all 5 hierarchy layers.
- [x] Backend relationships mapped utilizing ObjectId refs.
- [x] Visual Hierarchy Tree component built.
- [x] Unified administration page with tab-based interface.
- [x] Tanstack query hooks developed for all layers.
- [x] Admin permission logic enforced on mutation routes.
- [x] Duplicate code checks enforced (e.g. `subjectCode`, `courseCode`).
