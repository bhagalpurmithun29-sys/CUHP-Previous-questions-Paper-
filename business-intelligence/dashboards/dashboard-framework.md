# Dashboard & Reporting Framework

## 1. Dashboard Structure
Dashboards are composed of Layouts, Widgets (which bind to Data APIs), and Filters.

### 1.1 Core Dashboards
* **Executive Dashboard**: High-level KPIs (DAU/MAU, Total Content, AI Cost).
* **Academic Dashboard**: Department-level content coverage and syllabus mapping gaps.
* **Repository Dashboard**: Operational metrics (Uploads pending approval, Top contributors).
* **AI Analytics Dashboard**: Vectorization success rates, Token usage, RAG query latency.
* **Student Engagement Dashboard**: Peak usage times, Most searched topics.

## 2. Visualization Components
The visualization library is provider-neutral (e.g., abstracts D3.js, Chart.js, or Recharts).
* **Line/Area Charts**: Trend analysis over time.
* **Bar Charts**: Categorical comparisons (e.g., Uploads per Department).
* **Pie Charts**: Distribution metrics (e.g., Content by File Format).
* **Heat Maps**: Time-of-day engagement.
* **Scorecards**: Single-value KPIs with sparklines.

## 3. Interactive Features
* **Cross Filtering**: Clicking a bar on a chart filters all other widgets on the dashboard.
* **Drill Down**: Clicking an aggregated metric (e.g., Total Computer Science Papers) opens a detailed table of those papers.
* **Date Range Selection**: Global date picker affecting the `time_key` across all widgets.

## 4. Reporting & Exports
* **Operational Reports**: Paginated tabular data.
* **Export Engines**: Supports converting widget arrays and tables into PDF (via headless browser), CSV, and Excel.
