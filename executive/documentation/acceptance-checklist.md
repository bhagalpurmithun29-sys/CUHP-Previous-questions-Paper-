# Executive Platform Acceptance Checklist

## 1. Dashboards & Scorecards
- [ ] University Overview, Academic, FinOps, and Operations dashboards render successfully.
- [ ] Balanced Scorecards correctly cascade from Institution down to Department level.
- [ ] Executive Drill-down successfully routes from aggregated KPI to specific DW facts.

## 2. Strategy & Risk
- [ ] Strategic Goals, Initiatives, and Milestone tracking function correctly.
- [ ] Risk Heat Maps dynamically update based on threshold breaches from the Decision Engine.

## 3. Board Reporting & Automation
- [ ] Quarterly and Annual Board Reports export flawlessly as PDFs.
- [ ] Automated NLP Briefings generate coherent summaries of visual charts.
- [ ] Scheduled generation delivers reports to the correct RBAC-scoped users.

## 4. Architecture & APIs
- [ ] Dashboard widgets load in < 1 second using Redis caching.
- [ ] Analytical APIs for dashboards and reports respond securely with RLS applied.

## 5. Security & Analytics
- [ ] Board Members and Vice Chancellor have correct global view permissions.
- [ ] Department Heads cannot view other departments' scorecards.
- [ ] Audit logs successfully track `Board Report Generated` and `Goal Updated`.
