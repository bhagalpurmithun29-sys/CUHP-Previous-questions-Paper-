# Developer Guide & Operations Manual

## 1. Developer Guide: Creating a Subscriber
* Implement the `ISubscriber` interface.
* **Idempotency**: Before processing the payload, query your local database to check if the `eventId` has already been processed. If yes, return an ACK immediately.
* **Batch Consumption**: When possible, consume events in batches to optimize database inserts (e.g., batching `SearchPerformed` events for analytics).

## 2. Developer Guide: Creating a Publisher
* Never publish directly from a UI controller. Publish events deep in the service layer after the primary database transaction succeeds.
* Wrap the payload in the standard Event Envelope.

## 3. Operations: Monitoring and Lag
* **Subscriber Lag**: The most critical metric. If a subscriber's lag exceeds 10,000 messages, it indicates processing failure or insufficient compute resources.
* **Alerting**: Operations receives automated alerts for Lag, High DLQ counts, and Failed schema validations.

## 4. Operations: Dead Letter Queue (DLQ) Management
* Events that fail `MAX_RETRIES` end up in the DLQ.
* **Resolution**: Inspect the payload. If it was a code bug, deploy a fix and run the `Replay` API endpoint to push the DLQ events back into the main queue. If the payload is malformed/poison, discard it.
