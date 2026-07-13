# KPI Framework

## 1. Overview
The KPI framework defines the high-level business indicators used to measure the performance and health of the CUHP platform. KPIs are composite indicators built from underlying metrics.

## 2. KPI Categories

### 2.1 Academic KPIs
- **Curriculum Coverage Index**: Percentage of active courses with at least 5 years of question papers available.
- **Content Freshness Score**: Ratio of papers uploaded in the last 12 months to total papers.

### 2.2 Repository KPIs
- **Moderation Backlog Time**: Average hours a submitted paper spends in the 'IN_REVIEW' state.
- **Upload Success Rate**: Ratio of successfully OCR'd and indexed papers vs failed uploads.

### 2.3 AI Platform KPIs
- **RAG Deflection Rate**: Percentage of student queries successfully answered by AI without requiring a manual faculty follow-up.
- **AI Latency SLA Compliance**: Percentage of AI responses generated in under 3 seconds.

### 2.4 Student & Faculty Engagement KPIs
- **Student DAU/MAU Ratio**: Measures "stickiness" of the platform for students.
- **Faculty Contribution Index**: Average papers uploaded/moderated per active faculty member per semester.

### 2.5 Executive KPIs
- **Overall Platform Health**: A weighted composite of Uptime, Error Rates, and Engagement.
- **Storage Cost Efficiency**: Total infrastructure cost divided by active Monthly Active Users.
