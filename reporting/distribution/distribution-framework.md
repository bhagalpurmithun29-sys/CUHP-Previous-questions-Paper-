# Distribution Framework

## 1. Overview
The Distribution Framework governs how generated reports (PDF, CSV, Excel) are securely transmitted to users across various delivery channels.

## 2. Supported Channels
* **Email**: Delivered via standard SMTP or SES. Includes attachment size limits.
* **In-app Delivery**: Pushes alerts into the CUHP notification center.
* **Download Center**: A secure, temporary (30-day retention) S3 bucket for downloading generated reports.

## 3. Role-Based Distribution (Row Level Security)
When a single report is scheduled for a broad audience (e.g., "All Department Heads"), the distribution framework intersects with the Data Governance rules. It spawns identical reports but injects a mandatory background filter (`department_id = $USER.department_id`) ensuring each recipient only receives data they are authorized to view.
