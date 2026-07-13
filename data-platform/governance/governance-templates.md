# Governance Templates

## 1. Objective
To provide standardized templates for implementing data governance policies across the CUHP Question Bank platform, ensuring accountability, security, and data quality.

## 2. Data Ownership and Stewardship

### Template: Data Domain Ownership
| Domain | Data Owner (Role) | Data Steward (Role) | Responsibilities |
|---|---|---|---|
| Academic | Head of Department (HOD) | Academic Coordinator | Ensuring course/subject validity, syllabus alignment. |
| Operational | IT Director | System Administrator | Ensuring system uptime, backup, and infrastructure metadata. |
| Student | Registrar | Admissions Officer | Maintaining student enrollment master data. |
| Content | Faculty Member | Content Moderator | Validating question paper accuracy, quality, and metadata tagging. |

## 3. Data Classification Matrix

| Classification Level | Description | Examples | Security Controls |
|---|---|---|---|
| **Public** | Data freely accessible to anyone. | General course list, department names. | Open Read, Authenticated Write. |
| **Internal** | Data restricted to authenticated platform users. | Past question papers (post-exam), faculty directory. | Role-Based Access Control (RBAC), Audit Logs. |
| **Confidential** | Sensitive data restricted to specific roles. | Unreleased exam papers, student PII, AI vector weights. | Encryption at rest/transit, Strict RBAC, MFA. |

## 4. Retention and Archival Rules

| Entity Type | Active Retention | Archival Period | Deletion Policy |
|---|---|---|---|
| Question Papers | 5 Years | 10 Years | Hard delete after 15 years or per statutory requirement. |
| Student Accounts | Active Enrollment + 1 Yr | 5 Years | Soft delete (anonymize) after 5 years. |
| Audit Logs | 1 Year | 3 Years | Hard delete after 4 years. |
| AI Knowledge Assets | Tied to source paper | Tied to source paper | Delete instantly if source is deleted. |

## 5. Data Quality Policies

- **Completeness**: All Question Papers MUST have valid mappings to Department, Course, Subject, and Academic Session.
- **Uniqueness**: A Question Paper hash (file content + metadata) must be unique within an Academic Session.
- **Validity**: Metadata tags must only use terms defined in the Controlled Vocabulary/Taxonomy.
- **Timeliness**: Master data updates (e.g., new courses) must reflect across the platform within 24 hours of approval.

## 6. Access Policies (RBAC Matrix)

| Role | Master Data | Governance Data | Operational Data | Analytics |
|---|---|---|---|---|
| Super Administrator | Full Access | Full Access | Full Access | Full Access |
| Data Governance Team | Read/Propose | Full Access | Read | Full Access |
| Data Steward | Update/Approve | Read | Read/Write | Read |
| Executive User | Read | Read | Read | Full Access |
| Student/Faculty | Read (subset) | No Access | Read/Write (own) | No Access |
