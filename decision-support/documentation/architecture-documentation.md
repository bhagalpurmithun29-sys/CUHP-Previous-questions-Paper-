# Decision Intelligence Architecture Documentation

## 1. Objective
Design a provider-neutral recommendation architecture supporting both rule-based (heuristic) and AI-assisted (prescriptive) recommendation strategies.

## 2. Architecture Components

### 2.1 The Rules Engine
Acts as the baseline for deterministic decisions. 
- *Input*: KPIs and Data Warehouse metrics.
- *Logic*: Simple `IF/THEN` business rules defined by Data Analysts.
- *Output*: Fast, highly explainable recommendations.

### 2.2 The Prescriptive ML Engine
For complex scenarios where rules fail (e.g., multi-variable resource allocation).
- *Input*: Output from Predictive Analytics models (e.g., forecasted demand).
- *Logic*: Optimization algorithms (e.g., Linear Programming) or specialized ML agents.
- *Output*: Optimized resource allocation suggestions.

### 2.3 Feedback Loop & Continuous Improvement
When a Department Head "Rejects" a recommendation via the UI (e.g., "This curriculum suggestion is not relevant"), the Feedback API logs the decision.
- The `evaluation/` module continuously compares accepted recommendations against subsequent real-world outcomes.
- If a recommendation type consistently yields poor outcomes or low acceptance, its Priority Score is downgraded automatically.

## 3. Performance & Processing
* **Recommendation Caching**: High-level recommendations are pre-calculated overnight and cached in Redis.
* **Incremental Evaluation**: Rule-based engines evaluate incoming events incrementally (e.g., a massive spike in student downloads immediately triggers a cached capacity rule).
* **Background Processing**: Heavy simulations are queued (via Celery/BullMQ) and processed asynchronously to prevent API timeouts.
