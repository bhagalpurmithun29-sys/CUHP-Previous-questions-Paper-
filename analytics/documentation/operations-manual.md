# Analytics Guide & Operations Manual

## 1. Analytics Guide: Creating a New Metric
1. **Define**: Determine the business logic and identify the underlying Data Warehouse facts/dimensions.
2. **Review**: Ensure no existing metric covers this use case (check the Metric Library).
3. **Implement**: Code the metric definition in the Semantic Layer.
4. **Govern**: Assign an owner and version number.
5. **Publish**: Add the new metric to the relevant Scorecards.

## 2. Operations: Incremental KPI Refresh
* To minimize load on the DW, the Analytics Engine does not run full historical recalculations every time a dashboard is loaded.
* **Cron Jobs**: Run nightly to calculate the daily delta and append it to the time-series metric tables.
* **Caching**: The resulting scorecards are saved into Redis. 

## 3. Operations: Alerting and Threshold Management
* **False Positives**: If an alert is triggering too often (e.g., "Goal Missed" on a volatile metric), Operations can implement a "Sustained Breach" rule (e.g., must miss goal for 3 consecutive days before alerting).
* **Audit Logs**: Monitor the `KPI Usage` and `Scorecard Views` analytics. If a Scorecard hasn't been viewed in 6 months, consider deprecating it to save compute resources.
