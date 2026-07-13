# Enterprise AI Feedback, Human Evaluation & Continuous Learning Platform

## 1. Folder Tree

```text
frontend/src/features/ai-feedback/
├── components/
│   ├── CitationReview.tsx
│   ├── EvaluationQueue.tsx
│   ├── FeedbackForm.tsx
│   ├── FeedbackWidget.tsx
│   ├── ImprovementSuggestions.tsx
│   ├── QualityScorecard.tsx
│   ├── RatingPanel.tsx
│   └── ReviewerWorkspace.tsx
├── hooks/
│   └── useAIFeedback.ts
└── pages/
    └── AIFeedbackDashboardPage.tsx

backend/src/
├── controllers/
│   └── aiFeedback.controller.ts
├── repositories/
│   └── feedback.repository.ts
├── routes/
│   └── aiFeedback.routes.ts
└── services/
    └── aiFeedback/
        ├── evaluation.service.ts
        ├── feedback.service.ts
        ├── improvementRecommendation.service.ts
        └── qualityScoring.service.ts
```

## 2. Architecture

- **Data Flow**:
  1. Users (Students, Faculty) submit feedback via `FeedbackWidget` inside the Academic Chat or Paper Q&A interfaces.
  2. The data hits `feedback.service.ts` and is stored as `PENDING_REVIEW` in `feedback.repository.ts`.
  3. Quality metrics are aggregated by `qualityScoring.service.ts`.
  4. Human evaluators (Reviewers, Admins) consume the pending queue via `AIFeedbackDashboardPage`.
  5. The evaluator submits a resolution (Accept/Reject/Improvement) via `evaluation.service.ts`.
  6. Analyzed trends form `improvementRecommendation.service.ts` insights to alert prompt engineers about systemic issues (e.g., Knowledge Gaps, Prompt Clarity).

- **Strict Policy**: 
  - Feedback **never** automatically modifies prompts. 
  - Feedback **never** retrains models automatically. 
  - All actionable changes must go through the Human Evaluation pipeline to ensure dataset integrity.

## 3. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: AI Feedback & Continuous Learning API
  version: 1.0.0
paths:
  /api/v1/ai-feedback:
    post:
      summary: Submit user feedback (Thumbs up/down, written) for an AI response.
  /api/v1/ai-feedback/history:
    get:
      summary: Retrieve a user's submitted feedback history.
  /api/v1/ai-feedback/queue:
    get:
      summary: (Admin/Reviewer) Retrieve pending feedback awaiting evaluation.
  /api/v1/ai-feedback/evaluate:
    post:
      summary: (Admin/Reviewer) Submit human evaluation of user feedback.
  /api/v1/ai-feedback/quality:
    get:
      summary: (Admin/Reviewer) Retrieve aggregated AI quality metrics (Groundedness, Completeness, etc.).
  /api/v1/ai-feedback/reports:
    get:
      summary: (Admin/Reviewer) Retrieve actionable continuous improvement suggestions.
```

## 4. Evaluation Guide

- **Validating Groundedness**: Ensure the AI output does not invent facts outside of the retrieved RAG context.
- **Citation Quality**: Verify that `[1]`, `[2]` correctly map to the underlying source documents without misattribution.
- **Decision Matrix**:
  - `ACCEPT`: The user's feedback is valid and highlights a real issue (e.g. hallucination). We need to fix this.
  - `REJECT`: The user's feedback is invalid or unreasonable (e.g. user complaining the bot won't do their homework).
  - `NEEDS_IMPROVEMENT`: The response was technically correct but badly formatted or confusing, indicating a need for Prompt Tuning.

## 5. Acceptance Checklist

- [x] Built the `FeedbackWidget` component structure for frontend injection.
- [x] Implemented `feedback.service.ts` to capture and store user inputs.
- [x] Created `AIFeedbackDashboardPage` with a 3-column interactive layout.
- [x] `EvaluationQueue` correctly lists pending items.
- [x] `ReviewerWorkspace` allows categorization (ACCEPT, REJECT, NEEDS_IMPROVEMENT) and note-taking.
- [x] `QualityScorecard` visualizes multi-dimensional metrics (Groundedness, Relevance, Clarity) using `recharts` radar chart.
- [x] `ImprovementSuggestions` panel generated for Prompt Engineers to view system-level recommendations.
- [x] Protected routes explicitly enforcing `admin`, `moderator`, and `reviewer` roles.
