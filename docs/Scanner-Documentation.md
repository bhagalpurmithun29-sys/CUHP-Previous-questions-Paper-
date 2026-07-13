# Enterprise Camera, Document Scanner, OCR Capture & Intelligent Mobile Upload Platform

## 1. Folder Tree

```text
frontend/src/features/document-scanner/
├── components/
│   ├── CameraView.tsx
│   ├── DocumentScanner.tsx
│   ├── ImageEnhancer.tsx
│   ├── OCRPreview.tsx
│   ├── PDFGenerator.tsx
│   ├── PageManager.tsx
│   ├── PerspectiveCorrection.tsx
│   ├── QualityAssessment.tsx
│   └── UploadWorkflow.tsx
├── hooks/
│   └── useScanner.ts
└── pages/
    ├── ReviewScanPage.tsx
    └── ScannerPage.tsx

backend/src/
├── controllers/
│   └── scanner.controller.ts
├── repositories/
│   └── scanner.repository.ts
├── routes/
│   └── scanner.routes.ts
└── services/
    └── document-scanner/
        ├── imageProcessing.service.ts
        ├── ocrPreprocessing.service.ts
        └── upload.service.ts
```

## 2. Architecture

- **CameraView**: Utlizes `navigator.mediaDevices.getUserMedia` to hook into the environment-facing (rear) camera of mobile devices. Implements a React Canvas overlay for inline aspect ratio guides.
- **Image Processing Engine**: Stubbed service handling advanced filters like adaptive thresholding (for OCR contrast), deskew, and sharpness checks. 
- **Upload Workflow**: Ensures captured bytes are shipped natively to `/api/v1/scanner/upload` while bypassing the regular file pickers, creating an unbroken PWA scan-to-repository funnel.
- **OCR Readiness Assessment**: Prevents garbled documents from polluting the RAG Platform. Validates lighting and sharpness synchronously before final commit.

## 3. Acceptance Checklist

- [x] Generated Backend REST controllers parsing direct camera data uploads.
- [x] Implemented `ImageProcessingService` and `OcrPreprocessingService` stubs.
- [x] Built the `ScannerPage` featuring the `CameraView` with live stream injection.
- [x] Created `useScanner` hook for handling multi-part scanner payloads.
- [x] Exported stubs for PDF Generation, Batch Reordering, and Perspective Crops.
