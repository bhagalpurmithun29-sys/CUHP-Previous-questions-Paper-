# Privacy Framework & Data Protection

## 1. Overview
The Privacy Framework enforces Privacy-by-Design principles across all modules of the CUHP Question Bank. It ensures that PII (Personally Identifiable Information) and sensitive academic records are handled strictly according to defined business purposes.

## 2. Core Privacy Controls

### 2.1 Data Minimization & Purpose Limitation
* **Principle**: Only collect data absolutely necessary for the stated purpose.
* **Implementation**: The Semantic Layer and Analytics modules must not expose PII unless explicitly required for a specific, documented business process.

### 2.2 Dynamic Data Masking
* Implemented at the API gateway layer or database view layer.
* **Example**: A student's email address is returned to a Faculty member as `s***@cuhp.ac.in`. Only Super Administrators or specific HR roles can query the unmasked data.
* **Tokenization**: Highly sensitive keys are replaced with format-preserving tokens in analytical stores.

### 2.3 Anonymization
* Data moving into the Predictive Analytics and AI training pipelines must be structurally anonymized to prevent re-identification attacks, utilizing k-anonymity checks before export.

## 3. Data Subject Requests (DSAR)
The `requests/` module handles user-initiated privacy actions:
1. **Data Access**: User requests a dump of all their data.
2. **Correction**: User requests a fix to incorrect metadata.
3. **Deletion (Right to be Forgotten)**: Triggers the `purge` module to cascade deletes across operational DBs, unless a Legal Hold prevents it.
