# Enterprise Academic Search & Discovery System

## Architecture

This module provides a unified search experience across the entire Academic Master Data structure (Schools, Departments, Courses, Semesters, Subjects). It aggregates disparate collections into a unified, paginated, and strictly typed response, allowing users to discover academic entities rapidly.

### Backend Components

- **Controller (`search.controller.ts`)**: Manages inputs for global search queries and localized autocomplete requests.
- **Service (`search.service.ts`)**: 
  - Resolves metadata queries across MongoDB using `Promise.all` to query 5 collections concurrently without heavily taxing a single thread.
  - Implements fuzzy `RegExp` matching against Entity Names and Codes.
  - Populates relational paths dynamically (e.g., mapping a matched Subject back to its Course and Semester) to provide a rich context `path` string.
- **Routes (`search.routes.ts`)**: Mounted under `/api/v1/search`.

### Frontend Components

- **Hooks (`useAcademicSearch.ts`)**: Custom TanStack Query implementations to cache complex searches, preventing redundant backend trips when users navigate back.
- **Components**:
  - `SearchBar.tsx`: A visually prominent floating search bar with a built-in dropdown for real-time `autocomplete` matching.
  - `ResultCard.tsx`: Standardized display card applying contextual styling (colors/icons) based on the entity type being rendered.
  - `SearchFilters.tsx`: Controls allowing scoping down to specific levels (e.g., only search Subjects) or Status.
- **Page (`AcademicSearchPage.tsx`)**: The master container managing pagination and orchestrating the queries.

## Performance Enhancements

- **Debounced Autocomplete**: Autocomplete queries wait 300ms before dispatching to the API, preventing request spam.
- **Minimum Query Length**: Autocomplete won't run unless the query is at least 2 characters.
- **Concurrent DB Queries**: Uses unblocking `Promise.all()` to fan-out queries to all 5 database collections simultaneously rather than sequentially.

## Future Recommendations

While `RegExp` across MongoDB collections is sufficient for the current scale, scaling this to thousands of concurrent users across a massive question bank dataset should ideally transition this component to use a dedicated search index (e.g., MongoDB Atlas Search, Elasticsearch, or Algolia).

## Acceptance Checklist

- [x] Global search endpoint aggregating all 5 academic collections.
- [x] High-speed autocomplete endpoint for the floating dropdown.
- [x] Distinct visual badges for each hierarchy level in results.
- [x] Path resolution in results (e.g., School > Dept > Course).
- [x] Pagination controls.
