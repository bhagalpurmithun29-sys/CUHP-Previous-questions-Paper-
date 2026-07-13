# BI Developer Guide & Operations Manual

## 1. Developer Guide: Building a New Widget
1. **Define the Query**: Create an optimized SQL query or Materialized View in the Data Warehouse.
2. **Expose the API**: Add an endpoint in the Analytical API layer that queries the DW and returns a standardized JSON response: `[ { "label": "X", "value": Y } ]`.
3. **Frontend Integration**: Map the API response to the generic `Widget` component, selecting the appropriate `chartType` (e.g., `BAR`, `LINE`).

## 2. Developer Guide: Provider Neutrality
Avoid tightly coupling the frontend to a specific charting library's API. Use an adapter pattern:
```typescript
interface StandardChartProps {
  data: Array<{ label: string; value: number }>;
  colors: string[];
}
// Map StandardChartProps to Recharts/Chart.js inside the adapter.
```

## 3. Operations: Export Services
* Generating PDFs from dashboards is computationally expensive.
* **Architecture**: The Export API pushes a job to a background queue (e.g., BullMQ). A headless browser (Puppeteer) worker processes the queue, generates the PDF, and stores it in object storage.
* **Monitoring**: Monitor the Export Queue depth. If it exceeds SLA (e.g., > 5 mins to generate), horizontally scale the worker nodes.

## 4. Operations: Caching and Cache Invalidation
* Standard analytical queries are cached via Redis for 12 hours.
* **Force Refresh**: The dashboard UI must provide a "Force Refresh" button for analysts, which bypasses the cache and repopulates it.
