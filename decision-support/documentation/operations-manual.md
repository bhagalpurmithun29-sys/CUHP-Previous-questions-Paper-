# Decision Intelligence Guide & Operations Manual

## 1. Governance: Formulating Rules
When Data Analysts implement a new rule-based recommendation, they must follow the **Explainability Mandate**:
1. Identify the Trigger KPI (e.g., Queue Size > 100).
2. Write the actionable recommendation (e.g., "Add more moderators").
3. Map the exact Data Warehouse query used as evidence so the frontend can display the "Supporting KPIs".

## 2. Operations: Simulation Limits
* Simulations can be incredibly resource-intensive as they clone the semantic layer state.
* **Throttling**: Limit users to running a maximum of 3 concurrent simulations.
* **Garbage Collection**: Simulation results and cloned temporary states must be purged from Redis/Storage after 7 days.

## 3. Operations: Analytics & Audit
* Operations must monitor the `Acceptance Rate` of generated recommendations.
* If a recommendation category (e.g., "Student Engagement Recommendations") drops below a 20% acceptance rate, it indicates the business rules are misaligned with reality. Operations should flag this for the Data Governance team to rewrite the rules.
* **Audit Logs**: Maintain strict logs of `Recommendation Accepted` and `Decision Recorded` to ensure accountability for operational changes made based on AI advice.
