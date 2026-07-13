# Prescriptive Analytics & Decision Engine

## 1. Overview
The Decision Engine upgrades standard analytics into Prescriptive Analytics. It processes predictive forecasts against defined business rules and returns a ranked list of optimization suggestions.

## 2. Priority Ranking
Recommendations are not presented as equal. The engine uses a scoring algorithm (`priority/`) to rank them based on:
1. **Impact**: Financial cost, potential system outage, or academic accreditation risk.
2. **Urgency**: Time to failure (e.g., "Storage will fill in 14 days").
3. **Confidence**: Accuracy of the underlying prediction.

## 3. Decision Scenarios & Alternatives
When suggesting a resolution, the engine provides Alternative Options with their respective Impact Analysis.
* **Problem**: Moderation queue is 3 weeks behind.
* **Option A (Recommended)**: Temporarily grant 5 trusted Faculty members 'Moderator' access (Cost: $0, Time: Immediate).
* **Option B**: Hire temporary external moderators (Cost: $500, Time: 2 weeks).

## 4. Separation of Logic
To ensure transparency, the **Decision Logic** (the rules dictating what action to take) is physically separated from the **Prediction Models** (the ML models predicting what will happen). This ensures that human analysts can audit the decision-making rules independently of the ML algorithms.
