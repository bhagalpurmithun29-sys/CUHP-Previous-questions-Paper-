# Fact Tables

## 1. Overview
Fact tables in the CUHP Data Warehouse store quantitative measurements of academic and operational activities, surrounded by descriptive dimensions.

## 2. Transactional Fact Tables

### 2.1 Fact_Downloads
Captures every download action performed on a question paper.
* **Grain**: One row per download event.
* **Dimensions**: `time_key`, `student_key`, `paper_key`, `course_key`.
* **Measures**: `download_count` (always 1), `download_duration_ms`.

### 2.2 Fact_Uploads
Captures question paper contributions.
* **Grain**: One row per successful upload.
* **Dimensions**: `time_key`, `faculty_key` (or student), `paper_key`, `department_key`.
* **Measures**: `file_size_bytes`, `processing_time_ms`.

### 2.3 Fact_Search
Captures searches executed by users.
* **Grain**: One row per search query.
* **Dimensions**: `time_key`, `student_key`.
* **Measures**: `results_returned`, `click_through_rate`.

### 2.4 Fact_AI_Usage
Captures interactions with the RAG/Copilot AI features.
* **Grain**: One row per AI prompt/query.
* **Dimensions**: `time_key`, `student_key`, `paper_key` (context).
* **Measures**: `tokens_used_prompt`, `tokens_used_completion`, `response_latency_ms`.

### 2.5 Fact_OCR_Processing
* **Grain**: One row per document processed by the OCR pipeline.
* **Measures**: `pages_processed`, `confidence_score_avg`, `processing_duration`.

## 3. Accumulating Snapshot Fact Tables

### 3.1 Fact_Repository_Activity
Captures the lifecycle of a question paper from upload to approval and archival.
* **Grain**: One row per question paper.
* **Dimensions**: `paper_key`, `upload_time_key`, `approval_time_key`, `archival_time_key`.
* **Measures**: `days_to_approve`, `total_downloads`, `active_days`.
