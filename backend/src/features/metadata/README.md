# Enterprise Metadata Management & Validation Engine

## Architecture

This module provides a centralized governance layer for all Question Paper metadata. It ensures that data extracted from OCR/AI pipelines or inputted by Faculty maintains a high structural standard (Quality Score) before entering circulation.

### Backend Components
- **Model (`paperMetadataHistory.model.ts`)**: A strict time-series schema that logs every single field mutation (Old Value -> New Value) against a `paperId` and `editorId`.
- **Service (`metadata.service.ts`)**:
  - **Quality Calculator**: Evaluates a paper on the fly, deducting points for missing mandatory fields (Tags, Academic Year, Duration, Language).
  - **Hierarchical Re-mapping**: If an editor changes a paper's target `Subject`, the service automatically refetches and rewrites the parent `Course`, `Department`, and `School` IDs to prevent relational drift.
  - **Diff Engine**: Analyzes the incoming payload against the existing database record, dynamically generating an array of mutations to store in the History schema.
  - **Security Downgrade**: If metadata is altered on an `APPROVED` paper, the service automatically downgrades the paper back to `PENDING_REVIEW` to enforce moderator compliance.

### Frontend Components
- **Editor Dashboard (`MetadataManagementPage.tsx`)**: 
  - A split-view interface showing the Editor on the left and a live "Quality Score" widget on the right.
  - Includes a toggleable "Version History" timeline that consumes the backend history payload and renders a git-like diff view of field changes over time.
- **Form (`MetadataForm.tsx`)**: Integrates with the `useAcademicHierarchy` hook to provide dropdowns for relational data rather than free-text, enforcing validation at the UI layer.

## Acceptance Checklist
- [x] Dedicated Metadata History tracking (Who, When, What Changed).
- [x] Live Quality Scoring algorithm based on field completeness.
- [x] Safety-catch: Modifying metadata triggers a downgrade to `PENDING_REVIEW`.
- [x] Relational auto-reconciliation when Subject is changed.
