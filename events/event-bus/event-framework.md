# Event Framework & Bus Abstraction

## 1. Overview
The Event Framework provides a standard wrapper around the underlying message broker, ensuring that application code (`Repository`, `AI Platform`, `Authentication`) only interacts with generic interfaces like `IPublisher` and `ISubscriber`.

## 2. Supported Routing Patterns

### 2.1 Topic Routing
Standard Pub/Sub based on subjects. (e.g., all authentication events go to the `auth.events` topic).

### 2.2 Broadcast
A single event delivered to multiple independent subscriber groups. (e.g., `QuestionPaperUploaded` triggers OCR, Notification, and Analytics services).

### 2.3 Priority Routing
Expedited routing for critical events (e.g., `NotificationSent` for OTPs).

## 3. Reliability and Fault Tolerance

### 3.1 Retry Policies
Subscribers must implement exponential backoff for transient failures (e.g., external API downtime).

### 3.2 Dead Letter Queue (DLQ)
If an event fails processing after `MAX_RETRIES` (usually 3), it is moved to a DLQ for manual inspection to avoid poison message loops.

### 3.3 Event Replay
The event bus supports replaying past events by resetting the consumer offset for a specific subscriber group, allowing for backfilling of new services (e.g., a new Search Index can reconstruct state by replaying all historical `RepositoryUpdated` events).

### 3.4 Idempotency
Subscribers must be idempotent. Processing an event twice must yield the same result as processing it once, using unique `eventId` tracking in the subscriber's database.
