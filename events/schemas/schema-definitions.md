# Schema Definitions & Governance

## 1. Core Event Envelope
All events must be wrapped in a standard JSON/Avro envelope for governance and routing.

```json
{
  "eventId": "uuidv4",
  "eventType": "UserRegistered",
  "eventVersion": "v1",
  "timestamp": "2026-07-14T00:26:44Z",
  "source": "cuhp.authentication.service",
  "correlationId": "uuidv4",
  "payload": { ... }
}
```

## 2. Compatibility Rules
The Schema Registry enforces backward and forward compatibility.
* Producers cannot remove fields or change field types.
* Producers can only add optional fields.
* Consumers must ignore unknown fields.

## 3. Domain Event Payloads

* `UserRegistered` / `UserLoggedIn`: Contains userId, role, and ipAddress.
* `QuestionPaperUploaded`: Contains paperId, uploaderId, metadata snippet.
* `QuestionPaperApproved`: Contains paperId, approverId, timestamp.
* `RepositoryUpdated`: Summarizes changes in a specific repository partition.
* `OCRCompleted`: Contains paperId, status (SUCCESS/FAILED), confidenceScore.
* `AIAnalysisCompleted`: Contains paperId, vectorId.
* `NotificationSent`: Contains recipientId, notificationType.
* `SearchPerformed`: Contains query string, filters, resultCount.
* `DownloadCompleted`: Contains paperId, downloaderId.
