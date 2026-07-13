# Quality Rules Inventory

## 1. Completeness Rules
- `QR_COMP_01`: `Fact_Uploads.file_size_bytes` must not be null.
- `QR_COMP_02`: `Dim_Student.enrollment_year` must be populated.

## 2. Uniqueness Rules
- `QR_UNIQ_01`: `Dim_Student.student_id` (Natural Key) must be unique.
- `QR_UNIQ_02`: No two records in `Dim_Faculty` can share the same email address.

## 3. Validity Rules
- `QR_VAL_01`: `Dim_Course.credits` must be an integer between 1 and 8.
- `QR_VAL_02`: `Fact_AI_Usage.tokens_used` must be > 0.

## 4. Timeliness Rules
- `QR_TIME_01`: Pipeline delay between Operational DB `updatedAt` and DW `load_timestamp` must not exceed 24 hours.

## 5. Duplicate Detection (Entity Matching)
- **Exact Match**: Hash comparison of all columns except surrogate keys.
- **Near Duplicate**: Levenshtein distance on `Course Name` or `Paper Title` to flag potential duplicates for Data Steward review.
