# Authentication Analytics & Identity Administration Module

## Architecture

This module provides a comprehensive suite for identity administration, security analytics, and compliance reporting. It integrates tightly with existing `User`, `AuthAuditLog`, and `LoginSession` models.

### Backend

- **Controllers**: `AuthAdminController` exposes endpoints for dashboard metrics, audit logs, policy management, and compliance reports.
- **Services**:
  - `AuthAdminService`: Aggregates dashboard analytics.
  - `AuditService`: Manages queries against the `AuthAuditLog`.
  - `IdentityService`: Handles password policy and identity provider stats.
  - `RiskAnalysisService`: Identifies high-risk IPs and potential brute-force attacks.
  - `ComplianceService`: Generates downloadable compliance reports (JSON/CSV).
- **Routes**: Mounted at `/api/v1/auth-admin`. Protected by standard `protect` and `restrictTo(ADMIN, SUPER_ADMIN)` middleware.

### Frontend

- **Page**: `AuthAdminDashboard.tsx`
- **Hooks**: `useAuthAdmin.ts` wrapping TanStack Query.
- **Components**:
  - `LoginAnalytics.tsx`: Area chart of login success/failure rates.
  - `MFAAnalytics.tsx`: Pie chart of MFA enrollment.
  - `SecurityEvents.tsx`: Real-time feed of locked accounts and failed logins.
  - `AuditLogViewer.tsx`: Searchable/filterable data table for immutable audit records.
  - `SessionAnalytics.tsx`: Overview of active concurrent sessions.
  - `IdentityProviders.tsx`: Bar chart breaking down SSO usage (Google, MS, Local).
  - `PasswordPolicy.tsx`: Form to adjust global password complexity rules.
  - `RiskOverview.tsx`: High-level summary of brute force attempts and locked accounts.

## Security & Compliance

- **Role-Based Access Control**: Exclusively restricted to Super Admins and Admins.
- **Tamper-Resistant Audit Logs**: All authentication events are logged immutably in `AuthAuditLog`.
- **Accessibility**: UI components utilize semantic HTML, Radix UI primitives (via shadcn/ui), and are designed for WCAG 2.2 AA compliance.

## API Specification (Swagger)

```yaml
paths:
  /api/v1/auth-admin/dashboard:
    get:
      summary: Retrieve authentication dashboard metrics
      tags: [Auth Admin]
  /api/v1/auth-admin/audit:
    get:
      summary: Search and filter audit logs
      tags: [Auth Admin]
  /api/v1/auth-admin/security:
    get:
      summary: Get recent security events
      tags: [Auth Admin]
  /api/v1/auth-admin/policies/password:
    get:
      summary: Retrieve global password policy
      tags: [Auth Admin]
    put:
      summary: Update global password policy
      tags: [Auth Admin]
  /api/v1/auth-admin/reports:
    get:
      summary: Generate compliance and security reports
      tags: [Auth Admin]
```

## Acceptance Checklist

- [x] Dashboard metrics for logins, sessions, and MFA.
- [x] Searchable, immutable audit log viewer.
- [x] Risk analysis identifying suspicious IP activity.
- [x] Identity provider breakdown.
- [x] Admin interface for updating password policies.
- [x] CSV report generation for compliance.
- [x] RBAC enforcement protecting all routes.
- [x] Responsive, accessible frontend components using Recharts and Tailwind CSS.
