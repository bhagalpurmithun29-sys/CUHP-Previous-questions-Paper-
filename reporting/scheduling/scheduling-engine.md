# Scheduling & Distribution Framework

## 1. Scheduling Engine
The Scheduling Engine automates report generation.
* **Cadence**: Supports Daily, Weekly (e.g., Monday 08:00 AM), Monthly (e.g., 1st of the month), and Custom cron expressions.
* **Execution**: Scheduled reports run as background jobs (via BullMQ or Celery) to prevent blocking the API. Results are cached upon completion.

## 2. Distribution Framework
Once a scheduled report finishes generating, the Distribution Framework routes the artifact.

### 2.1 Delivery Channels
* **Email Distribution**: Sends the report as a PDF/Excel attachment, or embeds a summary snippet in the email body with a link to the platform.
* **In-app Delivery**: Pushes a notification to the user's dashboard linking to the generated report.
* **Download Center**: All historically generated reports are securely stored in the Download Center for on-demand retrieval for up to 30 days.

### 2.2 Role-Based Distribution
Distribution lists are dynamic and based on RBAC.
* *Example*: A single "Departmental Summary" report is scheduled. The framework automatically applies row-level security (RLS), generates a unique PDF for each Department Head showing *only* their department's data, and emails it to them.

## 3. Export Formats
Reports can be distributed or manually exported in:
* **PDF**: Uses print-friendly layouts and headless browser rendering.
* **Excel (.xlsx)**: Maintains grouping and conditional formatting.
* **CSV**: Raw, unformatted data for external analysis.
* **JSON**: For API integrations with external university systems.
