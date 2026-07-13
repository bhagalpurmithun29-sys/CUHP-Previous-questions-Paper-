# Paper Q&A & Contextual Document Intelligence - Architecture

## Overview
The Paper Q&A module allows users to interact with a specific question paper using an AI assistant. The AI is strictly context-bounded to the currently active document.

## Backend Architecture
- **Controller (`paperQA.controller.ts`)**: Handles REST API requests and manages streaming SSE responses.
- **Routes (`paperQA.routes.ts`)**: Defines endpoints for messaging, selections, summaries, and citations.
- **Services**:
  - `documentContext.service.ts`: Extracts and manages textual context from the PDF.
  - `selection.service.ts`: Analyzes user-selected text blocks.
  - `paperRetrieval.service.ts`: Manages RAG (Retrieval-Augmented Generation) constrained to the current paper ID. Handles streaming LLM responses.
  - `citation.service.ts`: Formats and retrieves precise page/question citations.
- **Repository (`paperQA.repository.ts`)**: Persists conversation history and metadata (citations, context).

## Frontend Architecture
- **Page (`PaperQAPage.tsx`)**: The main split-pane view (PDF Viewer + Chat Panel).
- **Hooks (`usePaperQA.ts`)**: Manages TanStack Query mutations, state, and Server-Sent Events (SSE) parsing.
- **Components**:
  - `PaperChatPanel`: The core chat interface with markdown rendering.
  - `SelectionToolbar`: Floating toolbar when text is highlighted.
  - `SelectedTextPanel`: Shows the currently pinned context.
  - `ContextViewer`: UI indicator showing the active retrieval bounds.
  - `CitationNavigator`: Clickable citations linked to PDF pages.
  - `PageSummary` & `QuestionExplanation`: Dynamic widgets for structured insights.

## Data Flow (Message)
1. User sends message -> POST `/api/v1/paper-qa/message`
2. `paperRetrieval.service` fetches current paper context from RAG platform.
3. AI Gateway processes prompt + context.
4. Response streams back via SSE.
5. `usePaperQA` hook updates the UI incrementally.
6. Citations are recorded and displayed in `CitationNavigator`.
