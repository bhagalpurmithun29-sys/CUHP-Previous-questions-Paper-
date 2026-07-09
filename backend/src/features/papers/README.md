# Enterprise Question Paper Repository

## Architecture

This is the core storage and management module for the CUHP Question Bank. It acts as a Digital Library bridging uploaded files (via Storage layers like Cloudinary/S3) with strict relational metadata mapped against the Academic Core.

### Backend Components

- **Model (`paper.model.ts`)**: A highly structured Mongoose schema capturing extensive metadata (Marks, Duration, Exam Type) alongside five hard links mapping upwards through the hierarchy (Subject -> Semester -> Course -> Dept -> School). This "denormalized linking" approach guarantees lightning-fast filtering without complex `$lookup` aggregations during runtime.
- **Service (`paper.service.ts`)**: 
  - Validates and extrapolates hierarchical links strictly based on the provided `subjectId`.
  - Implements the complete lifecycle (Draft -> Pending Review -> Approved/Rejected).
  - Handles secure soft deletion.
- **Controller & Routes (`paper.controller.ts`, `paper.routes.ts`)**: Follows the strict RBAC model (Faculty can upload; Moderators/Admins approve).

### Frontend Components

- **Repository Dashboard (`PaperRepositoryPage.tsx`)**: An advanced browsing interface offering real-time toggleable views (Grid/List) heavily integrated with TanStack Query for debounced searching and paginated fetching.
- **Paper Detail View (`PaperDetailsPage.tsx`)**: A rich visual representation of a single document's metadata, displaying its full "Academic Lineage" path and tracking the status of background jobs like AI Analysis and OCR pipelines.
- **Hooks (`usePaperRepository.ts`)**: Orchestrates all API communications.

## Lifecycle Management
Every uploaded paper initially lands in a `PENDING_REVIEW` status (unless uploaded by an Admin). The detail page conditionally renders Approve/Reject actions based on this state, which executes mutations driving the `updateStatus` service logic. 

## Acceptance Checklist

- [x] Complex relational schema capturing AI/OCR status alongside hierarchy links.
- [x] Secured API routes restricted by User Roles.
- [x] High-performance Dashboard with toggleable Grid/Table layouts.
- [x] Lineage path visualization in the Details page.
- [x] Integrated `AuthAuditLog` tracking for all lifecycle events (Approval/Rejection).
