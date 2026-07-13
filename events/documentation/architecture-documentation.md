# EDA Architecture Documentation

## 1. Objective
Build a provider-neutral enterprise event platform enabling real-time communication, asynchronous processing, scalable messaging, and event-driven workflows across the CUHP platform.

## 2. Infrastructure Abstraction
To ensure provider neutrality, all microservices depend on abstract `IPublisher` and `ISubscriber` interfaces. The underlying implementation can be swapped (e.g., from RabbitMQ to Kafka or AWS EventBridge) via Dependency Injection at startup, without altering business logic.

## 3. High-Level Flow
1. **Producer**: Business service (e.g., Repository) commits a transaction to its DB.
2. **Outbox Pattern (Optional but recommended)**: The event is saved to an `outbox` table in the DB to guarantee at-least-once delivery, then published to the Event Bus.
3. **Event Bus**: Routes the event based on Topic or Priority.
4. **Consumer**: Subscribed services (e.g., OCR, Notifications) pull/receive the event, process it asynchronously, and acknowledge (ACK) it.

## 4. API Design (Administrative)
- `GET /api/v1/events/catalog` - Retrieve the Event Catalog.
- `GET /api/v1/events/monitoring/lag` - Check subscriber lag across groups.
- `POST /api/v1/events/replay` - Trigger a replay for a specific subscriber group and offset.

## 5. Security & Permissions
- **Super Administrator**: Full control, can purge queues and manually inject events.
- **Platform Operations Team**: Can trigger replays and manage DLQs.
- **Data Engineering Team**: Views schemas and consumer registries.
- **Read-only Architects**: Can view catalog and architecture diagrams.
