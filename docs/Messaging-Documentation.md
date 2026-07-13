# Enterprise User Messaging, Academic Collaboration & Secure Communication Platform

## 1. Folder Tree

```text
frontend/src/features/messaging/
├── components/
│   ├── AttachmentPanel.tsx
│   ├── ChatWindow.tsx
│   ├── ConversationSearch.tsx
│   ├── ConversationSidebar.tsx
│   ├── GroupDetails.tsx
│   ├── MessageBubble.tsx
│   ├── MessageInput.tsx
│   ├── OnlineStatus.tsx
│   └── TypingIndicator.tsx
├── hooks/
│   └── useMessaging.ts
└── pages/
    └── MessagingPage.tsx

backend/src/
├── controllers/
│   └── messaging.controller.ts
├── models/
│   ├── Conversation.model.ts
│   └── Message.model.ts
├── repositories/
│   └── messaging.repository.ts
├── routes/
│   └── messaging.routes.ts
└── services/
    └── messaging/
        ├── attachment.service.ts
        ├── conversation.service.ts
        ├── message.service.ts
        ├── presence.service.ts
        └── websocket.gateway.ts
```

## 2. Architecture

- **Data Models**: `Conversation` tracks participant subsets, group metadata, and last-message previews for the sidebar. `Message` supports markdown `content`, arrays of `attachments`, threaded `replyTo` references, and `readBy` arrays.
- **WebSocket Gateway**: `websocket.gateway.ts` handles pushing real-time `NEW_MESSAGE` and `MESSAGE_READ` events directly to authenticated client socket connections. (Currently mocked/stubbed for integration).
- **Frontend Sync**: The `useMessaging` hook polls every 5 seconds (until WS is fully wired) to fetch new messages seamlessly without unmounting the chat window. The `ChatWindow` automatically scrolls to the latest message.
- **Role-Based Access**: The backend strictly validates that users attempting to read or send messages are authorized participants of that conversation via `$in` queries against the user's ID.

## 3. API Reference

```yaml
openapi: 3.0.0
paths:
  /api/v1/messages/conversations:
    get:
      summary: Retrieve paginated conversations for the current user.
  /api/v1/messages/{conversationId}:
    get:
      summary: Get paginated messages for a conversation.
  /api/v1/messages/send:
    post:
      summary: Send a message to a conversation.
  /api/v1/messages/read/{conversationId}/{messageId}:
    put:
      summary: Mark a message or entire conversation as read.
  /api/v1/messages/search:
    get:
      summary: Search text across all authorized conversations.
```

## 4. Acceptance Checklist

- [x] Messaging and Conversation Data Models
- [x] Secured Messaging Controller & Routes
- [x] Real-time / Polling React hooks
- [x] Integrated `ChatWindow` and `ConversationSidebar`
- [x] Read receipts implementation
- [x] WebSocket Gateway scaffolding
