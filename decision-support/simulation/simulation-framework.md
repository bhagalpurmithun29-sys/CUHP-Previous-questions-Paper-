# Simulation Framework

## 1. Overview
The Simulation Framework enables Executives and Analysts to run safe, isolated experiments testing the outcomes of operational or policy decisions before executing them in the real world.

## 2. Types of Simulation

### 2.1 Capacity Simulation
* **What-If**: "What if we mandate all legacy PDF files to be run through the new OCR model by next month?"
* **Simulation Result**: Projects the compute cost, token usage, and time-to-completion, alerting the user if current infrastructure limits would be breached.

### 2.2 Policy Simulation
* **What-If**: "What if we change the moderation policy to require 2 approvals instead of 1?"
* **Simulation Result**: Analyzes historical upload velocity against current moderator throughput to predict the increase in the moderation backlog queue.

### 2.3 Operational Simulation
* **What-If**: "What if we migrate the storage tier to S3 Standard-IA?"
* **Simulation Result**: Projects financial savings against the predicted retrieval costs based on historical access patterns.

## 3. Architecture Context
Simulations are executed as background tasks by cloning the current state of the Semantic Layer, applying the user's "What-If" overrides, and running the Prescriptive Engine against the temporary, cloned state.
