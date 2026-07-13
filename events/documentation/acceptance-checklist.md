# Events Platform Acceptance Checklist

## 1. Event Bus Architecture
- [ ] Provider-neutral interfaces (`IPublisher`, `ISubscriber`) defined.
- [ ] Routing patterns (Topic, Priority, Broadcast) implemented.
- [ ] Asynchronous processing and Backpressure awareness supported.

## 2. Event Catalog & Schemas
- [ ] Schema Registry rules (forward/backward compatibility) established.
- [ ] Event Definitions (UserRegistered, QuestionPaperUploaded, etc.) fully documented.
- [ ] Catalog available for Developer reference.

## 3. Reliability Mechanisms
- [ ] Idempotency strictly enforced on all Subscribers.
- [ ] Retry Policies (Exponential Backoff) configured.
- [ ] Dead Letter Queue (DLQ) implemented for poison messages.
- [ ] Event Replay capability tested and documented.

## 4. API & Permissions
- [ ] Administrative APIs (Lag monitoring, DLQ management, Replay) defined.
- [ ] RBAC (Super Admin, Ops Team, Data Eng, Architects) enforced.

## 5. Monitoring & Analytics
- [ ] Subscriber Lag and Processing Time tracked.
- [ ] Audit logs track `Event Published`, `Replayed`, `Subscriber Registered`.
- [ ] Analytics tracking Event Throughput and Delivery Success Rate.
