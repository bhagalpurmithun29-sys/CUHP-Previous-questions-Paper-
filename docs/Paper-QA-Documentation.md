# Paper Q&A Module Documentation

## 1. Folder Tree

```text
frontend/src/features/paper-qa/
├── components/
│   ├── CitationNavigator.tsx
│   ├── ContextViewer.tsx
│   ├── PageSummary.tsx
│   ├── PaperChatPanel.tsx
│   ├── QuestionExplanation.tsx
│   ├── RelatedQuestions.tsx
│   ├── SelectedTextPanel.tsx
│   └── SelectionToolbar.tsx
├── hooks/
│   └── usePaperQA.ts
└── pages/
    └── PaperQAPage.tsx

backend/src/
├── controllers/
│   └── paperQA.controller.ts
├── repositories/
│   └── paperQA.repository.ts
├── routes/
│   └── paperQA.routes.ts
└── services/
    └── paperQA/
        ├── citation.service.ts
        ├── documentContext.service.ts
        ├── paperRetrieval.service.ts
        └── selection.service.ts
```

## 2. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: Paper Q&A API
  version: 1.0.0
paths:
  /api/v1/paper-qa/message:
    post:
      summary: Send a message to the AI Assistant
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                paperId: { type: string }
                message: { type: string }
                context: { type: object }
                conversationId: { type: string }
      responses:
        '200':
          description: Server-Sent Events (SSE) stream of the AI response
  /api/v1/paper-qa/selection:
    post:
      summary: Analyze selected text
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                paperId: { type: string }
                text: { type: string }
                pageNumber: { type: integer }
      responses:
        '200':
          description: AI analysis of the selected text
  /api/v1/paper-qa/summarize:
    post:
      summary: Generate summary for page, section, or paper
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                paperId: { type: string }
                type: { type: string, enum: [page, section, paper, question] }
                pageNumber: { type: integer }
      responses:
        '200':
          description: AI generated summary
```

## 3. Developer Documentation

### Setup and Integration
- **Frontend**: The `PaperQAPage` expects a `paperId` parameter in the route (`/papers/:paperId/qa`). Ensure `react-router-dom` is configured to route here.
- **State Management**: Uses `TanStack Query` for data fetching and custom `usePaperQA` hook for handling real-time SSE streaming.
- **Backend Context Restriction**: The `paperRetrieval.service.ts` is explicitly designed to filter context bounds to `metadata.paperId === req.body.paperId`. Do not bypass this filter.

## 4. User Guide

### How to use the Paper Q&A Assistant:
1. **Open a Paper**: Navigate to any question paper in the library and open the Q&A view.
2. **Select Text**: Highlight any text in the PDF viewer. A toolbar will appear allowing you to "Ask AI" or "Explain Term".
3. **Ask Questions**: Use the chat panel on the right to ask general questions. The AI will *only* answer using information found within the active paper.
4. **View Citations**: Click on the "Sources & Citations" blocks to instantly jump to the page the AI used to generate its answer.
5. **Summarize**: Click the "Generate Page Summary" button to get a quick digest of the current page.

## 5. Acceptance Checklist

- [x] **Context Bounds**: AI retrieval is strictly restricted to the current paper.
- [x] **Streaming**: Real-time SSE streaming works flawlessly for message generation.
- [x] **Selection AI**: Users can highlight text and instantly query the AI about it.
- [x] **Citations**: Citations are generated and displayed with confidence scores.
- [x] **Summarization**: Endpoints and UI support generating specific page/section summaries.
- [x] **Clean UI**: Built with Tailwind CSS v4 and Framer Motion for smooth transitions.
- [x] **Accessibility**: High contrast elements and semantic HTML implemented.
