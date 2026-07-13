# Report Builder & Ad-Hoc Analytics Framework

## 1. Overview
The Report Builder provides a self-service, no-code interface for Analysts and Department Heads to create custom reports based on trusted Semantic Models.

## 2. Builder Capabilities
- **Drag-and-Drop Designer**: Visually construct tables, charts, and scorecards.
- **Reusable Widgets**: Drop in predefined visuals (e.g., "Monthly Uploads Bar Chart").
- **Calculated Fields**: Users can define simple formulas (e.g., `(Uploads - Rejections) / Uploads`).
- **Data Manipulation**: Built-in support for Sorting, Grouping by dimensions, and Conditional Formatting (e.g., coloring cells red if < 50%).

## 3. Ad-Hoc Analytics Engine
The Ad-Hoc engine translates user interactions in the Report Builder into optimized Semantic Layer queries.
- **Dynamic Dimensions & Metrics**: Users select fields (e.g., `Course Name`, `Total Downloads`) which the backend resolves into standard SQL queries against the Data Warehouse.
- **Interactive Queries & Filters**: Reports are highly interactive. Users can save a "Saved Query" and apply reusable global filters (e.g., `Academic Year = 2026`).

## 4. Collaboration & Versioning
* **Drafts**: Reports can be saved as Drafts.
* **Version History**: Every save creates a new version. Users can roll back to a previous layout.
* **Approval Workflow**: A Data Analyst can create a report, but before it can be shared with "Executive Users", it must be approved by the Data Governance Team to ensure metric accuracy.
