# Data Mart Definitions

## 1. Overview
Data Marts are subject-oriented sub-sections of the EDW, optimized for specific departments or analytical requirements, often represented as materialized views or denormalized tables.

## 2. Academic Analytics Mart
**Purpose**: Provide insights into curriculum coverage and study materials availability.
* **Target Audience**: Deans, HODs.
* **Key Aggregates**:
  * Total papers available per Course and Academic Session.
  * Gap analysis: Courses with 0 uploaded question papers.
  * Most frequently downloaded subjects.

## 3. Executive Analytics Mart
**Purpose**: High-level platform KPIs for university leadership.
* **Target Audience**: Vice-Chancellor, Executive Board.
* **Key Aggregates**:
  * Daily Active Users (DAU) and Monthly Active Users (MAU).
  * Storage growth trends.
  * Total system-wide AI tokens consumed (Cost analysis).

## 4. Student Engagement Mart
**Purpose**: Understand student study patterns.
* **Target Audience**: Faculty, Academic Counselors.
* **Key Aggregates**:
  * Peak download times (Time of Day / Day of Week analysis).
  * Cohort analysis of student engagement prior to exams.

## 5. AI Analytics Mart
**Purpose**: Evaluate the performance and cost of the RAG system.
* **Target Audience**: AI Engineers, Platform Operations.
* **Key Aggregates**:
  * Average latency of AI responses.
  * Cost per query (calculated from tokens).
  * Top referenced question papers by the AI.
