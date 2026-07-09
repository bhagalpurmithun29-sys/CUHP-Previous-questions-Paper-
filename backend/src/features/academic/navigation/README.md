# Enterprise Academic Navigation & Hierarchy Explorer

## Architecture

This module provides the global structural navigation layer for the CUHP Question Bank. It unifies Schools, Departments, Courses, Semesters, and Subjects into a single, lazy-loaded tree structure.

### Backend Components

- **Controller (`hierarchy.controller.ts`)**: REST endpoints for fetching the tree nodes recursively or on-demand, fetching upward breadcrumb trails, and managing user-specific favorites/recents.
- **Service (`hierarchy.service.ts`)**: 
  - Iterates through the disjointed academic collections (`School`, `Department`, `Course`, `Semester`, `Subject`).
  - Implements lazy loading: the `getTree` function accepts a `parentId` and `type` to fetch exactly one level deep, preventing massive data transfers for large universities.
  - Implements reverse pathfinding (`getBreadcrumbs`) by looking up a leaf node and traversing parent references recursively up to the School level.
- **Routes (`hierarchy.routes.ts`)**: Secure routes mounted under `/api/v1/navigation`.

### Frontend Components

- **Hooks (`useAcademicNavigation.ts`)**: Wraps TanStack Query to fetch the tree lazily and handle favorites states.
- **Components**:
  - `AcademicSidebar.tsx`: A persistent, tabbed sidebar offering tree navigation and saved favorites.
  - `HierarchyTree.tsx` & `TreeNode.tsx`: A recursive component architecture mapping the API responses. `TreeNode` maintains local expanded state, triggering queries for its children only when clicked (Lazy Loading).
  - `AcademicExplorerPage.tsx`: The primary container view.

## Performance Enhancements
- **Lazy Evaluation**: The tree does not load the entire university structure on mount. Only Schools are loaded initially. Expanding a School loads its Departments, and so forth.
- **Virtualization Readiness**: The UI is structured to support virtualization (e.g. `react-window`) if node lists grow into the thousands.

## Acceptance Checklist

- [x] Backend tree resolution endpoint mapping cross-collection relationships.
- [x] Breadcrumb pathfinding API.
- [x] Recursive TreeNode component with animated `framer-motion` expand/collapse.
- [x] Lazy loading of children via TanStack Query.
- [x] Sidebar layout mapping.
