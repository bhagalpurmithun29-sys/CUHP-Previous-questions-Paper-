# Reporting APIs & Architecture Documentation

## 1. Objective
Design an enterprise reporting architecture that enables governed self-service report creation, scheduling, and distribution using the reusable analytical APIs from the Semantic Layer.

## 2. Analytical APIs
* `GET /api/v1/reporting/templates` - Fetch available report templates.
* `POST /api/v1/reporting/build` - Submit a JSON payload describing widgets, dimensions, and metrics to compile a new ad-hoc report.
* `POST /api/v1/reporting/schedules` - Create a new CRON schedule for an existing report ID.
* `POST /api/v1/reporting/exports/trigger` - Request an immediate background generation of a PDF or Excel file.

## 3. Architecture Context
* **Frontend**: A React/Vue drag-and-drop designer that produces a JSON representation of the report structure.
* **Backend Engine**: Parses the JSON, translates it into Semantic Layer queries, and caches the results.
* **Worker Nodes**: Dedicated microservices (e.g., Puppeteer for PDF, Pandas/SheetJS for Excel) handle the heavy lifting of export generation, preventing the main API from blocking.
* **Storage**: Generated reports are temporarily stored in an Object Store (S3).

## 4. Performance & Caching
* **Report Caching**: Output for high-traffic scheduled reports is cached in Redis.
* **Incremental Refresh**: Live ad-hoc queries utilize incremental updates against the Data Warehouse.

## 5. Security & Permissions (RBAC)
- **Super Administrator**: Can manage all schedules and templates.
- **Data Analysts**: Can create, approve, and share complex ad-hoc reports.
- **Department Heads**: Can view and export reports scoped to their department.
- **Faculty / Executive Users**: Read-only access to specific shared reports.
