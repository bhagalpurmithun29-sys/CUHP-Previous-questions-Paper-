# Event Catalog

## 1. Purpose
The Event Catalog is the source of truth for all domain events. It documents producers, consumers, and SLAs to prevent cross-team communication friction.

## 2. Event Registry

| Event Type | Producer(s) | Subscriber(s) | Description | Priority |
|---|---|---|---|---|
| `UserRegistered` | Authentication | Analytics, Audit Logs | New user onboarding. | High |
| `UserLoggedIn` | Authentication | Analytics, Security | Session creation. | Normal |
| `QuestionPaperUploaded` | Repository | OCR Pipeline, Notifications | Paper awaiting moderation. | High |
| `QuestionPaperApproved` | Repository | AI Platform, Search Index, Notifications | Paper ready for indexing. | High |
| `OCRCompleted` | OCR Pipeline | Repository, AI Platform | OCR text extraction finished. | Normal |
| `AIAnalysisCompleted` | AI Platform | Repository, Analytics | Vectorization complete. | Normal |
| `SearchPerformed` | Repository | Analytics | Search term tracking. | Low |
| `DownloadCompleted` | Repository | Analytics | Paper downloaded. | Low |
| `NotificationSent` | Notifications | Audit Logs | Email/Push dispatched. | Normal |

## 3. Producer and Consumer Roles
* **Producers** are responsible for event schema correctness and timely publication.
* **Consumers** are responsible for managing their own offsets, backpressure, and retry logic.
