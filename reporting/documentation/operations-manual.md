# Reporting Guide & Operations Manual

## 1. Reporting Guide: Creating an Ad-Hoc Report
1. Select **New Report** to open the Drag-and-Drop Designer.
2. Choose a **Semantic Model** (e.g., `Student Activity`).
3. Drag dimensions (e.g., `Course Name`) to the Rows.
4. Drag metrics (e.g., `Total Downloads`) to the Columns.
5. Apply conditional formatting and click **Save as Draft**.
6. Submit for Governance Approval if sharing beyond your immediate department.

## 2. Operations: Worker Node Scaling
* Report generation (especially PDF layout rendering) is CPU/Memory intensive.
* **Auto-Scaling**: Configure Kubernetes HPA (Horizontal Pod Autoscaler) to scale the Export Worker nodes based on queue depth in BullMQ.
* **Timeout Limits**: Ad-hoc queries must timeout after 60 seconds to prevent DW overload. Scheduled queries can run for up to 5 minutes in the background.

## 3. Operations: Analytics & Audit
* Operations must track the `Most Used Reports` and `Builder Usage`.
* If a custom Ad-hoc report becomes heavily used (e.g., run >100 times/week), Operations should review it and promote it to a standardized **Template** to benefit all users.
* **Audit Logs**: Maintain strict audit logs of `Report Exported` and `Report Shared` to track data exfiltration and ensure compliance.
