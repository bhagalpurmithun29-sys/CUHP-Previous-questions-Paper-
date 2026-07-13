# Executive Intelligence Guide & Operations Manual

## 1. Governance: Strategic Management
When the Board sets a new Institutional Objective (e.g., "Increase AI Adoption by 50%"):
1. The Data Analyst translates the goal into the `goals/` module.
2. The framework cascades the goal down to the Department level.
3. Initiatives and Milestones are created in the `initiatives/` module, mapping directly to underlying DW metrics.

## 2. Operations: Automating Board Briefings
* The automated NLP Briefing engine relies on the AI Platform's language models.
* Operations must ensure that the `Executive Briefings` pipeline executes *after* the DW ETL run and the Data Quality validations pass. If the Trust Score of the underlying data is below 'Gold', the Briefing engine must abort and alert Operations to prevent inaccurate data from reaching the Board.

## 3. Operations: Analytics & Audit Tracking
* **Usage Tracking**: Monitor `Executive Dashboard Usage` and `Report Downloads`. If a specific dashboard (e.g., FinOps) has 0 views in a month, it should be reviewed for relevance.
* **Audit Logs**: Maintain strict audit logs of `Strategic Goal Updated` to ensure there is a clear record of when a target was changed and by whom.
