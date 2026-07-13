# Executive Dashboard Framework

## 1. Overview
Executive Dashboards provide institutional leaders with real-time, highly summarized, and highly actionable views of the university's performance across various domains.

## 2. Core Dashboards

### 2.1 University Overview Dashboard
* **Target Audience**: Vice Chancellor, Board Members.
* **Content**: Blended view of Academic Excellence, Operational Health, and Financial performance.

### 2.2 Domain-Specific Dashboards
* **Academic Excellence Dashboard**: Curriculum coverage, average grade distribution, and student success metrics.
* **Repository Performance Dashboard**: Question Paper upload velocity, moderation bottlenecks, and total downloads.
* **AI Adoption Dashboard**: Copilot usage, RAG deflection rate, and token expenditure.
* **Operations & FinOps Dashboard**: Infrastructure uptime, S3 storage costs, and budget forecasts.
* *Research & Innovation Dashboard [Placeholder]*

## 3. Executive Drill-down
While the dashboards are high-level, every widget supports an "Executive Drill-down". 
* Clicking a "Red" KPI (e.g., *Moderation SLA Missed*) drills down to the underlying Data Warehouse facts, identifying the specific Department or Faculty causing the bottleneck without requiring a separate BI tool.

## 4. Scenario & Forecast Integration
Dashboards natively embed the output of the **Predictive Analytics** module. Executive users can toggle views between "Historical Actuals" and "Predicted Forecasts (Expected vs. Worst-Case)".
