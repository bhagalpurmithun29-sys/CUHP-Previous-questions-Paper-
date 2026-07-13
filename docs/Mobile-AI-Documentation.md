# Enterprise Mobile AI Experience, Voice Interaction & Intelligent Study Companion Platform

## 1. Folder Tree

```text
frontend/src/features/mobile-ai/
├── components/
│   ├── AIChatMobile.tsx
│   ├── AIShortcuts.tsx
│   ├── CameraToAI.tsx
│   ├── ConversationHistory.tsx
│   ├── FloatingAIButton.tsx
│   ├── QuickActions.tsx
│   ├── StreamingResponse.tsx
│   ├── VoiceInput.tsx
│   └── VoiceOutput.tsx
├── hooks/
│   └── useMobileAI.ts
└── pages/
    └── MobileAIAssistantPage.tsx

backend/src/
├── controllers/
│   └── mobileAI.controller.ts
├── routes/
│   └── mobileAI.routes.ts
└── services/
    └── mobile-ai/
        ├── aiShortcut.service.ts
        ├── conversationSync.service.ts
        └── voiceSession.service.ts
```

## 2. Architecture

- **Voice Engine**: Uses the browser's native `webkitSpeechRecognition` standard via `VoiceInput` component to capture acoustic streams and auto-parse transcriptions without demanding heavyweight external audio processing arrays. 
- **Mobile AI Controller**: Intermediary bridge resolving lightweight inputs ("Summarize", Dictation) via the robust backend AI Platform.
- **AIChatMobile**: Features an iOS-style persistent bottom-drawer text-field supporting immediate multi-modal jumps (typing, dictation, one-click prompts).
- **AiShortcutService**: Evaluates string enums originating from `QuickActions` and fires them natively against existing RAG prompts seamlessly.

## 3. Acceptance Checklist

- [x] Generated Backend REST controllers parsing Voice and Quick Actions.
- [x] Implemented `VoiceInput` React wrapper supporting the SpeechRecognition API.
- [x] Built the `MobileAIAssistantPage` with Chat / Action horizontal segmentation.
- [x] Created `useMobileAI` hook for managing unified interactions.
- [x] Exported stubs for Background Syncing and Camera-to-AI pipelining.
