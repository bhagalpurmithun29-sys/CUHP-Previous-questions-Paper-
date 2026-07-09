# Enterprise Academic Analytics & Insights Dashboard

## Architecture

This module provides high-level executive insights into the Academic Master Data infrastructure, utilizing MongoDB's powerful aggregation framework to generate metrics, track growth, and flag data quality anomalies.

### Backend Components

- **Controller (`analytics.controller.ts`)**: REST endpoints serving aggregated statistical payloads.
- **Service (`analytics.service.ts`)**: 
  - **Overview**: Dispatches concurrent `$group` aggregations across all 5 academic collections to instantly sum active vs. archived entities.
  - **Growth Tracking**: Utilizes `$year` and `$month` projection operators in MongoDB pipelines to group historical insertion dates into timeline series for frontend charting.
  - **Data Quality Scanning**: Scans for "Broken Links" (e.g. subjects missing credits, or departments lacking parent school IDs) which can occur if data was malformed via manual database overrides.
  - **Reporting**: Aggregates the aforementioned metrics into a single snapshot payload and registers an `AuthAuditLog`.
- **Routes (`analytics.routes.ts`)**: Secure routes mounted under `/api/v1/analytics`.

### Frontend Components

- **Page (`AcademicAnalyticsPage.tsx`)**: The executive dashboard view combining various visualization components.
- **Hooks (`useAcademicAnalytics.ts`)**: TanStack Query data fetching layer.
- **Visualizations**:
  - `OverviewCards.tsx`: KPI cards displaying total counts and active ratios.
  - `GrowthTrends.tsx`: Integrates **Recharts** to render beautiful, responsive Line and Bar charts detailing insertion velocity over time.
  - `DataQualityDashboard.tsx`: A scanner interface representing the database's relational health as a percentage score.

## Performance Enhancements

- **Aggregation Pipelines**: Rather than fetching large arrays of documents into Node.js and counting them in memory, the service pushes computation to the MongoDB layer using aggregation, keeping memory footprints incredibly low and response times fast.
- **Parallel Execution**: Uses `Promise.all()` to resolve independent chart metrics simultaneously.

## Acceptance Checklist

- [x] Dashboard UI with Recharts integration.
- [x] Executive Overview Aggregations (Active vs Archived ratios).
- [x] Time-series growth aggregation.
- [x] Relational integrity (Data Quality) scanner.
- [x] Report Generator integrated with `AuthAuditLog`.
