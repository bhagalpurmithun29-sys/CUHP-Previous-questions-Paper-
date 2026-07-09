# Enterprise Advanced Upload Wizard & Ingestion Pipeline

## Architecture

This module handles the secure ingestion of digital assets (PDF/DOCX) into the CUHP platform. It acts as the gateway between end-user files and the internal Question Paper Repository.

### Backend Components
- **Upload Service (`upload.service.ts`)**: 
  - **Duplicate Detection**: Intercepts `paperCode` collisions before touching the storage layer.
  - **Hierarchical Inference**: Relies on the provided `subjectId` to rebuild the entire academic tree (Course, Dept, School) mapping.
  - **Background Worker Queue Simulation**: Once a record is successfully written to MongoDB, the service enqueues jobs (e.g. `OCR_EXTRACTION`, `AI_METADATA_EXTRACTION`) simulating an asynchronous Redis/BullMQ worker environment.
- **Upload Controller (`upload.controller.ts`)**: Secure API endpoint processing incoming multipart data.

### Frontend Components
- **Upload Wizard (`UploadWizardPage.tsx`)**: 
  - A comprehensive 3-step stepper UI.
  - **Step 1**: Intuitive File Dropzone utilizing HTML5 Drag & Drop APIs.
  - **Step 2**: Intensive Metadata mapping form ensuring all strictly relational data (Academic Year, Subject, Exam Type) is captured safely.
  - **Step 3**: Final Review and Commitment phase.
- **Hooks (`useUploadWizard.ts`)**: Encapsulates TanStack Query mutations to post the payload and trigger success toasts, immediately routing the user back to the repository upon completion.

## Integration & Workflow
- **Moderation Default**: Every upload defaults to `PENDING_REVIEW`. Immediate visibility on the platform is prohibited to prevent spam/corrupt file ingestion.
- **Audit Compliance**: `AuthAuditLog` captures the exact user, IP address, and timestamp of the `UPLOAD_STARTED` action for strict administrative traceability.
