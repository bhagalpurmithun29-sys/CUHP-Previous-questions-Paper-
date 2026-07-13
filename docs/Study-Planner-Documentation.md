# AI Study Planner & Learning Assistant - Documentation

## 1. Folder Tree

```text
frontend/src/features/study-planner/
├── components/
│   ├── GoalManager.tsx
│   ├── MonthlyPlan.tsx
│   ├── ProgressOverview.tsx
│   ├── RecommendedResources.tsx
│   ├── RevisionTimeline.tsx
│   ├── StudyDashboard.tsx
│   ├── StudyInsights.tsx
│   ├── TopicPriorities.tsx
│   └── WeeklyPlan.tsx
├── hooks/
│   └── useStudyPlanner.ts
└── pages/
    └── StudyPlannerPage.tsx

backend/src/
├── controllers/
│   └── studyPlanner.controller.ts
├── repositories/
│   └── studyPlanner.repository.ts
├── routes/
│   └── studyPlanner.routes.ts
└── services/
    └── studyPlanner/
        ├── goalManagement.service.ts
        ├── learningPlan.service.ts
        ├── recommendation.service.ts
        └── revision.service.ts
```

## 2. Swagger Documentation (API Reference)

```yaml
openapi: 3.0.0
info:
  title: Study Planner API
  version: 1.0.0
paths:
  /api/v1/study-planner/dashboard:
    get:
      summary: Get user's active study dashboard data
      responses:
        '200':
          description: Returns active plan, weekly progress, monthly progress
  /api/v1/study-planner/weekly:
    get:
      summary: Get tasks for the current week
  /api/v1/study-planner/monthly:
    get:
      summary: Get tasks for the current month
  /api/v1/study-planner/revision:
    get:
      summary: Get personalized revision timeline and topics
  /api/v1/study-planner/recommendations:
    get:
      summary: Get recommended resources and topics based on active plan
  /api/v1/study-planner/goals:
    post:
      summary: Create a new learning goal and generate AI study plan
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                type: { type: string }
                description: { type: string }
                durationDays: { type: integer }
                dailyMinutes: { type: integer }
  /api/v1/study-planner/goals/{goalId}:
    put:
      summary: Update a learning goal
    delete:
      summary: Delete a learning goal
```

## 3. Architecture

- **Goal-Driven**: The AI generates a customized timeline of tasks based on the student's declared goal.
- **Contextual Generation**: `GoalManagementService` uses the `AiGateway` to format tasks leveraging insights derived from past paper analysis (topics, frequencies, difficulty).
- **Service Layer Segregation**: Separated into `LearningPlanService`, `RevisionService`, `GoalManagementService`, and `RecommendationService` for strict Single Responsibility Principle adherence.
- **Progress Calculation**: Handled incrementally in Mongoose pre-save hooks (in `studyPlan.model.ts`) to avoid heavy on-the-fly dashboard calculations.

## 4. Developer Documentation
- **Integrations**: The AI planner relies heavily on `StudyPlan.model.ts` which is connected to `User` and `Subject` schemas.
- **Charts**: We use `Recharts` for data visualization (`StudyInsights` and `ProgressOverview`). Ensure the dependency is properly resolved in the frontend.
- **Re-fetching**: `useStudyPlanner` uses `TanStack Query` invalidation to automatically refresh the dashboard UI whenever a goal is updated/created.

## 5. Student User Guide
1. **Set a Goal**: Enter your objective (e.g., "Prepare for Midterms") in the Goal Manager. The AI will generate a daily plan.
2. **Track Progress**: The Dashboard gives you a top-level view of your weekly and overall completion percentage.
3. **Follow the Schedule**: Review the "This Week's Schedule" widget to see daily topics to cover.
4. **Revise**: Check the "Revision Timeline" for topics the AI recommends you revisit based on your weak points.
5. **Insights**: The "Study Time" bar chart visualizes your consistency across the week.

## 6. Acceptance Checklist
- [x] AI properly generates daily tasks constrained to user-provided dates and daily minute limits.
- [x] Dashboard aggregates progress correctly (Weekly vs Monthly vs Overall).
- [x] Revision timeline correctly extracts `REVISION` typed tasks and `COMPLETED` tasks.
- [x] Topic priorities are successfully derived and displayed.
- [x] Recommended question papers are fetched based on the goal's subject context.
- [x] API is fully protected via `protect` auth middleware.
- [x] UI is responsive, styled with Tailwind v4, and fully accessible.
