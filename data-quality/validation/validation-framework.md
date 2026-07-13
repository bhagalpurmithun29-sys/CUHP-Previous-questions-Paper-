# Validation Framework & Quality Rules

## 1. Overview
The Validation Framework executes pre-defined Quality Rules during the ETL/ELT process. It prevents bad data from entering the Data Warehouse and corrupting downstream AI or BI models.

## 2. Validation Execution Strategy
* **Pre-Load (Staging)**: Hard validation blocks data from loading (e.g., Schema Mismatches).
* **Post-Load (Warehouse)**: Soft validation flags data for Data Stewards but allows loading (e.g., Anomaly detection).

## 3. Core Quality Rules

### 3.1 Schema & Data Type Validation
- **Rule**: Column types must match the Data Warehouse schema strictly (e.g., `academic_year` must be an Integer).
- **Rule**: Non-nullable fields (e.g., `student_key`, `course_key`) must not contain NULL or empty string values.

### 3.2 Referential Integrity
- **Rule**: Every `department_key` in a Fact table must exist in the `Dim_Department` table. Orphaned facts are rejected.

### 3.3 Business Rule Validation
- **Rule**: Upload dates cannot be in the future.
- **Rule**: A student's enrollment date must precede their graduation date.

### 3.4 Range & Distribution Validation
- **Rule**: Confidence scores from the OCR pipeline must fall between 0.0 and 100.0.

## 4. Drift Detection
The validation engine tracks historical distributions.
* **Schema Drift**: Alerts if a source system adds/removes a column.
* **Value Drift**: Alerts if a categorical field sees a new, unknown value (e.g., a new "File Format" appears that isn't PDF or DOCX).
* **Freshness Drift**: Alerts if data arrives slower than the historical moving average.
