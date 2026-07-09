# Enterprise Academic Import, Export & Bulk Operations

## Architecture

This module implements the mass data management controls for the CUHP Question Bank platform. Because the university hierarchy (School -> Dept -> Course -> Sem -> Subject) is strictly relational, doing manual data entry for a syllabus of thousands of subjects is unfeasible. This bulk operations engine solves that.

### Backend Components

- **Controller (`import-export.controller.ts`)**: REST endpoints orchestrating batch payloads.
- **Service (`import-export.service.ts`)**: 
  - **Dry-Run Validation Engine**: Iterates over batch sets natively to verify entity uniqueness (e.g. `subjectCode`) and parent references (e.g. verifying `courseCode` exists before mapping a semester). It returns a complex validation report.
  - **Transactional Import**: Utilizes Mongoose Transactions (`session.startTransaction()`) when committing valid rows. If a DB failure occurs mid-insert, the entire payload is rolled back.
  - **Rollback Log**: Logs an array of raw ObjectIDs generated during the commit payload into an in-memory/DB array (`ImportTransactions`). 
  - **Rollback Engine**: Exposes a hard-delete utility that accepts a `transactionId` and forcibly erases all `insertedIds` attached to it, alongside generating an `AuthAuditLog` entry.
- **Routes (`import-export.routes.ts`)**: Secured behind `ADMIN`/`SUPER_ADMIN` RBAC middleware.

### Frontend Components

- **Page (`ImportExportPage.tsx`)**: High-level tabbed navigation allowing users to shift between importing, exporting, and managing history.
- **Import Wizard (`ImportWizard.tsx`)**: 
  - **Step 1: Upload**: File dropzone using a lightweight client-side CSV parser.
  - **Step 2: Validation UI**: Intercepts the dry-run response from the backend. Neatly separates "Ready to Import" vs "Errors Found" arrays, rendering exact line numbers and human-readable error messages for bad payload rows.
  - **Step 3: Commit**: Orchestrates the commit and triggers global TanStack Query invalidations to refresh the entire Academic module.
- **Hooks (`useImportExport.ts`)**: Centralizes the `axios` mutations.

## Relational Integrity

A crucial part of this module is preventing corrupt data mappings. 
For example, when bulk importing Departments:
- The system mandates the CSV includes the parent `schoolCode`.
- During the validation step, it queries the DB for `School.findOne({ schoolCode })`. 
- If found, it attaches the true Mongo `schoolId` to the parsed JSON. If not, the row is marked as a failure.

## Acceptance Checklist

- [x] Client-side CSV parser and Drag/Drop uploader.
- [x] Dry-run validation API and detailed Error Reporting UI.
- [x] Transactional insertions.
- [x] Rollback capability via a logged `transactionId`.
- [x] Global data export API.
- [x] Integration with `AuthAuditLog`.
