# Enterprise Faculty AI Copilot & Curriculum Intelligence Assistant

## 1. Folder Tree

```text
frontend/src/features/faculty-copilot/
├── components/
│   ├── AssessmentReview.tsx
│   ├── BloomAdvisor.tsx
│   ├── CitationPanel.tsx
│   ├── CopilotChat.tsx
│   ├── CurriculumInsights.tsx
│   ├── DifficultyAdvisor.tsx
│   ├── PaperComparison.tsx
│   ├── RecommendationPanel.tsx
│   └── TopicCoverage.tsx
├── hooks/
│   └── useFacultyCopilot.ts
└── pages/
    └── FacultyCopilotPage.tsx

backend/src/
├── controllers/
│   └── facultyCopilot.controller.ts
├── repositories/
│   └── facultyCopilot.repository.ts
├── routes/
│   └── facultyCopilot.routes.ts
└── services/
    └── facultyCopilot/
        ├── assessmentGuidance.service.ts
        ├── curriculumIntelligence.service.ts
        ├── paperComparison.service.ts
        └── recommendationEngine.service.ts
```

## 2. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: Faculty Copilot API
  version: 1.0.0
paths:
  /api/v1/faculty-copilot/chat:
    post:
      summary: Send a curriculum/assessment query to the Copilot
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                message: { type: string }
                conversationId: { type: string }
                context: { type: object }
      responses:
        '200':
          description: SSE stream of the AI assistant's response.
  /api/v1/faculty-copilot/analyze:
    post:
      summary: Analyze curriculum coverage and assessment balance
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                subjectId: { type: string }
                departmentId: { type: string }
      responses:
        '200':
          description: Returns Curriculum Insights and Assessment Review metrics (Bloom's, Difficulty, Topic Coverage).
  /api/v1/faculty-copilot/compare:
    post:
      summary: Compare two papers or sets of papers
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                type: { type: string }
                sourceId: { type: string }
                targetId: { type: string }
      responses:
        '200':
          description: Comparison matrix and similarity analysis.
  /api/v1/faculty-copilot/recommendations:
    get:
      summary: Generate contextual recommendations for curriculum improvement
      responses:
        '200':
          description: List of suggested actions with confidence scores.
  /api/v1/faculty-copilot/history:
    get:
      summary: Retrieve past AI Copilot sessions
      responses:
        '200':
          description: Array of past conversations.
```

## 3. Architecture

- **Three-Column Dashboard UI**: The Frontend utilizes a rich dashboard dividing analytical widgets, the AI Copilot Chat window, and an Evidence/Recommendations column.
- **Service Layer Segregation**: Backend logic is highly modularized:
  - `curriculumIntelligence.service.ts` processes Topic mapping.
  - `assessmentGuidance.service.ts` focuses on Bloom's Taxonomy and Difficulty metrics.
  - `paperComparison.service.ts` handles variance analysis across cohorts/years.
  - `recommendationEngine.service.ts` surfaces AI-driven suggestions.
- **Data Grounding**: The Copilot does not hallucinate. It relies strictly on `Faculty Analytics`, `Repository Analysis`, and `AI Meta-Data` from previous project phases to drive insights.
- **SSE Streaming**: Uses standard incremental token rendering for a fluid chat experience.

## 4. Developer Documentation

- **Dependencies**: The `Recharts` library is heavily utilized for Radar, Pie, and Bar charts.
- **Role-Based Access (RBAC)**: All routes in `facultyCopilot.routes.ts` are strictly protected via the `restrictTo('faculty', 'admin', 'moderator')` middleware. Students cannot access these endpoints.
- **Citations**: Citations are stored directly on the `AiConversation` model under `metadata.citations`. They are extracted and displayed in the `CitationPanel`.

## 5. Faculty User Guide

### How to Use the Faculty Copilot:
1. **Dashboard Overview**: When you open the module, the AI instantly analyzes your currently assigned subjects. The Radar Chart (`Curriculum Insights`) and Pie Charts (`Bloom's Advisor`) show the health of your assessments.
2. **Chat with the AI**: Use the central chat panel to ask complex questions, e.g., "Why did the failure rate increase in Operating Systems?" or "Help me design a paper focusing on Application and Evaluation levels."
3. **Review Recommendations**: The right panel provides proactive suggestions (e.g., "Include more Cloud Computing scenarios"). Every suggestion comes with an AI Confidence Score.
4. **Compare Papers**: Use the 'Compare Assessments' tool on the left to see the delta between the 2023 Midterm and the 2024 Midterm.

## 6. Acceptance Checklist
- [x] Provides Evidence-Based guidance without generating complete exam papers (preventing policy violations).
- [x] Successfully maps data to Recharts for Bloom's, Difficulty, and Topic Distributions.
- [x] Interactive Copilot interface with SSE streaming support.
- [x] Route Protection verified (Only Faculty/Admins).
- [x] Includes all required Analytical components (Radar, Pie, Bar charts).
- [x] Citation tracking implemented to prove claims.
- [x] Fully styled using Tailwind v4. Responsive and Accessible (WCAG 2.2 AA).
