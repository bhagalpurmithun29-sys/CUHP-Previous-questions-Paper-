# Data Quality & Trust Acceptance Checklist

## 1. Validation & Profiling
- [ ] Schema, Business Rule, and Referential Integrity validation functional.
- [ ] Profiling Engine correctly analyzes Completeness, Uniqueness, and Distribution.
- [ ] Duplicate Detection correctly identifies exact and near matches.

## 2. Lineage & Root Cause Analysis
- [ ] Pipeline Lineage and Source Tracking successfully generate a graph.
- [ ] Root Cause Analysis dashboards correctly correlate validation failures to pipeline steps.

## 3. Trust Framework
- [ ] Trust Score calculation logic correctly weighs validation, freshness, and completeness.
- [ ] Certification Status (Gold, Silver, Bronze) dynamically applied based on Trust Score and manual review.

## 4. Drift Detection & Reliability
- [ ] Schema, Value, and Distribution Drift detection triggers appropriately.
- [ ] Audit logs capture `Validation Executed`, `Rule Updated`, and `Certification Issued`.

## 5. API & Permissions
- [ ] Administrative APIs for reports and trust scores available.
- [ ] RBAC policies applied across Governance Teams, Stewards, and Analysts.
